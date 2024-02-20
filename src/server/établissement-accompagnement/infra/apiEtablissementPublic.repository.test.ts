import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	aResultatRechercheEtablissementPublicListResponse,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublic.fixture';
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
	apiSource: 'API administration et sevice public',
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
					.mockResolvedValue(anAxiosResponse(aResultatRechercheEtablissementPublicListResponse()));
				const repository = new ApiEtablissementPublicRepository(httpClient, anErrorManagementService());
				const expected = createSuccess(anÉtablissementAccompagnementList());
				const codePostal = '46100';
				const typeAccompagnement =  TypeÉtablissement.INFO_JEUNE;

				// when
				const result = await repository.search({ codePostal, typeAccompagnement });

				// then
				expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('catalog/datasets/api-lannuaire-administration/records?'));
				expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('where=suggest(adresse,%22code_postal%2046100%22)and%20pivot%20LIKE%20%22cij%22'));
				expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('&limit=100&select=adresse,telephone,adresse_courriel,nom,id,pivot,plage_ouverture'));
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
				const codePostal = '46100';
				const typeAccompagnement = 'cij';
				const repository = new ApiEtablissementPublicRepository(httpClient, errorManagementService);

				// when
				const result = await repository.search({ codePostal, typeAccompagnement });

				// then
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, logInformation);
				expect(result.instance).toEqual('failure');
				expect((result as Failure).errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
		});

		it('appelle le management d’erreur de validation du schéma de l’api quand il y a une erreur de validation et continue l’execution', async () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const searchResponse = aResultatRechercheEtablissementPublicListResponse({
				// @ts-expect-error
				id: 0,
			});
			const errorManagementServiceSearch = anErrorManagementService();
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
								label: '[0].id',
								value: 0,
							},
							message: '"[0].id" must be a string',
							path: [
								0,
								'id',
							],
							type: 'string.base',
						},
					],
					searchResponse.results,
				),
				aLogInformation({
					apiSource: 'API administration et sevice public',
					contexte: 'search établissement public',
					message: 'erreur de validation du schéma de l‘api',
				}),
			);
		});

		it('n’appelle pas le management d’erreur de validation du schéma de l’api quand il n’y a pas d’erreur de validation et continue l’execution', async () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const searchResponse = aResultatRechercheEtablissementPublicListResponse();
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
