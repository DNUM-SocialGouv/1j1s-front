import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
import axios from 'axios';

import {
  Mission,
  MissionEngagementFiltre,
  MissionId,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import {
  mapMission,
  mapRésultatsRechercheMission,
} from '~/server/engagement/infra/repositories/apiEngagement.mapper';
import {
  RésultatsMissionEngagementResponse,
  RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiEngagementRepository implements EngagementRepository {
  constructor(private engagementHttpClientService: EngagementHttpClientService) {
  }

  API_ENGAGEMENT_PREFIX_LOG = 'API_ENGAGEMENT';

  async getMissionEngagement(id: MissionId): Promise<Either<Mission>> {
    let response;

    try {
      response = await this.engagementHttpClientService.get<RésultatsMissionEngagementResponse>(
        `mission/${id}`,
      );

      if (response.status === 204) {
        return createFailure(ErrorType.CONTENU_INDISPONIBLE);
      } else {
        return createSuccess(mapMission(response.data));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
      }
      Sentry.captureMessage(`${this.API_ENGAGEMENT_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`${this.API_ENGAGEMENT_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  async searchMissionEngagement(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
    let response;
    const paramètresRecherche = this.buildParamètresRecherche(missionEngagementFiltre);
    try {
      const response = await this.engagementHttpClientService.get<RésultatsRechercheMissionEngagementResponse>(`mission/search?${paramètresRecherche}`);
      return createSuccess(mapRésultatsRechercheMission(response.data));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if (e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
      }
      Sentry.captureMessage(`${this.API_ENGAGEMENT_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`${this.API_ENGAGEMENT_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  private buildParamètresRecherche(missionEngagementFiltre: MissionEngagementFiltre): string {
    const { from, domain, publisher, size, lon, lat, distance } = missionEngagementFiltre;
    // eslint-disable-next-line
    const queryList: Record<string, any > = {
      distance : distance ? `${distance}km`: distance,
      domain,
      from,
      lat,
      lon,
      publisher,
      size,
    };
    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }
}
