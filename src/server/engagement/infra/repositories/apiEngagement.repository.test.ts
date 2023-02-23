import { Mission, RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import {
	aMissionEngagementFiltre,
	anAmbassadeurDuDonDeVêtementMission,
	aRésultatRechercheMission,
} from '~/server/engagement/domain/missionEngagement.fixture';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import {
	anAmbassadeurDuDonDeVêtementMissionResponse,
	anInvalidIdMissionResponse,
	aSearchMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response.fixture';
import {
	Failure,
	Success,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClientService';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

jest.mock('axios', () => {
	return {
		isAxiosError: jest.fn().mockReturnValue(true),
	};
});

describe('ApiEngagementRepository', () => {
	let httpClientService: HttpClientService;
	let apiEngagementRepository: ApiEngagementRepository;

	beforeEach(() => {
		httpClientService = anHttpClientService();
		apiEngagementRepository = new ApiEngagementRepository(httpClientService);
	});

	describe('searchMissionServiceCivique', () => {
		describe('quand l’api engagement répond avec une 200', () => {
			it('recherche les missions de service civique', async () => {
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aSearchMissionEngagementResponse()));
				const missionEngagementFiltre = aMissionEngagementFiltre();

				const { result } = await apiEngagementRepository.searchMissionServiceCivique(missionEngagementFiltre) as Success<RésultatsRechercheMission>;
				expect(result).toEqual(aRésultatRechercheMission());
				expect(httpClientService.get).toHaveBeenCalledWith('mission/search?domain=sante&from=0&publisher=5f99dbe75eb1ad767733b206&size=15&openToMinors=yes&distance=10km&lat=2.3522&lon=48.8566');
			});
		});

		describe('quand l’api engagement répond avec une erreur', () => {
			it('retourne une erreur service indisponible', async () => {
				jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError({}));
				const missionEngagementFiltre = aMissionEngagementFiltre();

				const { errorType } = await apiEngagementRepository.searchMissionServiceCivique(missionEngagementFiltre) as Failure;
				expect(errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
				expect(httpClientService.get).toHaveBeenCalledWith('mission/search?domain=sante&from=0&publisher=5f99dbe75eb1ad767733b206&size=15&openToMinors=yes&distance=10km&lat=2.3522&lon=48.8566');
			});
		});
	});

	describe('searchMissionBénévolat', () => {
		describe('quand l’api engagement répond avec une 200', () => {
			it('recherche les missions', async () => {
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aSearchMissionEngagementResponse()));
				const missionEngagementFiltre = aMissionEngagementFiltre();

				const { result } = await apiEngagementRepository.searchMissionBénévolat(missionEngagementFiltre) as Success<RésultatsRechercheMission>;
				expect(result).toEqual(aRésultatRechercheMission());
				expect(httpClientService.get).toHaveBeenCalledWith('mission/search?domain=sante&from=0&publisher=5f5931496c7ea514150a818f&size=15&openToMinors=yes&distance=10km&lat=2.3522&lon=48.8566');
			});
		});

		describe('quand l’api engagement répond avec une erreur', () => {
			it('retourne une erreur service indisponible', async () => {
				jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError({}));
				const missionEngagementFiltre = aMissionEngagementFiltre();

				const { errorType } = await apiEngagementRepository.searchMissionServiceCivique(missionEngagementFiltre) as Failure;
				expect(errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
				expect(httpClientService.get).toHaveBeenCalledWith('mission/search?domain=sante&from=0&publisher=5f99dbe75eb1ad767733b206&size=15&openToMinors=yes&distance=10km&lat=2.3522&lon=48.8566');
			});
		});
	});

	describe('getMissionEngagement', () => {
		const missionEngagementId = '62b14f22c075d0071ada2ce4';
		describe('quand l’api engagement répond avec une 200', () => {
			it('retourne la mission recherchée', async () => {
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(anAmbassadeurDuDonDeVêtementMissionResponse()));


				const { result } = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Success<Mission>;

				expect(result).toEqual(anAmbassadeurDuDonDeVêtementMission());
				expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
			});
		});

		describe('quand l’api engagement répond avec une 403', () => {
			it('retourne une erreur contenu indisponible', async () => {
				jest.spyOn(httpClientService, 'get').mockRejectedValue(anAxiosError(anInvalidIdMissionResponse()));

				const result = await apiEngagementRepository.getMissionEngagement(missionEngagementId);

				expect((result as Failure).errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
				expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
			});
		});

		describe('quand l’api engagement répond avec un autre code d’erreur', () => {
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
