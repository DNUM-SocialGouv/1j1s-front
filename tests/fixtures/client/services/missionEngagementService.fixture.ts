import {
  anAmbassadeurDuDonDeVêtementMission,
  aRésultatRechercheMission,
} from '@tests/fixtures/domain/missionEngagement.fixture';

import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';

export function aMissionEngagementService(): MissionEngagementService {
  return {
    rechercherMission: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatRechercheMission() }),
  } as unknown as MissionEngagementService;
}

export function aSingleResultMissionEngagementService(): MissionEngagementService {
  return {
    rechercherMission: jest.fn().mockResolvedValue({ instance: 'success' , result: { nombreRésultats: 1, résultats: [anAmbassadeurDuDonDeVêtementMission()] } }),
  } as unknown as MissionEngagementService;
}
