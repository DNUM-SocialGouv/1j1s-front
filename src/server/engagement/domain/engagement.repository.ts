import {
  MissionEngagementFiltre,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export interface EngagementRepository {
  searchMissionEngagement(missionServiceCiviqueFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>>
}
