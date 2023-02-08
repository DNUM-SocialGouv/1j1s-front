import {
	Alternance,
	AlternanceListApiResponse,
	AlternanceQuery,
} from '~/server/alternances/domain/alternance';
import { LaBonneAlternanceRepository } from '~/server/alternances/domain/LaBonneAlternance.repository';
import {
	MetierAlternance,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/domain/métier';
import { mapAlternance } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { createSuccess, Either } from '~/server/errors/either';
import { handleSearchFailureError } from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiError';
import { HttpClientService } from '~/server/services/http/httpClientService';

const caller = '1jeune1solution';
const sources = 'matcha';


export class ApiLaBonneAlternanceRepository implements LaBonneAlternanceRepository {
	constructor(private httpClientService: HttpClientService) {}

	async getMetier(recherche: string): Promise<Either<Array<MetierAlternance>>> {
		try {
			const response = await this.httpClientService.get<MetierLaBonneAlternanceApiResponse>(`/metiers?title=${recherche}`);
			const mappedResponse = response.data.labelsAndRomes.map((metier) => ({
				label: metier.label,
				romes: metier.romes,
			}));
			return createSuccess(mappedResponse);
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance métier');
		}
	}


	async search(filtre: AlternanceQuery): Promise<Either<Array<Alternance>>> {
		const queryList = filtre.codeRomes.join(',');
		try {
			const response = await this.httpClientService.get<AlternanceListApiResponse>(`/jobs?caller=${caller}&romes=${queryList}&sources=${sources}`);
			return createSuccess(mapAlternance(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche');
		}
	}
}
