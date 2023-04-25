import { Success } from '~/server/errors/either';
import {
	ApiPoleEmploiJobÉtudiantRepository,
} from '~/server/jobs-étudiants/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { Offre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import {
	aBarmanOffre,
	anOffreÉchantillonAvecLocalisationEtMotCléFiltre,
	anOffreÉchantillonFiltre,
	anOffreEmploiFiltre,
	aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
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
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { LoggerService } from '~/server/services/logger.service';

describe('ApiPoleEmploiJobÉtudiantRepository', () => {
	let httpClientServiceWithAuthentification: AuthenticatedHttpClientService;
	let apiPoleEmploiJobÉtudiantRepository: ApiPoleEmploiJobÉtudiantRepository;
	let poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService;
	let cacheService: CacheService;
	let loggerService: LoggerService;

	beforeEach(() => {
		cacheService = new MockedCacheService();
		httpClientServiceWithAuthentification = anAuthenticatedHttpClientService();
		poleEmploiParamètreBuilderService = aPoleEmploiParamètreBuilderService();
		apiPoleEmploiJobÉtudiantRepository = new ApiPoleEmploiJobÉtudiantRepository(httpClientServiceWithAuthentification, poleEmploiParamètreBuilderService, cacheService, loggerService);
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
	});

	describe('search', () => {
		describe('quand la recherche est lancée automatiquement pour les job étudiants', () => {
			describe('quand les informations ne sont pas encore mis en cache', () => {
				it('fait s‘appel à s‘api et set les informations dans le cache', async () => {
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
				it('ne fait pas s‘appel à s‘api et get les informations du cache', async () => {
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

		describe('quand la recherche est lancée par s‘utilisateur', () => {
			it('ne get pas les informations du cache et fait appel à s‘api avec les filtres', async () => {
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
	});
});
