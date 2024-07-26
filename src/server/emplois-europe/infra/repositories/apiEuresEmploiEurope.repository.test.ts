import { anEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope.fixture';
import { NiveauDEtudeValue } from '~/server/emplois-europe/domain/niveauDEtudes';
import {
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeDetailXML,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import {
	anApiEuresEmploiEuropeDetailItem,
	anApiEuresEmploiEuropeDetailJobVacancy,
	anApiEuresEmploiEuropeDetailResponse,
	anApiEuresRechercheBody,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import {
	ApiEuresEmploiEuropeRepository,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.repository';
import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';
import { FastXmlParserService } from '~/server/services/xml/fastXmlParser.service';
import NiveauEtudeAPIEures = ApiEuresEmploiEuropeDetailXML.NiveauEtudeAPIEures;

let apiEuresEmploiEuropeMapper: ApiEuresEmploiEuropeMapper;
describe('ApiEuresEmploiEuropeRepository', () => {
	beforeEach(() => {
		apiEuresEmploiEuropeMapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());
	});
	describe('search', () => {
		describe('quand un motCle est fourni', () => {
			it('appelle l’api Eures avec le motCle', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
				const body = anApiEuresRechercheBody({ searchCriteria: {
					facetCriteria: [],
					keywordCriteria:
					{
						keywordLanguageCode: 'fr', keywords: [
							{ keywordScope: 'EVERYWHERE', keywordText: 'boulanger' },
						],
					} } });

				// When
				repository.search({
					motCle: 'boulanger',
					page: 1,
				});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand aucun motCle n’est fourni', () => {
			it('appelle l’api Eures sans motCle', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
				const body = anApiEuresRechercheBody({
					searchCriteria: {
						facetCriteria: [],
					},
				});

				// When
				repository.search({
					page: 1,
				});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand un codePays est fourni', () => {
			it('appelle l’api Eures avec le codePays', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
				const body = anApiEuresRechercheBody( {
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'LOCATION',
								facetValues: ['FR'],
							},
						],
					},
				});

				// When
				repository.search({
					codePays: 'FR',
					page: 1,
				});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand un typeContrat est fourni', () => {
			it('appelle l’api Eures avec le typeContrat', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
				const body = anApiEuresRechercheBody( {
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'POSITION_OFFERING',
								facetValues: ['CDI'],
							},
						],
					},
				});

				// When
				repository.search({
					page: 1,
					typeContrat: ['CDI'],
				});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand un tempsDeTravail est fourni', () => {
			it('appelle l’api Eures avec le tempsDeTravail', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
				const body = anApiEuresRechercheBody( {
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'POSITION_SCHEDULE',
								facetValues: ['FullTime'],
							},
						],
					},
				});

				// When
				repository.search({
					page: 1,
					tempsDeTravail: ['FullTime'],
				});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand un ou plusieurs niveaux d’études sont fournis', () => {
			it.each([
				[NiveauDEtudeValue.SANS_DIPLOME_OU_BREVET, [NiveauEtudeAPIEures.ENSEIGNEMENT_PRESCOLAIRE, NiveauEtudeAPIEures.ENSEIGNEMENT_PRIMAIRE, NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_INFERIEUR]],
				[NiveauDEtudeValue.LYCEE_FORMATION_PRO, [NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_SUPERIEUR, NiveauEtudeAPIEures.ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR]],
				[NiveauDEtudeValue.SUPERIEUR_COURT, [NiveauEtudeAPIEures.ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT]],
				[NiveauDEtudeValue.LICENCE, [NiveauEtudeAPIEures.NIVEAU_LICENCE_OU_EQUIVALENT]],
				[NiveauDEtudeValue.MASTER, [NiveauEtudeAPIEures.NIVEAU_MAITRISE_OU_EQUIVALENT]],
				[NiveauDEtudeValue.DOCTORAT, [NiveauEtudeAPIEures.NIVEAU_DOCTORAT_OU_EQUIVALENT]],
				[NiveauDEtudeValue.AUTRE, [NiveauEtudeAPIEures.AUTRE]],
			])('appelle l’api Eures avec les niveaux d’études correspondants', (filtreRecherche, expectedNiveauApiEures) => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
				
				const body = anApiEuresRechercheBody({
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'EDUCATION_LEVEL',
								facetValues: expectedNiveauApiEures,
							},
						],
					},
				});
				
				// When
				repository.search({
					niveauEtude: [filtreRecherche],
					page: 1,
				});
				
				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});

			it('concatène les niveaux d’études en cas de recherche avec plusieurs niveaux d’études', () => {
			  // Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);

				const body = anApiEuresRechercheBody({
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'EDUCATION_LEVEL',
								facetValues: [
									NiveauEtudeAPIEures.ENSEIGNEMENT_PRESCOLAIRE,
									NiveauEtudeAPIEures.ENSEIGNEMENT_PRIMAIRE,
									NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_INFERIEUR,
									NiveauEtudeAPIEures.AUTRE,
								],
							},
						],
					},
				});

			  // When
				repository.search({
					niveauEtude: [NiveauDEtudeValue.SANS_DIPLOME_OU_BREVET, NiveauDEtudeValue.AUTRE],
					page: 1,
				});

			  // Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand un secteur d‘activité est fourni', () => {
			it('appelle l’api Eures avec le secteur d‘activite', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);

				const body = anApiEuresRechercheBody( {
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'SECTOR',
								facetValues: ['A', 'B'],
							},
						],
					},
				});

				// When
				repository.search({
					page: 1,
					secteurActivite: ['A', 'B'],
				});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		it('appelle l’api Eures avec la page correspondante', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);
			const page = 22;
			const body = {
				dataSetRequest: {
					excludedDataSources: [{ dataSourceId: 29 }, { dataSourceId: 81 }, { dataSourceId: 781 }],
					pageNumber: `${page}`,
					resultsPerPage: '15',
					sortBy: 'BEST_MATCH',
				},
				searchCriteria: {
					facetCriteria: [],
				},
			};

			// When
			repository.search({
				page: page,
			});

			// Then
			expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
		});

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// GIVEN
				const httpError = anHttpError(500);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, errorManagementService, apiEuresEmploiEuropeMapper);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'post').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const { errorType } = await repository.search({
					motCle: 'boulanger',
					page: 1,
				}) as Failure;

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Eures',
					contexte: 'search emploi europe',
					message: 'impossible d’effectuer une recherche d’emploi',
				});
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
			});
		});
	});
	describe('get', () => {
		it('appelle l’api Eures avec le handle fourni', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);

			// When
			repository.get('1');

			// Then
			expect(httpClientService.post).toHaveBeenCalledWith('/get', {
				handle: ['1'],
				view: 'FULL_NO_ATTACHMENT',
			});
		});

		it('lorsqu‘aucun résultat n‘est trouvé renvoie une failure contenu indisponible', async () => {
			// Given
			const httpClientService = aPublicHttpClientService();

			const apiEuresEmploiEuropeDetailResponse: ApiEuresEmploiEuropeDetailResponse = {
				data: {
					items: [],
				},
			};

			jest.spyOn(httpClientService, 'post').mockResolvedValue(anAxiosResponse(apiEuresEmploiEuropeDetailResponse));
			const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);

			// When
			const detail = await repository.get('id');

			// Then
			expect(detail).toEqual(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
		});

		it('retourne le détail de l\'emploi en Europe demandé', async () => {
			// Given
			const httpClientService = aPublicHttpClientService();

			const handle = 'test';
			const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([
				anApiEuresEmploiEuropeDetailItem({
					jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle: handle,
						},
					}),
				})]);

			jest.spyOn(httpClientService, 'post').mockResolvedValue(anAxiosResponse(apiEuresEmploiEuropeDetailResponse));
			const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService(), apiEuresEmploiEuropeMapper);

			// When
			const detail = await repository.get(handle);

			// Then
			expect(detail).toEqual(createSuccess(anEmploiEurope({
				id: handle,
			})));
		})
		;

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// GIVEN
				const httpError = anHttpError(500);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, errorManagementService, apiEuresEmploiEuropeMapper);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'post').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const { errorType } = await repository.get('1') as Failure;

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API Eures',
					contexte: 'get emploi europe',
					message: 'impossible de récupérer le détail d\'une offre d\'emploi',
				});
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
			});
		});
	});
});
