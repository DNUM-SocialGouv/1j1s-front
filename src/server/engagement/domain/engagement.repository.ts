import {
  Mission,
  MissionEngagementFiltre,
  MissionId,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export interface EngagementRepository {
  getMissionEngagement(id: MissionId): Promise<Either<Mission>>
  searchMissionEngagement(missionServiceCiviqueFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>>
}
