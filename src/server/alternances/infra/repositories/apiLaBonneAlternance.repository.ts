import { Alternance, AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	mapAlternanceListe,
	mapMatcha,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';

const sourcesMatchaEtPEJobs = 'matcha,offres';


export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
	constructor(private httpClientService: HttpClientService, private caller: string) {}

	async search(filtre: AlternanceFiltre): Promise<Either<Array<Alternance>>> {
		try {
			const response = await this.getAlternanceListe(filtre);
			return createSuccess(mapAlternanceListe(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche alternance');
		}
	}

	private async getAlternanceListe(filtre: AlternanceFiltre) {
		const codeRomes = filtre.codeRomes.join(',');
		const endpoint = `/jobs?caller=${this.caller}&romes=${codeRomes}&sources=${sourcesMatchaEtPEJobs}&insee=${filtre.codeCommune}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
		return await this.httpClientService.get<AlternanceApiJobsResponse>(endpoint);
	}

	async get(id: string): Promise<Either<Alternance>> {
		try {
			const apiResponse = await this.httpClientService.get<{ matchas: AlternanceApiJobsResponse.Matcha[] }>(`/jobs/matcha/${id}`);
			const matcha = apiResponse.data.matchas[0];
			return createSuccess(mapMatcha(matcha));
		} catch (error) {
			return handleSearchFailureError(error, 'détail annonce alternance');
		}
	}
}
