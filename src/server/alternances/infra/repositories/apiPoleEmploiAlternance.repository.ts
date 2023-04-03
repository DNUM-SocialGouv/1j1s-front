import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	isOffreÉchantillonFiltre,
	Offre,
	OffreFiltre,
	OffreId,
	RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';
import {
	mapOffre,
	mapRésultatsRechercheOffre,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploi.mapper';
import {
	handleGetFailureError,
	handleSearchFailureError,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiError';
import {
	OffreResponse,
	RésultatsRechercheOffreResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiOffre.response';
import {
	buildRangeParamètre,
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

export class ApiPoleEmploiAlternanceRepository implements OffreRepository {
	constructor(
    private httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
    private poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
    private cacheService: CacheService,
	) {}
  
	paramètreParDéfaut = 'natureContrat=E2,FS';

	private ECHANTILLON_OFFRE_ALTERNANCE_KEY = 'ECHANTILLON_OFFRE_ALTERNANCE_KEY';

	async get(id: OffreId): Promise<Either<Offre>> {
		try {
			const response = await this.httpClientServiceWithAuthentification.get<OffreResponse>(`/${id}`);
			if (response.status === 204) {
				return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
			}
			return createSuccess(mapOffre(response.data));
		} catch (e) {
			return handleGetFailureError(e, 'alternance');
		}
	}

	async search(offreFiltre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>> {
		if (isOffreÉchantillonFiltre(offreFiltre)) return this.getÉchantillonOffreAlternance(offreFiltre);
		return this.getOffreAlternanceRecherche(offreFiltre);
	}

	private async getOffreAlternanceRecherche(offreFiltre: OffreFiltre) {
		const paramètresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(offreFiltre);
		if (paramètresRecherche) {
			try {
				const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
					`/search?${paramètresRecherche}&${this.paramètreParDéfaut}`,
				);
				if (response.status === 204) {
					return createSuccess({ nombreRésultats: 0, résultats: [] });
				}
				return createSuccess(mapRésultatsRechercheOffre(response.data));
			} catch (e) {
				return handleSearchFailureError(e, 'alternance');
			}

		}
		return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
	}

	private async getÉchantillonOffreAlternance(offreFiltre: OffreFiltre) {
		const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_ALTERNANCE_KEY);
		const range = buildRangeParamètre(offreFiltre);

		if (responseInCache) {
			return createSuccess(mapRésultatsRechercheOffre(responseInCache));
		} else {
			try {
				const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
					`/search?range=${range}&${this.paramètreParDéfaut}`,
				);
				this.cacheService.set(this.ECHANTILLON_OFFRE_ALTERNANCE_KEY, response.data, 24);
				return createSuccess(mapRésultatsRechercheOffre(response.data));
			} catch (e) {
				return handleSearchFailureError(e, 'échantillon alternance');
			}
		}
	}

}
