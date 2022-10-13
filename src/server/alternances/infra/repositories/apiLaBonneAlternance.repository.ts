import {
  AlternanceFiltre,
  AlternanceId,
  From,
  RésultatsRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import {
  ConsulterOffreAlternance,
} from '~/server/alternances/infra/repositories/alternance.type';
import {
  buildParamètresRechercheLaBonneAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.builder';
import {
  mapMétierRecherchéList,
  mapOffreAlternanceMatcha,
  mapOffreAlternancePeJob,
  mapRésultatsRechercheAlternance,
  mapRésultatsRechercheAlternanceResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import {
  AlternanceResponse,
} from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import {
  RechercheMetierResponse,
} from '~/server/alternances/infra/repositories/responses/rechercheMetierResponse.type';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {

  constructor(
    private httpClientService: HttpClientService,
    private cacheService: CacheService,
  ) {}

  private ALTERNANCE_KEY = 'ALTERNANCE_KEY';

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    const normalizedMétierRecherché = ApiLaBonneAlternanceRepository.normalizeStringWithoutDiacriticGlyph(métierRecherché);
    const response = await this.httpClientService.get<RechercheMetierResponse, MétierRecherché[]>(
      `metiers?title=${normalizedMétierRecherché}`,
      mapMétierRecherchéList,
    );
    switch (response.instance) {
      case 'success':
        return response.result.filter((métierRecherché) => {
          return ApiLaBonneAlternanceRepository
            .normalizeStringWithoutDiacriticGlyph(métierRecherché.intitulé)
            .indexOf(normalizedMétierRecherché) >= 0;
        });
      case 'failure': return [];
    }
  }

  async searchAlternance(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    const paramètresRecherche = buildParamètresRechercheLaBonneAlternance(alternanceFiltre);
    const response = await this.httpClientService.get<AlternanceResponse, AlternanceResponse>(
      `jobs?${paramètresRecherche}`,
      mapRésultatsRechercheAlternanceResponse,
    );

    switch (response.instance) {
      case 'success': {
        this.cacheService.set(this.ALTERNANCE_KEY, response.result, 2);
        return mapRésultatsRechercheAlternance(response.result);
      };
      case 'failure': return { nombreRésultats: 0, résultats: [] };
    }
  }


  async getOffreAlternance(alternanceId:AlternanceId, from: From): Promise<Either<ConsulterOffreAlternance>> {
    const responseInCache = await this.cacheService.get<AlternanceResponse>(this.ALTERNANCE_KEY);
    if (!responseInCache) return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    if (from === 'matcha') {
      const resultFromKey = responseInCache.matchas;

      const offre = resultFromKey.results.filter((offre) => {
        return offre.job.id === alternanceId;
      });
      if (offre.length === 0) return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      return createSuccess(mapOffreAlternanceMatcha(offre[0]));
    }
    if (from === 'peJob') {
      const resultFromKey = responseInCache.peJobs;

      const offre = resultFromKey.results.filter((offre) => {
        return offre.job.id === alternanceId;
      });
      if (offre.length === 0) return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      return createSuccess(mapOffreAlternancePeJob(offre[0]));
    }
    return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
  }

  private static normalizeStringWithoutDiacriticGlyph(string: string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
  }
}

