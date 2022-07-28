import {
  AlternanceFiltre,
  AlternanceId,
  From,
  RésultatsRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { RésultatRechercheAlternance } from '~/server/alternances/infra/repositories/alternance.type';
import {
  buildParamètresRechercheLaBonneAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.builder';
import {
  mapMétierRecherchéList,
  mapRésultatRechercheAlternance,
  mapRésultatsRechercheAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import {
  AlternanceDetailResponse,
  AlternancePeJobsResponse,
  AlternanceResponse,
} from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import {
  RechercheMetierResponse,
} from '~/server/alternances/infra/repositories/responses/rechercheMetierResponse.type';
import { Either } from '~/server/errors/either';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {

  constructor(
    private laBonneAlternanceHttpClientService: LaBonneAlternanceHttpClientService,
  ) {
  }

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    const caseInsensitiveMétierRecherché = métierRecherché.toLowerCase();
    const response = await this.laBonneAlternanceHttpClientService.get<RechercheMetierResponse, MétierRecherché[]>(
      `metiers?title=${caseInsensitiveMétierRecherché}`,
      mapMétierRecherchéList,
    );
    switch (response.instance) {
      case 'success': return response.result;
      case 'failure': return [];
    }
  }

  async searchAlternance(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    const paramètresRecherche = buildParamètresRechercheLaBonneAlternance(alternanceFiltre);
    const response = await this.laBonneAlternanceHttpClientService.get<AlternanceResponse, RésultatsRechercheAlternance>(
      `jobs?${paramètresRecherche}`,
      mapRésultatsRechercheAlternance,
    );
    switch (response.instance) {
      case 'success': return response.result;
      case 'failure': return { nombreRésultats: 0, résultats: [] };
    }
  }

  async getOffreAlternance(id: AlternanceId, from: From): Promise<Either<RésultatRechercheAlternance>> {
    return await this.laBonneAlternanceHttpClientService.get<AlternanceDetailResponse, RésultatRechercheAlternance>(
      `jobs/${from === 'matcha' ? 'matcha' : 'job'}/${id}`,
      mapRésultatRechercheAlternance,
    );
  }
}

export function isAlternanceDetailResponsePeJob(alternance: AlternanceDetailResponse): alternance is AlternancePeJobsResponse {
  return Object.keys(alternance)[0] === 'peJobs';
}

