import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
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
  buildTempsDeTravailParamètre,
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
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
    return await this.httpClientServiceWithAuthentification.get<OffreResponse, Offre>(
      `/${id}`,
      mapOffre,
    );
  }

  async search(emploiFiltre: EmploiFiltre): Promise<Either<RésultatsRechercheOffre>> {
    if (isOffreEchantillonFiltre(emploiFiltre)) return await this.getEchantillonOffreEmploi(emploiFiltre);
    return await this.getOffreEmploiRecherche(emploiFiltre);
  }

  async buildEmploiParamètresRecherche(emploiFiltre: EmploiFiltre): Promise<string | undefined> {
    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      experienceExigence: emploiFiltre.experienceExigence || '',
      grandDomaine: emploiFiltre.grandDomaineList && emploiFiltre.grandDomaineList.join(',') || '',
      tempsPlein: buildTempsDeTravailParamètre(emploiFiltre),
      typeContrat: emploiFiltre.typeDeContratList && emploiFiltre.typeDeContratList.join(',') || '',
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async getOffreEmploiRecherche(emploiFiltre: EmploiFiltre) {
    const paramètresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(emploiFiltre);
    const emploiParamètresRecherche = await this.buildEmploiParamètresRecherche(emploiFiltre);
    if(paramètresRecherche) {
      return await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse, RésultatsRechercheOffre>(
        `/search?${emploiParamètresRecherche}&${paramètresRecherche}&${this.paramètreParDéfaut}`,
        mapRésultatsRechercheOffre,
      );
    }
    return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
  }

  private async getEchantillonOffreEmploi(emploiFiltre: EmploiFiltre) {
    const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_EMPLOI_KEY);
    const range = buildRangeParamètre(emploiFiltre);

    if (responseInCache) return createSuccess(mapRésultatsRechercheOffre(responseInCache));
    else {
      const response =  await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse, RésultatsRechercheOffreResponse>(
        `/search?range=${range}&${this.paramètreParDéfaut}`,
        mapRésultatsRechercheOffreResponse,
      );
      switch (response.instance) {
        case 'success': {
          this.cacheService.set(this.ECHANTILLON_OFFRE_EMPLOI_KEY, response.result, 24);
          return createSuccess(mapRésultatsRechercheOffre(response.result));
        }
        case 'failure': return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      }
    }
  }

}
