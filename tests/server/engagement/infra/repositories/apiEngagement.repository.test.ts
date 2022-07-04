import {
  aMissionEngagementFiltre,
  aRésultatMission,
  aRésultatRechercheMission,
} from '@tests/fixtures/domain/missionEngagement.fixture';
import {
  anEngagementHttpClientService,
  aRésultatMissionAxiosResponse,
  aRésultatRechercheMissionAxiosResponse,
} from '@tests/fixtures/services/engagementHttpClientService.fixture';
import { anAxiosErreur } from '@tests/fixtures/services/httpClientService.fixture';

import { Mission, RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import {
  Failure,
  Success,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

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
        jest.spyOn(engagementHttpClientService, 'get').mockResolvedValue(aRésultatRechercheMissionAxiosResponse());
        const missionEngagementFiltre = aMissionEngagementFiltre();

        const { result } = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Success<RésultatsRechercheMission>;
        expect(result).toEqual(aRésultatRechercheMission());
        expect(engagementHttpClientService.get).toHaveBeenCalledWith('mission/search?domain=sante&from=1&publisher=a-publisher-id&size=30');
      });
    });

    describe('quand l\'api engagement répond avec une erreur', () => {
      describe('quand l\'api engagement répond avec une 500', () => {
        it('on renvoie une failure avec une error SERVICE_INDISPONIBLE', async () => {
          jest
            .spyOn(engagementHttpClientService, 'get')
            .mockResolvedValue(Promise.reject(anAxiosErreur(500)));
          const missionEngagementFiltre = aMissionEngagementFiltre();

          const result = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Failure;

          expect(result.errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
        });
      });

      describe('quand l\'api engagement répond avec une 400', () => {
        it('on renvoie une failure avec une error ERREUR_DE_SAISIE', async () => {
          jest
            .spyOn(engagementHttpClientService, 'get')
            .mockResolvedValue(Promise.reject(anAxiosErreur(400)));
          const missionEngagementFiltre = aMissionEngagementFiltre();

          const result = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Failure;

          expect(result.errorType).toEqual(ErrorType.DEMANDE_INCORRECTE);
        });
      });

      describe('quand l\'api engagement répond avec une erreur non traité', () => {
        it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
          jest
            .spyOn(engagementHttpClientService, 'get')
            .mockResolvedValue(Promise.reject({ response: { status: 503 } }));
          const missionEngagementFiltre = aMissionEngagementFiltre();

          const result = await apiEngagementRepository.searchMissionEngagement(missionEngagementFiltre) as Failure;

          expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
        });
      });
    });
  });

  describe('getMissionEngagement', () => {
    const missionEngagementId = '62b14f22c075d0071ada2ce4';
    describe('quand l\'api engagement répond avec une 200', () => {
      it('recherche les missions', async () => {
        jest.spyOn(engagementHttpClientService, 'get').mockResolvedValue(aRésultatMissionAxiosResponse());


        const { result } = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Success<Mission>;

        expect(result).toEqual(aRésultatMission());
        expect(engagementHttpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
      });
    });
    describe('quand l\'api engagement répond avec une erreur', () => {
      describe('quand l\'api engagement répond avec une 500', () => {
        it('on renvoie une failure avec une error SERVICE_INDISPONIBLE', async () => {
          jest
            .spyOn(engagementHttpClientService, 'get')
            .mockResolvedValue(Promise.reject(anAxiosErreur(500)));


          const result = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Failure;

          expect(result.errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
        });
      });

      describe('quand l\'api engagement répond avec une 400', () => {
        it('on renvoie une failure avec une error ERREUR_DE_SAISIE', async () => {
          jest
            .spyOn(engagementHttpClientService, 'get')
            .mockResolvedValue(Promise.reject(anAxiosErreur(400)));

          const result = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Failure;

          expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE); //Should be DEMANDE_INCORRECTE
        });
      });

      describe('quand l\'api engagement répond avec une erreur non traité', () => {
        it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
          jest
            .spyOn(engagementHttpClientService, 'get')
            .mockResolvedValue(Promise.reject({ response: { status: 503 } }));

          const result = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Failure;

          expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
        });
      });
    });
  });
});
