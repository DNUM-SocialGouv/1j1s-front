import {
  Mission,
  MissionEngagementFiltre,
  MissionId,
  R├ęsultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export interface EngagementRepository {
  getMissionEngagement(id: MissionId): Promise<Either<Mission>>
  searchMissionEngagement(missionServiceCiviqueFiltre: MissionEngagementFiltre): Promise<Either<R├ęsultatsRechercheMission>>
}
