import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { JobÉtudiantFiltre } from '~/server/jobs-étudiants/domain/jobÉtudiant';
import { isOffreÉchantillonFiltre, Offre, OffreId, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';
import {
  mapOffre,
  mapRésultatsRechercheOffre,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploi.mapper';
import {
  OffreResponse,
  RésultatsRechercheOffreResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiOffre.response';
import {
  buildRangeParamètre,
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
import { LoggerService } from '~/server/services/logger.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiJobÉtudiantRepository implements OffreRepository {

  constructor(
    private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
    private poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
    private cacheService: CacheService,
  ) {}

  paramètreParDéfaut = 'dureeHebdoMax=1600&tempsPlein=false&typeContrat=CDD,MIS,SAI';

  private ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY = 'ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY';

  async get(id: OffreId): Promise<Either<Offre>> {
    try {
      const response = await this.httpClientServiceWithAuthentification.get<OffreResponse>(`/${id}`);
      if(response.status === 204) {
        return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
      }
      return createSuccess(mapOffre(response.data));
    } catch (e) {
      LoggerService.error('[API Pole Emploi] impossible de récupérer la ressource');
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }

  async search(jobÉtudiantFiltre: JobÉtudiantFiltre): Promise<Either<RésultatsRechercheOffre>> {
    if (isOffreÉchantillonFiltre(jobÉtudiantFiltre)) return this.getÉchantillonJobÉtudiant(jobÉtudiantFiltre);
    return this.getOffreJobÉtudiantRecherche(jobÉtudiantFiltre);
  }

  async buildJobÉtudiantParamètresRecherche(jobÉtudiantFiltre: JobÉtudiantFiltre): Promise<string | undefined> {
    const queryList: Record<string, string> = {
      grandDomaine: jobÉtudiantFiltre.grandDomaineList?.join(',') || '',
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async getOffreJobÉtudiantRecherche(jobÉtudiantFiltre: JobÉtudiantFiltre) {
    const paramètresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(jobÉtudiantFiltre);
    const jobÉtudiantParamètresRecherche = await this.buildJobÉtudiantParamètresRecherche(jobÉtudiantFiltre);
    if(paramètresRecherche) {
      try {
        const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
          `/search?${paramètresRecherche}&${jobÉtudiantParamètresRecherche}&${this.paramètreParDéfaut}`,
        );
        if(response.status === 204) {
          return createSuccess({ nombreRésultats: 0, résultats: [] });
        }
        return createSuccess(mapRésultatsRechercheOffre(response.data));
      } catch (e) {
        LoggerService.error('[API Pole Emploi] impossible de rechercher');
        return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
      }
    }
    return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
  }

  async getÉchantillonJobÉtudiant(jobÉtudiantFiltre: JobÉtudiantFiltre) {
    const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY);
    const range = buildRangeParamètre(jobÉtudiantFiltre);

    if (responseInCache) {
      return createSuccess(mapRésultatsRechercheOffre(responseInCache));
    } else {
      try {
        const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
          `/search?range=${range}&${this.paramètreParDéfaut}`,
        );
        this.cacheService.set(this.ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY, response.data, 24);
        return createSuccess(mapRésultatsRechercheOffre(response.data));
      } catch (e) {
        LoggerService.error('[API Pole Emploi] impossible de rechercher');
        return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
      }
    }
  }
}
