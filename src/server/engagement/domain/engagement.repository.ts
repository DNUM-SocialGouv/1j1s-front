import {
	Mission,
	MissionEngagementRechercheBenevolat,
	MissionEngagementRechercheServiceCivique,
	MissionId,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export interface EngagementRepository {
  getMissionEngagement(id: MissionId): Promise<Either<Mission>>
  searchMissionBénévolat(missionServiceCiviqueFiltre: MissionEngagementRechercheBenevolat): Promise<Either<RésultatsRechercheMission>>
  searchMissionServiceCivique(missionServiceCiviqueFiltre: MissionEngagementRechercheServiceCivique): Promise<Either<RésultatsRechercheMission>>
}
