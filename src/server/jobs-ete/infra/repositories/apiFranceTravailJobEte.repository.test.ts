import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aJobEteFiltre } from '~/server/jobs-ete/domain/jobEte.fixture';
import {
	ApiFranceTravailJobEteRepository,
} from '~/server/jobs-ete/infra/repositories/apiFranceTravailJobEte.repository';
import { DomaineCode } from '~/server/offres/domain/offre';
import {
	anOffreÉchantillonAvecLocalisationEtMotCléFiltre,
	anOffreÉchantillonFiltre,
	anOffreEmploi,
	aRésultatsRechercheOffre,
} from '~/server/offres/domain/offre.fixture';
import {
	aBarmanOffreEmploiApiResponse,
	aRésultatsRechercheOffreEmploiApiResponse,
} from '~/server/offres/infra/repositories/france-travail/franceTravailOffre.response.fixture';
import {
	FranceTravailParametreBuilderService,
} from '~/server/offres/infra/repositories/france-travail/franceTravailParametreBuilder.service';
import {
	aFranceTravailParametreBuilderService,
} from '~/server/offres/infra/repositories/france-travail/franceTravailParametreBuilder.service.fixture';
import { CacheService } from '~/server/services/cache/cache.service';
import { NullCacheService } from '~/server/services/cache/nullCache.service';
import {
	aLogInformation,
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

describe('ApiFranceTravailJobEteRepository', () => {
	let httpClientServiceWithAuthentification: AuthenticatedHttpClientService;
	let apiFranceTravailJobEteRepository: ApiFranceTravailJobEteRepository;
	let franceTravailParametreBuilderService: FranceTravailParametreBuilderService;
	let cacheService: CacheService;
	let apiFranceTravailOffreErrorManagementSearch: ErrorManagementService;
	let apiFranceTravailOffreErrorManagementGet: ErrorManagementWithErrorCheckingService;

	beforeEach(() => {
		cacheService = new NullCacheService();
		httpClientServiceWithAuthentification = anAuthenticatedHttpClientService();
		franceTravailParametreBuilderService = aFranceTravailParametreBuilderService();
		apiFranceTravailOffreErrorManagementSearch = anErrorManagementService();
		apiFranceTravailOffreErrorManagementGet = anErrorManagementWithErrorCheckingService();
		apiFranceTravailJobEteRepository = new ApiFranceTravailJobEteRepository(httpClientServiceWithAuthentification, franceTravailParametreBuilderService, cacheService, apiFranceTravailOffreErrorManagementSearch, apiFranceTravailOffreErrorManagementGet);
	});

	describe('getOffresJobEte', () => {
		it('fait l‘appel avec l’id', async () => {
			vi
				.spyOn(httpClientServiceWithAuthentification, 'get')
				.mockResolvedValue(anAxiosResponse(aBarmanOffreEmploiApiResponse()));

			await apiFranceTravailJobEteRepository.get('132LKFB');

			expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith('/132LKFB');
		});

		describe('quand l’offre de job été est trouvée', () => {
			it('renvoie un succes avec l‘offre', async () => {
				vi
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aBarmanOffreEmploiApiResponse()));

				const result = await apiFranceTravailJobEteRepository.get('132LKFB');

				expect(result).toStrictEqual(createSuccess(anOffreEmploi({ id: '132LKFB' })));
			});
		});

		describe('lorsqu‘il y a une erreur lors de la récupération de l‘offre', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;
				const httpError = anAxiosResponse(anHttpError(404));
				vi
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockRejectedValue(httpError);
				vi.spyOn(apiFranceTravailOffreErrorManagementGet, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));

				const result = await apiFranceTravailJobEteRepository.get('/132LKFB');

				expect(apiFranceTravailOffreErrorManagementGet.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: 'API France Travail',
					contexte: 'détail job d‘été',
					message: 'impossible de récupérer le détail d‘un job d‘été',
				}));
				expect(result).toStrictEqual(createFailure(expectedFailure));
			});
		});

		describe('lorsque l‘api renvoie une 204', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const apiResponse = anAxiosResponse({}, 204);
				vi.spyOn(httpClientServiceWithAuthentification, 'get').mockResolvedValue(apiResponse);
				vi.spyOn(apiFranceTravailOffreErrorManagementGet, 'isError').mockReturnValue(true);
				vi.spyOn(apiFranceTravailOffreErrorManagementGet, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));

				const result = await apiFranceTravailJobEteRepository.get('/132LKFB');

				expect(apiFranceTravailOffreErrorManagementGet.handleFailureError).toHaveBeenCalledWith(apiResponse, aLogInformation({
					apiSource: 'API France Travail',
					contexte: 'détail job d‘été', message: 'impossible de récupérer le détail d‘un job d‘été',
				}));
				expect(result).toStrictEqual(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
			});
		});
	});

	describe('search', () => {
		describe('quand la recherche est lancée sans filtre', () => {
			it('appel le cache', async () => {
				vi.spyOn(cacheService, 'get');

				const rechercheSansFiltre = anOffreÉchantillonFiltre({ page: 1 });
				await apiFranceTravailJobEteRepository.search(rechercheSansFiltre);

				expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETE_KEY');
			});

			describe('quand les informations sont déjà mis en cache', () => {
				it('ne fait pas l‘appel à l‘api et renvoie les offres du cache', async () => {
					vi.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiApiResponse());
					vi.spyOn(httpClientServiceWithAuthentification, 'get');
					vi.spyOn(cacheService, 'set');

					const rechercheSansFiltre = anOffreÉchantillonFiltre({ page: 1 });

					const result = await apiFranceTravailJobEteRepository.search(rechercheSansFiltre);

					expect(httpClientServiceWithAuthentification.get).not.toHaveBeenCalled();
					expect(cacheService.set).not.toHaveBeenCalled();
					expect(result).toEqual(createSuccess(aRésultatsRechercheOffre()));
				});
			});

			describe('quand les informations ne sont pas encore mis en cache', () => {
				it('fait l‘appel à l‘api et set les informations dans le cache', async () => {
					vi.spyOn(cacheService, 'get').mockResolvedValue(null);
					vi
						.spyOn(httpClientServiceWithAuthentification, 'get')
						.mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploiApiResponse()));
					vi
						.spyOn(franceTravailParametreBuilderService, 'buildCommonParamètresRecherche')
						.mockResolvedValue('range=0-14');
					vi.spyOn(cacheService, 'set');

					const offreSansFiltre = anOffreÉchantillonFiltre({ page: 1 });

					const resultat = await apiFranceTravailJobEteRepository.search(offreSansFiltre);

					expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('/search?'));
					expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('range=0-14'));
					expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('typeContrat=SAI'));
					expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('dureeContratMax=2'));

					expect(resultat).toEqual(createSuccess(aRésultatsRechercheOffre()));

					const dureeValiditeCacheEnHeure = 24;
					expect(cacheService.set).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETE_KEY', aRésultatsRechercheOffreEmploiApiResponse(), dureeValiditeCacheEnHeure);
				});

				it('lorsque l‘api renvoie une erreur, log les informations de l’erreur et retourne une erreur métier associée', async () => {
					vi.spyOn(cacheService, 'get').mockResolvedValue(null);
					const httpError = anAxiosResponse(anHttpError(404));
					vi
						.spyOn(httpClientServiceWithAuthentification, 'get')
						.mockRejectedValue(httpError);
					vi.spyOn(apiFranceTravailOffreErrorManagementSearch, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));

					const rechercheSansFiltre = anOffreÉchantillonFiltre({ page: 1 });

					const result = await apiFranceTravailJobEteRepository.search(rechercheSansFiltre);

					expect(apiFranceTravailOffreErrorManagementSearch.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
						apiSource: 'API France Travail',
						contexte: 'échantillon job d‘été',
						message: 'impossible d’effectuer une recherche de job d‘été',
					}));
					expect(result).toEqual(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
				});
			});
		});

		describe('quand la recherche est lancée avec des filtres', () => {
			it('ne get pas les informations du cache et fait appel à l‘api avec les filtres', async () => {
				vi.spyOn(cacheService, 'get');
				vi
					.spyOn(franceTravailParametreBuilderService, 'buildCommonParamètresRecherche')
					.mockResolvedValue('range=0-14');
				vi
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploiApiResponse()));
				vi.spyOn(cacheService, 'set');

				const resultat = await apiFranceTravailJobEteRepository.search(aJobEteFiltre({
					grandDomaineList: [DomaineCode.A, DomaineCode.B],
					page: 1,
				}));

				expect(cacheService.get).not.toHaveBeenCalled();
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('/search?'));
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('range=0-14'));
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('typeContrat=SAI'));
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('dureeContratMax=2'));
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(expect.stringContaining('grandDomaine=A%2CB'));
				expect(resultat).toEqual(createSuccess(aRésultatsRechercheOffre()));
				expect(cacheService.set).not.toHaveBeenCalled();
			});
		});

		describe('quand l’api renvoie une 204', () => {
			it('retourne un success avec une liste vide et pas de résultat', async () => {
				vi
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse({}, 204));

				const result = await apiFranceTravailJobEteRepository.search(aJobEteFiltre({
					grandDomaineList: [DomaineCode.A, DomaineCode.B],
					page: 1,
				}));

				expect(result).toStrictEqual(createSuccess({ nombreRésultats: 0, résultats: [] }));
			});
		});

		describe('quand l‘api renvoie une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				const httpError = anAxiosResponse(anHttpError(404));
				vi
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockRejectedValue(httpError);
				vi.spyOn(apiFranceTravailOffreErrorManagementSearch, 'handleFailureError').mockReturnValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));

				const result = await apiFranceTravailJobEteRepository.search(anOffreÉchantillonAvecLocalisationEtMotCléFiltre());

				expect(apiFranceTravailOffreErrorManagementSearch.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: 'API France Travail',
					contexte: 'recherche job d‘été',
					message: 'impossible d’effectuer une recherche de job d‘été',
				}));
				expect(result).toStrictEqual(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
			});
		});
	});
});
