import axios from 'axios';

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
  mapAlternance,
  mapOffreAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import {
  MatchasResponse,
  MatchasResultResponse,
} from '~/server/alternances/infra/repositories/matchasResponse.type';
import {
  PeJobsResponse,
  PeJobsResultResponse,
} from '~/server/alternances/infra/repositories/peJobsResponse.type';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { ConfigurationService } from '~/server/services/configuration.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(
    private laBonneAlternanceHttpClientService: LaBonneAlternanceHttpClientService,
    private configurationService: ConfigurationService,
  ) {
  }

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    const response = await this.laBonneAlternanceHttpClientService.get<RechercheMetierResponse>(
      `metiers?title=${métierRecherché}`,
    );

    return response.data.labelsAndRomes.map((rechercheMetier) => ({
      codeROMEList: rechercheMetier.romes,
      intitulé: rechercheMetier.label,
    }));
  }

  async getAlternanceList(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    const response = await this.laBonneAlternanceHttpClientService.get<AlternanceResponse>(
      `jobs?${this.buildParamètresRecherche(alternanceFiltre)}`,
    );
    const résultats = mapAlternance(response.data);

    return {
      nombreRésultats: résultats.length,
      résultats,
    };
  }

  async getOffreAlternance(id: AlternanceId, from: From): Promise<Either<RésultatRechercheAlternance>> {
    LoggerService.info(`Récupération offre alternance ${id} dans ${from}`);
    try {
      const response = await this.laBonneAlternanceHttpClientService.get<AlternanceDetailResponse>(
        `jobs/${from === 'matcha' ? 'matcha' : 'job'}/${id}`,
      );
      return createSuccess(mapOffreAlternance(response.data));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if(e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if(e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  buildParamètresRecherche(alternanceFiltre: AlternanceFiltre) {
    const { CONTACT_MAIL_FOR_MA_BONNE_ALTERNANCE } = this.configurationService.getConfiguration();
    // eslint-disable-next-line
    const queryList: Record<string, any > = {
      insee: alternanceFiltre.codeInsee?.valueAvecCodePostal,
      romes: alternanceFiltre.codeRomeList.toString(),
    };
    removeUndefinedValueInQueryParameterList(queryList);
    const params = new URLSearchParams(queryList);
    return `${params.toString()}&caller=${CONTACT_MAIL_FOR_MA_BONNE_ALTERNANCE}`;
  }
}

interface RechercheMetierResponse {
  labelsAndRomes: RechercheMetierDataResponse[];
}

interface RechercheMetierDataResponse {
  label: string;
  romes: string[];
}

export interface AlternanceResponse {
  peJobs: PeJobsResponse
  matchas: MatchasResponse
}

export type AlternanceDetailResponse = AlternancePeJobsResponse | AlternanceMatchasResponse

export interface AlternancePeJobsResponse {
  peJobs: PeJobsResultResponse[]
}

export interface AlternanceMatchasResponse {
  matchas: MatchasResultResponse[]
}

export function isAlternanceDetailResponsePeJob(alternance: AlternanceDetailResponse): alternance is AlternancePeJobsResponse {
  return Object.keys(alternance)[0] === 'peJobs';
}

export function isAlternanceDetailResponseMatcha(alternance: AlternanceDetailResponse): alternance is AlternanceMatchasResponse {
  return Object.keys(alternance)[0] ===  'matchas';
}

