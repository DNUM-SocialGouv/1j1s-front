import { BffMissionEngagementService } from '~/client/services/missionEngagement/bff.missionEngagement.service';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import {
	anAmbassadeurDuDonDeVêtementMission,
	aRésultatRechercheMission,
} from '~/server/engagement/domain/missionEngagement.fixture';

export function aMissionEngagementService(): MissionEngagementService {
	return {
		rechercherMission: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatRechercheMission() }),
	} ;
}

export function aSingleResultMissionEngagementService(): MissionEngagementService {
	return {
		rechercherMission: jest.fn().mockResolvedValue({ instance: 'success' , result: { nombreRésultats: 1, résultats: [anAmbassadeurDuDonDeVêtementMission()] } }),
	} ;
}
