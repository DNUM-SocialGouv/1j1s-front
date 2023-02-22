import { Alternance, AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import {
	AlternanceApiJobsResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { mapAlternance, mapMétier } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';

const caller = '1jeune1solution';
const sourcesMatchaEtPEJobs = 'matcha,offres';


export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
	constructor(private httpClientService: HttpClientService) {
	}

	async getMetierList(recherche: string): Promise<Either<Array<MetierAlternance>>> {
		try {
			const response = await this.httpClientService.get<MetierLaBonneAlternanceApiResponse>(`/metiers?title=${recherche}`);
			return createSuccess(mapMétier(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance métier');
		}
	}


	async search(filtre: AlternanceFiltre): Promise<Either<Array<Alternance>>> {
		const codeRomes = filtre.codeRomes.join(',');
		try {
			const endpoint = `/jobs?caller=${caller}&romes=${codeRomes}&sources=${sourcesMatchaEtPEJobs}&insee=${filtre.codeCommune}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
			const response = await this.httpClientService.get<AlternanceApiJobsResponse>(endpoint);
			return createSuccess(mapAlternance(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche');
		}
	}
}
