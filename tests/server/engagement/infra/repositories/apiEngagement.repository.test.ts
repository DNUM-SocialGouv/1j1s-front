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
import { HttpClientService } from '~/server/services/http/httpClient.service';

jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiEngagementRepository', () => {
  let httpClientService: HttpClientService;
  let apiEngagementRepository: ApiEngagementRepository;

  beforeEach(() => {
    httpClientService = anEngagementHttpClientService();
    apiEngagementRepository = new ApiEngagementRepository(httpClientService);
  });

  describe('searchMissionEngagement', () => {
    describe('quand l\'api engagement répond avec une 200', () => {
      it('recherche les missions', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));
        const missionEngagementFiltre = aMissionEngagementFiltre();

        const { result } = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Success<RésultatsRechercheMission>;
        expect(result).toEqual(aRésultatRechercheMission());
        expect(httpClientService.get).toHaveBeenCalledWith('mission/search?distance=10km&domain=sante&from=0&lat=2.3522&lon=48.8566&openToMinors=yes&publisher=a-publisher-id&size=30', mapRésultatsRechercheMission);
      });
    });
  });

  describe('getMissionEngagement', () => {
    const missionEngagementId = '62b14f22c075d0071ada2ce4';
    describe('quand l\'api engagement répond avec une 200', () => {
      it('recherche les missions', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(anAmbassadeurDuDonDeVêtementMissionSolo()));


        const { result } = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Success<Mission>;

        expect(result).toEqual(anAmbassadeurDuDonDeVêtementMissionSolo());
        expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4', mapMission);
      });
    });
  });
});
