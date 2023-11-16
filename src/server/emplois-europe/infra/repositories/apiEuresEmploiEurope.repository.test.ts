import {
	anApiEuresEmploiEuropeDetailItem, anApiEuresEmploiEuropeDetailJobVacancy,
	anApiEuresEmploiEuropeDetailResponse,
	anApiEuresRechercheBody,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import {
	ApiEuresEmploiEuropeRepository,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.repository';
import {
	mockResultatRechercheDetailApiEuresEmploiEurope,
} from '~/server/emplois-europe/infra/repositories/mockEmploiEurope.repository';
import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';
import { FastXmlParserService } from '~/server/services/xml/fastXmlParser.service';
import { anEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope.fixture';

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
				const body = anApiEuresRechercheBody('boulanger');

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
				const body = {
					dataSetRequest: {
						excludedDataSources: [{ dataSourceId: 29 }, { dataSourceId: 81 }, { dataSourceId: 781 }],
						pageNumber: '1',
						resultsPerPage: '15',
						sortBy: 'BEST_MATCH',
					},
					searchCriteria: {
						facetCriteria: [],
					},
				};

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
				const body = {
					dataSetRequest: {
						excludedDataSources: [{ dataSourceId: 29 }, { dataSourceId: 81 }, { dataSourceId: 781 }],
						pageNumber: '1',
						resultsPerPage: '15',
						sortBy: 'BEST_MATCH',
					},
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'LOCATION',
								facetValues: ['FR'],
							},
						],
					},
				};

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
				const body = {
					dataSetRequest: {
						excludedDataSources: [{ dataSourceId: 29 }, { dataSourceId: 81 }, { dataSourceId: 781 }],
						pageNumber: '1',
						resultsPerPage: '15',
						sortBy: 'BEST_MATCH',
					},
					searchCriteria: {
						facetCriteria: [
							{
								facetName: 'POSITION_OFFERING',
								facetValues: ['CDI'],
							},
						],
					},
				};

				// When
				repository.search({
					page: 1,
					typeContrat: ['CDI'],
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
	})
	;
});
