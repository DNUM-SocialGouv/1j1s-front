import {
	Mission,
	MissionEngagement,
	MissionId,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export interface EngagementRepository {
  getMissionEngagement(id: MissionId): Promise<Either<Mission>>
  searchMissionBénévolat(missionServiceCiviqueFiltre: MissionEngagement.Recherche.Benevolat): Promise<Either<RésultatsRechercheMission>>
  searchMissionServiceCivique(missionServiceCiviqueFiltre: MissionEngagement.Recherche.ServiceCivique): Promise<Either<RésultatsRechercheMission>>
}
