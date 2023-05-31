import { Mission, MissionEngagement, RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import {
	anAmbassadeurDuDonDeVêtementMission,
	aRésultatRechercheMission,
} from '~/server/engagement/domain/missionEngagement.fixture';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import {
	anAmbassadeurDuDonDeVêtementMissionResponse,
	aSearchMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response.fixture';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

jest.mock('axios', () => {
	return {
		isAxiosError: jest.fn().mockReturnValue(true),
	};
});

describe('ApiEngagementRepository', () => {
	let httpClientService: PublicHttpClientService;
	let apiEngagementRepository: ApiEngagementRepository;
	let errorManagementService: ErrorManagementService;

	beforeEach(() => {
		httpClientService = aPublicHttpClientService();
		errorManagementService = anErrorManagementService();
		apiEngagementRepository = new ApiEngagementRepository(httpClientService, errorManagementService);
	});

	describe('searchMissionServiceCivique', () => {
		describe('quand l’api engagement répond avec une 200', () => {
			it('recherche les missions de service civique', async () => {
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aSearchMissionEngagementResponse()));
				const rechercheServiceCivique: MissionEngagement.Recherche.ServiceCivique = {
					domaine: 'sante',
					localisation: {
						distance: 10,
						latitude: 2.3522,
						longitude: 48.8566,
					},
					ouvertAuxMineurs: true,
					page: 1,
				};

				const { result } = await apiEngagementRepository.searchMissionServiceCivique(rechercheServiceCivique) as Success<RésultatsRechercheMission>;
				expect(result).toEqual(aRésultatRechercheMission());
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/^mission\/search/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('domain=sante'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('from=0'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('publisher=5f99dbe75eb1ad767733b206'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('size=15'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('openToMinors=yes'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('distance=10km'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('lat=2.3522'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('lon=48.8566'));
			});
		});

		describe('quand l’api engagement répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const httpError = anHttpError(500);
				const errorReturnedByErrorManagementService = ErreurMétier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
				const rechercheServiceCivique: MissionEngagement.Recherche.ServiceCivique = {
					domaine: 'sante',
					localisation: {
						distance: 10,
						latitude: 2.3522,
						longitude: 48.8566,
					},
					ouvertAuxMineurs: true,
					page: 1,
				};

				const { errorType } = await apiEngagementRepository.searchMissionServiceCivique(rechercheServiceCivique) as Failure;

				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/^mission\/search/));
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Engagement',
					contexte: 'search mission d’engagement',
					message: '[API Engagement] impossible d’effectuer une recherche',
				}); // TODO SULI : utiliser aLogInformation, idem sur les deux instances ci-dessous
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
			});
		});
	});

	describe('searchMissionBénévolat', () => {
		describe('quand l’api engagement répond avec une 200', () => {
			it('recherche les missions', async () => {
				jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aSearchMissionEngagementResponse()));
				const rechercheBénévolat: MissionEngagement.Recherche.Benevolat = {
					domaine: 'sante',
					localisation: {
						distance: 10,
						latitude: 2.3522,
						longitude: 48.8566,
					},
					ouvertAuxMineurs: true,
					page: 1,
				};

				const { result } = await apiEngagementRepository.searchMissionBénévolat(rechercheBénévolat) as Success<RésultatsRechercheMission>;
				expect(result).toEqual(aRésultatRechercheMission());
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/^mission\/search/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('domain=sante'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('from=0'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('publisher=5f5931496c7ea514150a818f'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('size=15'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('openToMinors=yes'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('distance=10km'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('lat=2.3522'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('lon=48.8566'));
			});
		});

		describe('quand l’api engagement répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const httpError = anHttpError(500);
				const errorReturnedByErrorManagementService = ErreurMétier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));
				const rechercheBénévolat: MissionEngagement.Recherche.Benevolat = {
					domaine: 'sante',
					localisation: {
						distance: 10,
						latitude: 2.3522,
						longitude: 48.8566,
					},
					ouvertAuxMineurs: true,
					page: 1,
				};

				const { errorType } = await apiEngagementRepository.searchMissionBénévolat(rechercheBénévolat) as Failure;

				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/^mission\/search/));
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Engagement',
					contexte: 'search mission d’engagement',
					message: '[API Engagement] impossible d’effectuer une recherche',
				});
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
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

		describe('quand l’api engagement répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const httpError = anHttpError(500);
				const errorReturnedByErrorManagementService = ErreurMétier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				const { errorType } = await apiEngagementRepository.getMissionEngagement(missionEngagementId) as Failure;

				expect(httpClientService.get).toHaveBeenCalledWith('mission/62b14f22c075d0071ada2ce4');
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Engagement',
					contexte: 'get détail mission d’engagement',
					message: '[API Engagement] impossible de récupérer le détail d’une mission',
				});
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
			});
		});
	});
});
