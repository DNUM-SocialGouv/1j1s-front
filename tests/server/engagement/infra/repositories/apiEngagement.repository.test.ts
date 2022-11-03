import {
  aMissionEngagementFiltre,
  anAmbassadeurDuDonDeVêtementMission,
  aRésultatRechercheMission,
} from '@tests/fixtures/domain/missionEngagement.fixture';
import {
  anAmbassadeurDuDonDeVêtementMissionResponse,
  anInvalidIdMissionResponse,
  aSearchMissionEngagementResponse,
} from '@tests/fixtures/server/engagement/apiEngagement.response.fixture';
import { anEngagementHttpClientService } from '@tests/fixtures/services/engagementHttpClientService.fixture';
import { anAxiosError, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { Mission, RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import {
  Failure,
  Success,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClientService';

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
        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aSearchMissionEngagementResponse()));
        const missionEngagementFiltre = aMissionEngagementFiltre();

        const { result } = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Success<RésultatsRechercheMission>;
        expect(result).toEqual(aRésultatRechercheMission());
        expect(httpClientService.get).toHaveBeenCalledWith('mission/search?distance=10km&domain=sante&from=0&lat=2.3522&lon=48.8566&openToMinors=yes&publisher=a-publisher-id&size=30');
      });
    });

    describe('quand l\'api engagement répond avec une erreur', () => {
      it('retourne une erreur service indisponible', async () => {
        jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError({}));
        const missionEngagementFiltre = aMissionEngagementFiltre();

        const { errorType } = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Failure;
        expect(errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
        expect(httpClientService.get).toHaveBeenCalledWith('mission/search?distance=10km&domain=sante&from=0&lat=2.3522&lon=48.8566&openToMinors=yes&publisher=a-publisher-id&size=30');
      });
    });
  });

  describe('getMissionEngagement', () => {
    const missionEngagementId = '62b14f22c075d0071ada2ce4';
    describe('quand l\'api engagement répond avec une 200', () => {
      it('retourne la mission recherchée', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(anAmbassadeurDuDonDeVêtementMissionResponse()));


        const { result } = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Success<Mission>;

        expect(result).toEqual(anAmbassadeurDuDonDeVêtementMission());
        expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
      });
    });

    describe("quand l'api engagement répond avec une 403", () => {
      it('retourne une erreur contenu indisponible', async () => {
        jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError(anInvalidIdMissionResponse()));


        const result = await apiEngagementRepository.getMissionEngagement(missionEngagementId);

        expect((result as Failure).errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
        expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
      });
    });

    describe("quand l'api engagement répond avec un autre code d'erreur", () => {
      it('retourne une erreur service indisponible', async () => {
        jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError({
          response: anAxiosResponse({}, 500),
        }));


        const result = await apiEngagementRepository.getMissionEngagement(missionEngagementId);

        expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
        expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
      });
    });
  });
});
