import {
  AlternanceFiltre,
  AlternanceId,
  RésultatsRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import {
  ConsulterOffreAlternanceMatcha,
} from '~/server/alternances/infra/repositories/alternance.type';
import {
  buildParamètresRechercheLaBonneAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.builder';
import {
  mapMétierRecherchéList,
  mapOffreAlternanceMatcha,
  mapRésultatsRechercheAlternanceMatcha,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import {
  AlternanceMatchasResponse,
  AlternanceResponse,
} from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import {
  RechercheMetierResponse,
} from '~/server/alternances/infra/repositories/responses/rechercheMetierResponse.type';
import { Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {

  constructor(
    private httpClientService: HttpClientService,
  ) {
  }

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
    const response = await this.httpClientService.get<AlternanceResponse, RésultatsRechercheAlternance>(
      `jobs?${paramètresRecherche}`,
      mapRésultatsRechercheAlternanceMatcha,
    );

    switch (response.instance) {
      case 'success': return response.result;
      case 'failure': return { nombreRésultats: 0, résultats: [] };
    }
  }

  async getOffreAlternanceMatcha(id: AlternanceId): Promise<Either<ConsulterOffreAlternanceMatcha>> {
    return await this.httpClientService.get<AlternanceMatchasResponse, ConsulterOffreAlternanceMatcha>(
      `jobs/matcha/${id}`,
      mapOffreAlternanceMatcha,
    );;
  }

  private static normalizeStringWithoutDiacriticGlyph(string: string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
  }
}

