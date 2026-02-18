import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import {
	anAmbassadeurDuDonDeVêtementMission,
	aRésultatRechercheMission,
} from '~/server/engagement/domain/missionEngagement.fixture';
import { createSuccess } from '~/server/errors/either';

export function aMissionEngagementService(): MissionEngagementService {
	return {
		rechercherMission: vi.fn().mockResolvedValue(createSuccess(aRésultatRechercheMission())),
	};
}

export function aSingleResultMissionEngagementService(): MissionEngagementService {
	return {
		rechercherMission: vi.fn().mockResolvedValue(createSuccess({
			nombreRésultats: 1,
			résultats: [anAmbassadeurDuDonDeVêtementMission()],
		})),
	};
}
