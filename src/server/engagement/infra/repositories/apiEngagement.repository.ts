import axios, { AxiosError } from 'axios';

import {
  Mission,
  MissionEngagementFiltre,
  MissionId,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { buildParamètresRechercheApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.builder';
import { mapMission, mapRésultatsRechercheMission } from '~/server/engagement/infra/repositories/apiEngagement.mapper';
import {
  RésultatsMissionEngagementResponse,
  RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

interface ApiEngagementErrorResponse {
  error: string
}

export class ApiEngagementRepository implements EngagementRepository {
  constructor(private httpClientService: HttpClientService) {}

  async getMissionEngagement(id: MissionId): Promise<Either<Mission>> {
    try {
      const response = await this.httpClientService.get<RésultatsMissionEngagementResponse>(
        `mission/${id}`,
      );
      return createSuccess(mapMission(response.data));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error: AxiosError<ApiEngagementErrorResponse> = e as AxiosError<ApiEngagementErrorResponse>;
        if (e.response?.status === 403 && error.response?.data.error === 'Id not valid') {
          LoggerService.warn('[API Engagement] Id de mission invalide');
          return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
        }
      }
      LoggerService.error('[API Engagement] Impossible de récupérer la mission ' + id);
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }

  async searchMissionEngagement(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
    const paramètresRecherche = buildParamètresRechercheApiEngagement(missionEngagementFiltre);

    try {
      const response = await this.httpClientService.get<RésultatsRechercheMissionEngagementResponse>(
        `mission/search?${paramètresRecherche}`,
      );
      return createSuccess(mapRésultatsRechercheMission(response.data));
    } catch (e) {
      LoggerService.error('[API Engagement] Impossible de recherche les missions');
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}
