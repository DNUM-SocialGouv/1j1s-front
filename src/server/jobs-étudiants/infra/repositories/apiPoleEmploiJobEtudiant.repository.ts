import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { JobEtudiantFiltre } from '~/server/jobs-étudiants/domain/jobs-étudiants';
import { isOffreEchantillonFiltre, Offre, OffreId, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';
import {
  mapOffre,
  mapRésultatsRechercheOffre,
  mapRésultatsRechercheOffreResponse,
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
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiJobEtudiantRepository implements OffreRepository {

  constructor(
    private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
    private poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
    private cacheService: CacheService,
  ) {}

  paramètreParDéfaut = 'natureContrat=E1,FA,FJ,FT,FU,I1,NS,FV,FW,FX,FY,PS,PR,CC,CU,EE,ER,CI&dureeHebdoMax=1600&tempsPlein=false&typeContrat=CDD,MIS,SAI';

  private ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY = 'ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY';

  async get(id: OffreId): Promise<Either<Offre>> {
    return await this.httpClientServiceWithAuthentification.get<OffreResponse, Offre>(
      `/${id}`,
      mapOffre,
    );
  }

  async search(jobEtudiantFiltre: JobEtudiantFiltre): Promise<Either<RésultatsRechercheOffre>> {
    if (isOffreEchantillonFiltre(jobEtudiantFiltre)) return await this.getEchantillonJobEtudiant(jobEtudiantFiltre);
    return await this.getOffreJobEtudiantRecherche(jobEtudiantFiltre);
  }

  async buildJobEtudiantParamètresRecherche(jobEtudiantFiltre: JobEtudiantFiltre): Promise<string | undefined> {

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      grandDomaine: jobEtudiantFiltre.grandDomaineList && jobEtudiantFiltre.grandDomaineList.join(',') || '',
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async getOffreJobEtudiantRecherche(jobEtudiantFiltre: JobEtudiantFiltre) {
    const paramètresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(jobEtudiantFiltre);
    const jobEtudiantParamètresRecherche = await this.buildJobEtudiantParamètresRecherche(jobEtudiantFiltre);
    if(paramètresRecherche) {
      return await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse, RésultatsRechercheOffre>(
        `/search?${paramètresRecherche}&${jobEtudiantParamètresRecherche}&${this.paramètreParDéfaut}`,
        mapRésultatsRechercheOffre,
      );
    }
    return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
  }

  async getEchantillonJobEtudiant(jobEtudiantFiltre: JobEtudiantFiltre) {
    const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY);
    const range = buildRangeParamètre(jobEtudiantFiltre);

    if (responseInCache) return createSuccess(mapRésultatsRechercheOffre(responseInCache));
    else {
      const response =  await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse, RésultatsRechercheOffreResponse>(
        `/search?range=${range}&${this.paramètreParDéfaut}`,
        mapRésultatsRechercheOffreResponse,
      );
      switch (response.instance) {
        case 'success': {
          this.cacheService.set(this.ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY, response.result, 24);
          return createSuccess(mapRésultatsRechercheOffre(response.result));
        }
        case 'failure': return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      }
    }
  }
}
