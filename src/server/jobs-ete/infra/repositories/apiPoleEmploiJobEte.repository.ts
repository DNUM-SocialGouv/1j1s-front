import { createSuccess, Either } from '~/server/errors/either';
import { JobEteFiltre } from '~/server/jobs-ete/domain/jobEte';
import { isOffreÉchantillonFiltre, Offre, OffreId, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';
import {
	mapOffre,
	mapRésultatsRechercheOffre,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploi.mapper';
import {
	PoleEmploiOffreErrorManagementServiceGet,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiErrorManagement.service';
import {
	OffreResponse,
	RésultatsRechercheOffreResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiOffre.response';
import {
	buildRangeParamètre,
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiJobEteRepository implements OffreRepository {

	constructor(
		private readonly httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
		private readonly poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
		private readonly cacheService: CacheService,
		private readonly apiPoleEmploiOffreErrorManagementSearch: ErrorManagementService,
		private readonly apiPoleEmploiOffreErrorManagementGet: PoleEmploiOffreErrorManagementServiceGet,
	) {}

	paramètreParDéfaut = 'typeContrat=CDD,MIS,SAI&dureeContratMax=2';

	private ECHANTILLON_OFFRE_JOB_ETE_KEY = 'ECHANTILLON_OFFRE_JOB_ETE_KEY';

	async get(id: OffreId): Promise<Either<Offre>> {
		try {
			const response = await this.httpClientServiceWithAuthentification.get<OffreResponse>(`/${id}`);
			if (this.apiPoleEmploiOffreErrorManagementGet.isError(response)) {
				return this.apiPoleEmploiOffreErrorManagementGet.handleFailureError(response, {
					apiSource: 'API Pole Emploi',
					contexte: 'détail job d‘été', message: '[API Pole Emploi] impossible de récupérer un job d‘été',
				});
			}
			return createSuccess(mapOffre(response.data));
		} catch (error) {
			return this.apiPoleEmploiOffreErrorManagementGet.handleFailureError(error, {
				apiSource: 'API Pole Emploi',
				contexte: 'détail job d‘été', message: '[API Pole Emploi] impossible de récupérer un job d‘été',
			});
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
		} catch (error) {
			return this.apiPoleEmploiOffreErrorManagementSearch.handleFailureError(error, {
				apiSource: 'API Pole Emploi',
				contexte: 'recherche job d‘été', message: '[API Pole Emploi] impossible d’effectuer une recherche de job d‘été',
			});
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
			} catch (error) {
				return this.apiPoleEmploiOffreErrorManagementSearch.handleFailureError(error, {
					apiSource: 'API Pole Emploi',
					contexte: 'échantillon job d‘été',
					message: '[API Pole Emploi] impossible d’effectuer une recherche de job d‘été',
				});
			}
		}
	}
}
