import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	aRésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import {
	ApiEtablissementPublicRepository,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublic.repository';
import { ApiValidationError } from '~/server/services/error/apiValidationError';
import {
	aLogInformation,
	anErrorManagementService,
} from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API Établissement Public',
	contexte: 'search établissement public',
	message: 'impossible d‘effectuer une recherche d‘établissement public',
});
describe('ApiÉtablissementPublicRepository', () => {
	describe('search', () => {

		describe('lorsque la recherche retourne une 200', () => {
			it('retourne la liste des établissements d‘accompagnement', async () => {
				// given
				const httpClient = aPublicHttpClientService();
				jest
					.spyOn(httpClient, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatRechercheÉtablissementPublicResponse()));
				const repository = new ApiEtablissementPublicRepository(httpClient, anErrorManagementService());
				const expected = createSuccess(anÉtablissementAccompagnementList());
				const commune = '46100';
				const typeAccompagnement = 'cij';

				// when
				const result = await repository.search({ codePostal: commune, typeAccompagnement });

				// then
				expect(httpClient.get).toHaveBeenCalledWith('communes/46100/cij');
				expect(result).toEqual(expected);
			});
		});
		describe('lorsqu‘il y a une erreur lors de la recherche des établissements public', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
				// given
				const httpError = anHttpError(404, '', anAxiosResponse({}, 404));
				const httpClient = aPublicHttpClientService();
				jest.spyOn(httpClient, 'get').mockRejectedValue(httpError);
				const expectedError = ErreurMetier.DEMANDE_INCORRECTE;
				const errorManagementService = anErrorManagementService({
					handleFailureError: jest.fn(() => createFailure(expectedError)),
				});
				const commune = '46100';
				const typeAccompagnement = 'cij';
				const repository = new ApiEtablissementPublicRepository(httpClient, errorManagementService);

				// when
				const result = await repository.search({ codePostal: commune, typeAccompagnement });

				// then
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, logInformation);
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});

		it('appelle le management d’erreur de validation du schéma de l’api quand il y a une erreur de validation et continue l’execution', async () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const searchResponse = aRésultatRechercheÉtablissementPublicResponse();
			const errorManagementServiceSearch = anErrorManagementService();
			const idWithInvalidFormat = 0 as unknown as string;
			searchResponse.features[0].properties.id = idWithInvalidFormat;
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(searchResponse));
			const repository = new ApiEtablissementPublicRepository(httpClientService, errorManagementServiceSearch);

			// When
			const result = await repository.search({ codePostal: '46100', typeAccompagnement: 'cij' });

			// Then
			expect(result.instance).toEqual('success');
			expect(errorManagementServiceSearch.logValidationError).toHaveBeenCalledWith(
				new ApiValidationError(
					[
						{
							context: {
								key: 'id',
								label: '[0].properties.id',
								value: 0,
							},
							message: '"[0].properties.id" must be a string',
							path: [
								0,
								'properties',
								'id',
							],
							type: 'string.base',
						},
					],
					searchResponse.features,
				),
				aLogInformation({
					apiSource: 'API Établissement Public',
					contexte: 'search établissement public',
					message: 'erreur de validation du schéma de l‘api',
				}),
			);
		});

		it('n’appelle pas le management d’erreur de validation du schéma de l’api quand il n’y a pas d’erreur de validation et continue l’execution', async () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const searchResponse = aRésultatRechercheÉtablissementPublicResponse();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(searchResponse));
			const errorManagementServiceSearch = anErrorManagementService();
			const repository = new ApiEtablissementPublicRepository(httpClientService, errorManagementServiceSearch);

			// When
			const result = await repository.search({ codePostal: '46100', typeAccompagnement: 'cij' });

			// Then
			expect(errorManagementServiceSearch.logValidationError).not.toHaveBeenCalled();
			expect(result.instance).toEqual('success');
		});
	});
});
