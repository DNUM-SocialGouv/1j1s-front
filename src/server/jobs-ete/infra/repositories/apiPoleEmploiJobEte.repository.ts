import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { JobEteFiltre } from '~/server/jobs-ete/domain/jobEte';
import { isOffreÉchantillonFiltre, Offre, OffreId, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
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
import { LoggerService } from '~/server/services/logger.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiJobEteRepository implements OffreRepository {

	constructor(
		private httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
		private poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
		private cacheService: CacheService,
		private loggerService: LoggerService,
	) {}

	paramètreParDéfaut = 'typeContrat=CDD,MIS,SAI&dureeContratMax=2';

	private ECHANTILLON_OFFRE_JOB_ETE_KEY = 'ECHANTILLON_OFFRE_JOB_ETE_KEY';

	async get(id: OffreId): Promise<Either<Offre>> {
		try {
			const response = await this.httpClientServiceWithAuthentification.get<OffreResponse>(`/${id}`);
			if (response.status === 204) {
				return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
			}
			return createSuccess(mapOffre(response.data));
		} catch (e) {
			return handleGetFailureError(e, 'job ete', this.loggerService);
		}
	}

	async search(jobEteFiltre: JobEteFiltre): Promise<Either<RésultatsRechercheOffre>> {
		if (isOffreÉchantillonFiltre(jobEteFiltre)) return this.getÉchantillonOffre(jobEteFiltre);
		return this.getOffreJobEteRecherche(jobEteFiltre);
	}

	async buildJobEteParametresRecherche(jobEteFiltre: JobEteFiltre): Promise<string> {
		const queryList: Record<string, string> = {
			grandDomaine: jobEteFiltre.grandDomaineList?.join(',') || '',
		};
		
		removeUndefinedValueInQueryParameterList(queryList);
		
		const params = new URLSearchParams(queryList);
		
		return params.toString();
	}
	
	private async getOffreJobEteRecherche(jobEteFiltre: JobEteFiltre): Promise<Either<RésultatsRechercheOffre>> {
		const parametresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(jobEteFiltre);
		const jobEteParametresRecherche = await this.buildJobEteParametresRecherche(jobEteFiltre);
		try {
			const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
				`/search?${parametresRecherche}&${jobEteParametresRecherche}&${this.paramètreParDéfaut}`,
			);
			if (response.status === 204) {
				return createSuccess({ nombreRésultats: 0, résultats: [] });
			}
			return createSuccess(mapRésultatsRechercheOffre(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'job ete', this.loggerService);
		}
	}
	
	private async getÉchantillonOffre(jobEteFiltre: JobEteFiltre): Promise<Either<RésultatsRechercheOffre>> {
		const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_JOB_ETE_KEY);
		const range = buildRangeParamètre(jobEteFiltre);
		
		if (responseInCache) {
			return createSuccess(mapRésultatsRechercheOffre(responseInCache));
		} else {
			try {
				const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
					`/search?range=${range}&${this.paramètreParDéfaut}`,
				);
				this.cacheService.set(this.ECHANTILLON_OFFRE_JOB_ETE_KEY, response.data, 24);
				return createSuccess(mapRésultatsRechercheOffre(response.data));
			} catch (e) {
				return handleSearchFailureError(e, 'echantillon job ete', this.loggerService);
			}
		}
	}
}
