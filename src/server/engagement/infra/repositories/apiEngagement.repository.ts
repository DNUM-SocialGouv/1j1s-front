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
import { Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class ApiEngagementRepository implements EngagementRepository {
  constructor(private httpClientService: HttpClientService) {
  }

  async getMissionEngagement(id: MissionId): Promise<Either<Mission>> {
    return await this.httpClientService.get<RésultatsMissionEngagementResponse, Mission>(
      `mission/${id}`,
      mapMission,
    );
  }

  async searchMissionEngagement(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
    const paramètresRecherche = buildParamètresRechercheApiEngagement(missionEngagementFiltre);

    return await this.httpClientService.get<RésultatsRechercheMissionEngagementResponse, RésultatsRechercheMission>(
      `mission/search?${paramètresRecherche}`,
      mapRésultatsRechercheMission,
    );
  }
}
