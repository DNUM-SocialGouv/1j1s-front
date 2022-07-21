import {
  Mission,
  MissionEngagementFiltre,
  MissionId,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { mapMission, mapRésultatsRechercheMission } from '~/server/engagement/infra/repositories/apiEngagement.mapper';
import {
  RésultatsMissionEngagementResponse,
  RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiEngagementRepository implements EngagementRepository {
  constructor(private engagementHttpClientService: EngagementHttpClientService) {
  }

  async getMissionEngagement(id: MissionId): Promise<Either<Mission>> {
    const response = await this.engagementHttpClientService.get<RésultatsMissionEngagementResponse>(
      `mission/${id}`,
    );

    switch (response.instance) {
      case 'success': {
        if (response.result.status === 204) {
          return createFailure(ErrorType.CONTENU_INDISPONIBLE);
        }
        return createSuccess(mapMission(response.result.data));
      }
      case 'failure': return response;
    }
  }

  async searchMissionEngagement(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
    const paramètresRecherche = ApiEngagementRepository.buildParamètresRecherche(missionEngagementFiltre);
    const response = await this.engagementHttpClientService.get<RésultatsRechercheMissionEngagementResponse>(
      `mission/search?${paramètresRecherche}`,
    );

    switch (response.instance) {
      case 'success': {
        return createSuccess(mapRésultatsRechercheMission(response.result.data));
      }
      case 'failure': return response;
    }
  }

  private static buildParamètresRecherche(missionEngagementFiltre: MissionEngagementFiltre): string {
    const { from, domain, publisher, size, lon, lat, distance, openToMinors } = missionEngagementFiltre;
    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      distance : distance ? `${distance}km`: distance,
      domain,
      from,
      lat,
      lon,
      openToMinors : openToMinors ? 'yes': undefined,
      publisher,
      size,
    };
    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }
}
