import { aRésultatRechercheMission } from '@tests/fixtures/domain/missionEngagement.fixture';

import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';

export function aMissionEngagementService(): MissionEngagementService {
  return {
    rechercherMission: jest.fn().mockResolvedValue({ instance: 'success' , result: aRésultatRechercheMission() }),
  } as unknown as MissionEngagementService;
}
