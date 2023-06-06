import { ApiPoleEmploiOffreRepository } from '~/server/emplois/infra/repositories/apiPoleEmploiOffre.repository';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Offre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import {
	aBarmanOffre,
	anOffreÉchantillonAvecLocalisationEtMotCléFiltre,
	anOffreÉchantillonFiltre,
	anOffreEmploiFiltre,
	aRésultatsRechercheOffre,
} from '~/server/offres/domain/offre.fixture';
import {
	aBarmanOffreEmploiApiResponse,
	aRésultatsRechercheOffreEmploiApiResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiOffre.response.fixture';
import {
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import {
	aPoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service.fixture';
import { CacheService } from '~/server/services/cache/cache.service';
import { MockedCacheService } from '~/server/services/cache/cacheService.fixture';
import {
	anErrorManagementService,
	anErrorManagementWithErrorCheckingService,
} from '~/server/services/error/errorManagement.fixture';
import {
	ErrorManagementService,
	ErrorManagementWithErrorCheckingService,
} from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiPoleEmploiOffreRepository', () => {
	let httpClientServiceWithAuthentification: AuthenticatedHttpClientService;
	let apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository;
	let poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService;
	let cacheService: CacheService;
	let apiPoleEmploiErrorManagementSearch: ErrorManagementService;
	let apiPoleEmploiErrorManagementGet: ErrorManagementWithErrorCheckingService;

	beforeEach(() => {
		cacheService = new MockedCacheService();
		httpClientServiceWithAuthentification = anAuthenticatedHttpClientService();
		poleEmploiParamètreBuilderService = aPoleEmploiParamètreBuilderService();
		apiPoleEmploiErrorManagementSearch = anErrorManagementService();
		apiPoleEmploiErrorManagementGet = anErrorManagementWithErrorCheckingService();
		apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiErrorManagementSearch, apiPoleEmploiErrorManagementGet);
	});

	describe('getOffreEmploi', () => {
		describe('quand l’offre d’emploi est trouvé', () => {
			it('récupère l’offre d’emploi selon l’id', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aBarmanOffreEmploiApiResponse()));
				const expected = aBarmanOffre();
				const offreEmploiId = expected.id;

				const { result } = await apiPoleEmploiOffreRepository.get(offreEmploiId) as Success<Offre>;

				expect(result).toEqual(expected);
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
					'/132LKFB',
				);
			});
		});
		describe('lorsqu‘il y a une erreur', () => {
			it('retourne une erreur', async () => {
				const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;
				const httpError = anAxiosResponse(anHttpError(404));
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockRejectedValue(httpError);
				jest.spyOn(apiPoleEmploiErrorManagementGet, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));

				const result = await apiPoleEmploiOffreRepository.get(aBarmanOffre().id);

				expect(apiPoleEmploiErrorManagementGet.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Pole Emploi',
					contexte: 'détail offre emploi', message: '[API Pole Emploi] impossible de récupérer une ressource',
				});
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});
		describe('lorsque l‘api nous renvoie une 204', () => {
			it('retourne une erreur', async () => {
				const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;
				const apiResponse = anAxiosResponse(aBarmanOffreEmploiApiResponse(), 204);
				jest.spyOn(httpClientServiceWithAuthentification, 'get').mockResolvedValue(apiResponse);
				jest.spyOn(apiPoleEmploiErrorManagementGet, 'isError').mockReturnValue(true);
				jest.spyOn(apiPoleEmploiErrorManagementGet, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));
				
				const result = await apiPoleEmploiOffreRepository.get(aBarmanOffre().id);

				expect(apiPoleEmploiErrorManagementGet.handleFailureError).toHaveBeenCalledWith(apiResponse, {
					apiSource: 'API Pole Emploi',
					contexte: 'détail offre emploi', message: '[API Pole Emploi] impossible de récupérer une ressource',
				});
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});
	});

	describe('search', () => {
		describe('quand la recherche est lancée automatiquement pour les offres d‘emplois', () => {
			describe('quand les informations ne sont pas encore mis en cache', () => {
				it('fait l‘appel à l‘api et set les informations dans le cache', async () => {
					jest
						.spyOn(httpClientServiceWithAuthentification, 'get')
						.mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploiApiResponse()));

					jest
						.spyOn(poleEmploiParamètreBuilderService, 'buildCommonParamètresRecherche')
						.mockResolvedValue('range=0-14');

					jest.spyOn(cacheService, 'get').mockResolvedValue(null);
					jest.spyOn(cacheService, 'set');

					const offreFiltre = anOffreÉchantillonFiltre();

					const { result } = await apiPoleEmploiOffreRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

					expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_EMPLOI_KEY');

					expect(result).toEqual(aRésultatsRechercheOffre());
					expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
						'/search?range=0-14&natureContrat=E1,FA,FJ,FT,FU,I1,NS,FV,FW,FX,FY,PS,PR,CC,CU,EE,ER,CI',
					);

					expect(cacheService.set).toHaveBeenCalledWith('ECHANTILLON_OFFRE_EMPLOI_KEY', aRésultatsRechercheOffreEmploiApiResponse(), 24);
				});
			});

			describe('quand les informations sont déjà en cache', () => {
				it('ne fait pas l‘appel à l‘api et get les informations du cache', async () => {
					jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiApiResponse());
					jest.spyOn(cacheService, 'set');

					const offreFiltre = anOffreÉchantillonFiltre();

					const { result } = await apiPoleEmploiOffreRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

					expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_EMPLOI_KEY');

					expect(result).toEqual(aRésultatsRechercheOffre());
					expect(httpClientServiceWithAuthentification.get).not.toHaveBeenCalled();

					expect(cacheService.set).not.toHaveBeenCalled();
				});

			});
		});

		describe('quand la recherche est lancée par l‘utilisateur', () => {
			it('ne get pas les informations du cache et fait appel à l‘api avec les filtres', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploiApiResponse()));

				jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiApiResponse());
				jest.spyOn(cacheService, 'set');

				const offreFiltre = anOffreEmploiFiltre();

				const { result } = await apiPoleEmploiOffreRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

				expect(cacheService.get).not.toHaveBeenCalled();

				expect(result).toEqual(aRésultatsRechercheOffre());
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalled();

				expect(cacheService.set).not.toHaveBeenCalled();
			});
		});

		describe('quand nombre de résultat est présent dans la réponse', () => {
			it('recherche les offres d’emploi de pole emploi', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploiApiResponse()));
				jest
					.spyOn(poleEmploiParamètreBuilderService, 'buildCommonParamètresRecherche')
					.mockResolvedValue('region=34&motsCles=boulanger&range=0-14');
				const offreEmploiFiltre = anOffreEmploiFiltre();

				const { result } = await apiPoleEmploiOffreRepository.search(offreEmploiFiltre) as Success<RésultatsRechercheOffre>;

				expect(result).toEqual(aRésultatsRechercheOffre());
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
					'/search?typeContrat=CDD%2CCDI&region=34&motsCles=boulanger&range=0-14',
				);
			});
		});

		describe('quand l’api renvoie une 204', () => {
			it('retourne un success avec une liste vide', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse({}, 204));

				const { result } = await apiPoleEmploiOffreRepository.search(anOffreÉchantillonAvecLocalisationEtMotCléFiltre()) as Success<RésultatsRechercheOffre>;

				expect(result).toEqual({ nombreRésultats: 0, résultats: [] });
			});
		});

		describe('quand l‘api nous renvoie une erreur', () => {
			it('retourne une erreur', async () => {
				const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;
				const httpError = anAxiosResponse(anHttpError(404));
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockRejectedValue(httpError);
				jest.spyOn(apiPoleEmploiErrorManagementSearch, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));

				const result = await apiPoleEmploiOffreRepository.search(anOffreÉchantillonAvecLocalisationEtMotCléFiltre());

				expect(apiPoleEmploiErrorManagementSearch.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Pole Emploi',
					contexte: 'recherche offre emploi', message: '[API Pole Emploi] impossible d’effectuer une recherche',
				});
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});

		describe('quand le cache nous renvoie rien et que l‘api nous renvoie une erreur', () => {
			it('retourne une erreur', async () => {
				const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;
				const httpError = anAxiosResponse(anHttpError(404));
				jest.spyOn(apiPoleEmploiErrorManagementSearch, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));
				jest.spyOn(cacheService, 'get').mockResolvedValue(null);
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockRejectedValue(httpError);

				const offreFiltre = anOffreÉchantillonFiltre();

				const result = await apiPoleEmploiOffreRepository.search(offreFiltre);

				expect(apiPoleEmploiErrorManagementSearch.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Pole Emploi',
					contexte: 'échantillon offre emploi', message: '[API Pole Emploi] impossible d’effectuer une recherche',
				});
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});
	});
});
