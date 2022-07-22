import {
  aMissionEngagementFiltre,
  anAmbassadeurDuDonDeVêtementMissionSolo,
  aRésultatRechercheMission,
} from '@tests/fixtures/domain/missionEngagement.fixture';
import { anEngagementHttpClientService } from '@tests/fixtures/services/engagementHttpClientService.fixture';

import { Mission, RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { mapMission, mapRésultatsRechercheMission } from '~/server/engagement/infra/repositories/apiEngagement.mapper';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { createSuccess, Success } from '~/server/errors/either';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiEngagementRepository', () => {
  let engagementHttpClientService: EngagementHttpClientService;
  let apiEngagementRepository: ApiEngagementRepository;

  beforeEach(() => {
    engagementHttpClientService = anEngagementHttpClientService();
    apiEngagementRepository = new ApiEngagementRepository(engagementHttpClientService);
  });

  describe('searchMissionEngagement', () => {
    describe('quand l\'api engagement répond avec une 200', () => {
      it('recherche les missions', async () => {
        jest.spyOn(engagementHttpClientService, 'get').mockResolvedValue(createSuccess({
          data: aRésultatRechercheMission(),
          status: 200,
        }));
        const missionEngagementFiltre = aMissionEngagementFiltre();

        const { result } = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Success<RésultatsRechercheMission>;
        expect(result).toEqual(aRésultatRechercheMission());
        expect(engagementHttpClientService.get).toHaveBeenCalledWith('mission/search?distance=10km&domain=sante&from=1&lat=2.3522&lon=48.8566&openToMinors=yes&publisher=a-publisher-id&size=30', mapRésultatsRechercheMission);
      });
    });
  });

  describe('getMissionEngagement', () => {
    const missionEngagementId = '62b14f22c075d0071ada2ce4';
    describe('quand l\'api engagement répond avec une 200', () => {
      it('recherche les missions', async () => {
        jest.spyOn(engagementHttpClientService, 'get').mockResolvedValue(createSuccess({
          data: anAmbassadeurDuDonDeVêtementMissionSolo(),
          status: 200,
        }));


        const { result } = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Success<Mission>;

        expect(result).toEqual(anAmbassadeurDuDonDeVêtementMissionSolo());
        expect(engagementHttpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4', mapMission);
      });
    });
  });
});
