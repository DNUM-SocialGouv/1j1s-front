import { anApiEuresRechercheBody } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';
import { ApiEuresEmploiEuropeRepository } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.repository';
import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiEuresEmploiEuropeRepository', () => {
	describe('search', () => {
		describe('quand un motCle est fourni', () => {
			it('appelle l’api Eures avec le motCle', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService());
				const body = anApiEuresRechercheBody();

				// When
				repository.search({ motCle: 'boulanger' });

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand aucun motCle n’est fourni', () => {
			it('appelle l’api Eures sans motCle', () => {
				// Given
				const httpClientService = aPublicHttpClientService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, anErrorManagementService());
				const body = {
					dataSetRequest: {
						excludedDataSources :  [ { dataSourceId : 29 }, { dataSourceId : 81 }, { dataSourceId : 781 } ],
						pageNumber: '1',
						resultsPerPage: '40',
						sortBy: 'BEST_MATCH',
					},
					searchCriteria: {
						facetCriteria: [
							{ facetName: 'LOCATION', facetValues: ['NL'] },
							{ facetName: 'EXPERIENCE', facetValues: ['A', 'B'] },
							{ facetName: 'POSITION_OFFERING', facetValues: ['apprenticeship','contracttohire','directhire','seasonal','selfemployed','temporary'] },
						],
					},
				};

				// When
				repository.search({});

				// Then
				expect(httpClientService.post).toHaveBeenCalledWith('/search', body);
			});
		});

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// GIVEN
				const httpError = anHttpError(500);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				const repository = new ApiEuresEmploiEuropeRepository(httpClientService, errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMetier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'post').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const { errorType } = await repository.search({ motCle: 'boulanger' }) as Failure;

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
});
