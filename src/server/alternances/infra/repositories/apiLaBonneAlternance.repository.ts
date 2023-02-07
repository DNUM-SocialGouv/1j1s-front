import {
	createFailure,
	createSuccess,
	Either
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Offre, OffreFiltre, OffreId, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LaBonneAlternanceRepository } from '~/server/alternances/domain/LaBonneAlternance.repository'
import {
	MetierAlternance,
	MetierLaBonneAlternanceApiResponse
} from '~/server/alternances/domain/métier'
import { handleSearchFailureError } from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiError'

const caller = '1jeune1solution';

export interface AlternanceFilter {
	romes: string
}

export class ApiLaBonneAlternanceRepository implements LaBonneAlternanceRepository {
	constructor(private httpClientService: HttpClientService) {}

	async getMetier(recherche: string): Promise<Either<Array<MetierAlternance>>> {
		try {
			const response = await this.httpClientService.get<MetierLaBonneAlternanceApiResponse>(`/metiers?title=${recherche}`);
			const mappedResponse = response.data.labelsAndRomes.map((metier) => ({
				label: metier.label,
				romes: metier.romes,
			}))
			return createSuccess(mappedResponse);
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance métier');
		}
	}

	// FIXME
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	get(id: OffreId): Promise<Either<Offre>> {
		return Promise.resolve(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
	}

	search(filtre: AlternanceFilter): Promise<Either<RésultatsRechercheOffre>> {
		this.httpClientService.get(`/jobs?caller=${caller}&romes=${filtre.romes}`);
		return Promise.resolve(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
	}
}
