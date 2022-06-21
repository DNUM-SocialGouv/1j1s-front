import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatRechercheMission } from '@tests/fixtures/domain/missionEngagement.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';

describe('MissionEngagementService', () => {
  describe('rechercherMission', () => {
    describe('quand la catégorie est service-civique', () => {
      it('appelle missions-service-civique avec le filtre', async () => {
        const httpClientService = aHttpClientService();
        const missionEngagementService = new MissionEngagementService(httpClientService);
        const catégorie = 'service-civique';
        const missionEngagementQuery = 'text=humanitaire&page=2';

        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatRechercheMission()));

        const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

        expect(result).toEqual({ instance: 'success', result: aRésultatRechercheMission() });
        expect(httpClientService.get).toHaveBeenCalledWith('missions-service-civique?text=humanitaire&page=2');

      });
    });

    describe('quand la catégorie est bénévolat', () => {
      it('appelle missions-service-civique avec le filtre', async () => {
        const httpClientService = aHttpClientService();
        const missionEngagementService = new MissionEngagementService(httpClientService);
        const catégorie = 'bénévola';
        const missionEngagementQuery = 'text=humanitaire&page=2';

        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatRechercheMission()));

        const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

        expect(result).toEqual({ instance: 'success', result: aRésultatRechercheMission() });
        expect(httpClientService.get).toHaveBeenCalledWith('missions-benevolat?text=humanitaire&page=2');

      });
    });
  });
});
