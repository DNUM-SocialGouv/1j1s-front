import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
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
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ConfigurationService } from '~/server/services/configuration.service';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(
    private laBonneAlternanceHttpClientService: LaBonneAlternanceHttpClientService,
    private configurationService: ConfigurationService,
    private apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  ) {
  }

  API_LA_BONNE_ALTERNANCE_PREFIX_LOG = 'API_LA_BONNE_ALTERNANCE';

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    let response;
    try {
      response = await this.laBonneAlternanceHttpClientService.get<RechercheMetierResponse>(
        `metiers?title=${métierRecherché}`,
      );

      return response.data.labelsAndRomes.map((rechercheMetier) => ({
        codeROMEList: rechercheMetier.romes,
        intitulé: rechercheMetier.label,
      }));
    } catch (e: unknown) {
      Sentry.captureMessage(`${this.API_LA_BONNE_ALTERNANCE_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`${this.API_LA_BONNE_ALTERNANCE_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);

      return [];
    }

  }

  async getAlternanceList(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    let response;
    const paramètresRecherche = await this.buildParamètresRecherche(alternanceFiltre);

    try {
      response = await this.laBonneAlternanceHttpClientService.get<AlternanceResponse>(
        `jobs?${paramètresRecherche}`,
      );
      const résultats = mapAlternance(response.data);

      return {
        nombreRésultats: résultats.length,
        résultats,
      };
    } catch (e: unknown) {
      Sentry.captureMessage(`${this.API_LA_BONNE_ALTERNANCE_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`${this.API_LA_BONNE_ALTERNANCE_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);

      return {
        nombreRésultats: 0,
        résultats: [],
      };
    }
  }

  async getOffreAlternance(id: AlternanceId, from: From): Promise<Either<RésultatRechercheAlternance>> {
    let response;
    try {
      response = await this.laBonneAlternanceHttpClientService.get<AlternanceDetailResponse>(
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
      Sentry.captureMessage(`${this.API_LA_BONNE_ALTERNANCE_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`${this.API_LA_BONNE_ALTERNANCE_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  async buildParamètresRecherche(alternanceFiltre: AlternanceFiltre) {
    const { CONTACT_MAIL_FOR_MA_BONNE_ALTERNANCE } = this.configurationService.getConfiguration();

    let codeInseeCommune;
    if(alternanceFiltre.codeLocalisation) {
      codeInseeCommune = await this.apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune(alternanceFiltre.codeLocalisation);
    }

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      insee: codeInseeCommune,
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

