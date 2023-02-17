import { Alternance, AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { uneAlternance } from '~/server/alternances/domain/alternance.fixture';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { mapAlternance } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';

const sourcesMatchaEtPEJobs = 'matcha,offres';


export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
	constructor(private httpClientService: HttpClientService, private caller: string) {}

	async search(filtre: AlternanceFiltre): Promise<Either<Array<Alternance>>> {
		const codeRomes = filtre.codeRomes.join(',');
		try {
			const endpoint = `/jobs?caller=${this.caller}&romes=${codeRomes}&sources=${sourcesMatchaEtPEJobs}&insee=${filtre.codeCommune}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
			const response = await this.httpClientService.get<AlternanceApiJobsResponse>(endpoint);
			return createSuccess(mapAlternance(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche alternance');
		}
	}

	get(id: string, rome: string): Promise<Either<Alternance>> {
		const apiResponse = this.search({ codeRomes: [rome] });
		return createSuccess(uneAlternance());
	}
}
