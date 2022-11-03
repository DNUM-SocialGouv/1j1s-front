import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
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
  buildTempsDeTravailParamètre,
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
import { LoggerService } from '~/server/services/logger.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiOffreRepository implements OffreRepository {
  constructor(
    private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
    private poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
    private cacheService: CacheService,
  ) {}

  paramètreParDéfaut = 'natureContrat=E1,FA,FJ,FT,FU,I1,NS,FV,FW,FX,FY,PS,PR,CC,CU,EE,ER,CI';

  private ECHANTILLON_OFFRE_EMPLOI_KEY = 'ECHANTILLON_OFFRE_EMPLOI_KEY';

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

  async search(emploiFiltre: EmploiFiltre): Promise<Either<RésultatsRechercheOffre>> {
    if (isOffreÉchantillonFiltre(emploiFiltre)) return this.getÉchantillonOffreEmploi(emploiFiltre);
    return this.getOffreEmploiRecherche(emploiFiltre);
  }

  async buildEmploiParamètresRecherche(emploiFiltre: EmploiFiltre): Promise<string | undefined> {
    const queryList: Record<string, string> = {
      experienceExigence: emploiFiltre.experienceExigence || '',
      grandDomaine: emploiFiltre.grandDomaineList?.join(',') || '',
      tempsPlein: buildTempsDeTravailParamètre(emploiFiltre),
      typeContrat: emploiFiltre.typeDeContratList?.join(',') || '',
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async getOffreEmploiRecherche(emploiFiltre: EmploiFiltre) {
    const paramètresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(emploiFiltre);
    const emploiParamètresRecherche = await this.buildEmploiParamètresRecherche(emploiFiltre);
    if(paramètresRecherche) {
      try {
        const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(
          `/search?${emploiParamètresRecherche}&${paramètresRecherche}`,
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

  private async getÉchantillonOffreEmploi(emploiFiltre: EmploiFiltre) {
    const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_EMPLOI_KEY);
    const range = buildRangeParamètre(emploiFiltre);

    if (responseInCache) {
      return createSuccess(mapRésultatsRechercheOffre(responseInCache));
    } else {
      try {
        const response = await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse>(`/search?range=${range}&${this.paramètreParDéfaut}`);
        this.cacheService.set(this.ECHANTILLON_OFFRE_EMPLOI_KEY, response.data, 24);
        return createSuccess(mapRésultatsRechercheOffre(response.data));
      } catch (e) {
        LoggerService.error('[API Pole Emploi] impossible de rechercher');
        return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
      }
    }
  }

}
