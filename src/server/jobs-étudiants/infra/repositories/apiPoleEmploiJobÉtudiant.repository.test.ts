import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	ApiPoleEmploiJobÉtudiantRepository,
} from '~/server/jobs-étudiants/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { Offre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import {
	aBarmanOffre,
	anOffreÉchantillonAvecLocalisationEtMotCléFiltre,
	anOffreÉchantillonFiltre,
	anOffreEmploiFiltre,
	aRésultatsRechercheOffre,
} from '~/server/offres/domain/offre.fixture';
import {
	anApiPoleEmploiErrorManagementGet,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiErrorManagement.fixture';
import {
	PoleEmploiOffreErrorManagementServiceGet,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiErrorManagement.service';
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
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiPoleEmploiJobÉtudiantRepository', () => {
	let httpClientServiceWithAuthentification: AuthenticatedHttpClientService;
	let apiPoleEmploiJobÉtudiantRepository: ApiPoleEmploiJobÉtudiantRepository;
	let poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService;
	let cacheService: CacheService;
	let apiPoleEmploiErrorManagementSearch: ErrorManagementService;
	let apiPoleEmploiErrorManagementGet: PoleEmploiOffreErrorManagementServiceGet;

	beforeEach(() => {
		cacheService = new MockedCacheService();
		httpClientServiceWithAuthentification = anAuthenticatedHttpClientService();
		poleEmploiParamètreBuilderService = aPoleEmploiParamètreBuilderService();
		apiPoleEmploiErrorManagementSearch = anErrorManagementService();
		apiPoleEmploiErrorManagementGet = anApiPoleEmploiErrorManagementGet();
		apiPoleEmploiJobÉtudiantRepository = new ApiPoleEmploiJobÉtudiantRepository(httpClientServiceWithAuthentification, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiErrorManagementSearch, apiPoleEmploiErrorManagementGet);
	});

	describe('getOffreJobÉtudiant', () => {
		describe('quand l’offre de job étudiant est trouvé', () => {
			it('récupère l’offre de job étudiant selon l’id', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aBarmanOffreEmploiApiResponse()));
				const expected = aBarmanOffre();
				const offreEmploiId = expected.id;

				const { result } = await apiPoleEmploiJobÉtudiantRepository.get(offreEmploiId) as Success<Offre>;

				expect(result).toEqual(expected);
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith('/132LKFB');
			});
		});
		describe('lorsqu‘il y a une erreur lors de la récupération de l‘offre', () => {
			it('retourne une erreur', async () => {
				const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;
				const httpError = anAxiosResponse(anHttpError(404));
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockRejectedValue(httpError);
				jest.spyOn(apiPoleEmploiErrorManagementGet, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));

				const result = await apiPoleEmploiJobÉtudiantRepository.get(aBarmanOffre().id);

				expect(apiPoleEmploiErrorManagementGet.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Pole Emploi',
					contexte: 'détail job étudiant', message: '[API Pole Emploi] impossible de récupérer un job étudiant',
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

				const result = await apiPoleEmploiJobÉtudiantRepository.get(aBarmanOffre().id);

				expect(apiPoleEmploiErrorManagementGet.handleFailureError).toHaveBeenCalledWith(apiResponse, {
					apiSource: 'API Pole Emploi',
					contexte: 'détail job étudiant', message: '[API Pole Emploi] impossible de récupérer un job étudiant',
				});
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});

	});

	describe('search', () => {
		describe('quand la recherche est lancée automatiquement pour les job étudiants', () => {
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

					const { result } = await apiPoleEmploiJobÉtudiantRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

					expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY');

					expect(result).toEqual(aRésultatsRechercheOffre());
					expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith('/search?range=0-14&dureeHebdoMax=1600&tempsPlein=false&typeContrat=CDD,MIS,SAI');

					expect(cacheService.set).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY', aRésultatsRechercheOffreEmploiApiResponse(), 24);
				});
			});

			describe('quand les informations sont déjà en cache', () => {
				it('ne fait pas l‘appel à l‘api et get les informations du cache', async () => {
					jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiApiResponse());
					jest.spyOn(cacheService, 'set');

					const offreFiltre = anOffreÉchantillonFiltre();

					const { result } = await apiPoleEmploiJobÉtudiantRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

					expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_JOB_ETUDIANT_KEY');

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

				const { result } = await apiPoleEmploiJobÉtudiantRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

				expect(cacheService.get).not.toHaveBeenCalled();

				expect(result).toEqual(aRésultatsRechercheOffre());
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalled();

				expect(cacheService.set).not.toHaveBeenCalled();
			});
		});

		describe('quand nombre de résultat est présent dans la réponse', () => {
			it('recherche les jobs étudiants de pole emploi', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploiApiResponse()));
				jest
					.spyOn(poleEmploiParamètreBuilderService, 'buildCommonParamètresRecherche')
					.mockResolvedValue('region=34&motsCles=boulanger&range=0-14');
				const offreEmploiFiltre = anOffreEmploiFiltre();

				const { result } = await apiPoleEmploiJobÉtudiantRepository.search(offreEmploiFiltre) as Success<RésultatsRechercheOffre>;

				expect(result).toEqual(aRésultatsRechercheOffre());
				expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
					'/search?region=34&motsCles=boulanger&range=0-14&&dureeHebdoMax=1600&tempsPlein=false&typeContrat=CDD,MIS,SAI',
				);
			});
		});

		describe('quand l’api renvoie une 204', () => {
			it('retourne un success avec une liste vide', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse({}, 204));

				const { result } = await apiPoleEmploiJobÉtudiantRepository.search(anOffreÉchantillonAvecLocalisationEtMotCléFiltre()) as Success<RésultatsRechercheOffre>;

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

				const result = await apiPoleEmploiJobÉtudiantRepository.search(anOffreÉchantillonAvecLocalisationEtMotCléFiltre());

				expect(apiPoleEmploiErrorManagementSearch.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Pole Emploi',
					contexte: 'recherche job étudiant',
					message: '[API Pole Emploi] impossible d’effectuer une recherche de job étudiant',
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

				const result = await apiPoleEmploiJobÉtudiantRepository.search(offreFiltre);

				expect(apiPoleEmploiErrorManagementSearch.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Pole Emploi',
					contexte: 'échantillon job étudiant',
					message: '[API Pole Emploi] impossible d’effectuer une recherche de job étudiant',
				});
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(expectedFailure);
			});
		});
	});
});
