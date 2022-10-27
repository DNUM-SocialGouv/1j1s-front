import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
  isOffreEchantillonFiltre,
  Offre,
  OffreFiltre,
  OffreId,
  RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
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

export class ApiPoleEmploiAlternanceRepository implements OffreRepository {
  constructor(
    private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification,
    private poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService,
    private cacheService: CacheService,
  ) {}
  
  paramètreParDéfaut = 'natureContrat=E2,FS';

  private ECHANTILLON_OFFRE_ALTERNANCE_KEY = 'ECHANTILLON_OFFRE_ALTERNANCE_KEY';

  async get(id: OffreId): Promise<Either<Offre>> {
    return await this.httpClientServiceWithAuthentification.get<OffreResponse, Offre>(
      `/${id}`,
      mapOffre,
    );
  }

  async search(offreFiltre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>> {
    if (isOffreEchantillonFiltre(offreFiltre)) return await this.getEchantillonOffreAlternance(offreFiltre);
    return await this.getOffreAlternanceRecherche(offreFiltre);
  }

  private async getOffreAlternanceRecherche(offreFiltre: OffreFiltre) {
    const paramètresRecherche = await this.poleEmploiParamètreBuilderService.buildCommonParamètresRecherche(offreFiltre);
    if(paramètresRecherche) {
      return await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse, RésultatsRechercheOffre>(
        `/search?${paramètresRecherche}&${this.paramètreParDéfaut}`,
        mapRésultatsRechercheOffre,
      );
    }
    return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
  }

  private async getEchantillonOffreAlternance(offreFiltre: OffreFiltre) {
    const responseInCache = await this.cacheService.get<RésultatsRechercheOffreResponse>(this.ECHANTILLON_OFFRE_ALTERNANCE_KEY);
    const range = buildRangeParamètre(offreFiltre);

    if (responseInCache) return createSuccess(mapRésultatsRechercheOffre(responseInCache));
    else {
      const response =  await this.httpClientServiceWithAuthentification.get<RésultatsRechercheOffreResponse, RésultatsRechercheOffreResponse>(
        `/search?range=${range}&${this.paramètreParDéfaut}`,
        mapRésultatsRechercheOffreResponse,
      );
      switch (response.instance) {
        case 'success': {
          this.cacheService.set(this.ECHANTILLON_OFFRE_ALTERNANCE_KEY, response.result, 24);
          return createSuccess(mapRésultatsRechercheOffre(response.result));
        }
        case 'failure': return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      }
    }
  }

}
