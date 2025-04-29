import { Alternance } from '~/server/alternances/domain/alternance';
import { anAlternanceFiltre } from '~/server/alternances/domain/alternance.fixture';
import { aMatchaResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ApiValidationError } from '~/server/services/error/apiValidationError';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

import {
	aJobIdentifierResponse,
	aJobResponse,
	anAlternanceApiRechercheResponse, anOfferResponse,
} from './apiAlternance.fixture';
import {
	ApiAlternanceRepository,
} from './apiAlternance.repository';

describe('apiAlternanceRepository', () => {
	describe('search', () => {
		it('appelle l’api Alternance', () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			const repository = new ApiAlternanceRepository(httpClientService, anErrorManagementService());

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/job/v1/search'));
		});
		it('fait l’appel avec les bons paramètres', () => {
			const httpClientService = anAuthenticatedHttpClientService();
			const repository = new ApiAlternanceRepository(httpClientService, anErrorManagementService());
			const filtre = anAlternanceFiltre({
				codeRomes: ['D1406', 'D1407'],
				distanceCommune: '30',
				latitudeCommune: '48.2',
				longitudeCommune: '29.10',
			});

			// When
			repository.search(filtre);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=D1406,D1407/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*longitude=29\.10/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*latitude=48\.2/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*radius=30/));
		});

		it('retourne une erreur quand il y a une erreur', async () => {
			const httpError = anHttpError(500);
			const httpClientService = anAuthenticatedHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
			const repository = new ApiAlternanceRepository(httpClientService, errorManagementService);
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;

			// When
			const result = await repository.search(anAlternanceFiltre());
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Alternance',
				contexte: 'search api alternance recherche alternance',
				message: 'impossible d’effectuer une recherche d’alternance',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
		it('appelle le management d’erreur de validation du schéma de l’api quand il y a une erreur de validation et continue l’execution', async () => {
			const httpClientService = anAuthenticatedHttpClientService();
			const searchResponse = anAlternanceApiRechercheResponse({
				jobs: [
					aJobResponse({
						// @ts-expect-error
						identifier: 'invalid',
					}),
				],
			});
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(searchResponse));
			const errorManagementService = anErrorManagementService();
			const repository = new ApiAlternanceRepository(httpClientService, errorManagementService);

			const expectedApiValidationError = new ApiValidationError(
				[
					{
						context: {
							key: 'identifier',
							label: 'jobs[0].identifier',
							type: 'object',
							value: 'invalid',
						},
						message: '"jobs[0].identifier" must be of type object',
						path: ['jobs', 0, 'identifier'],
						type: 'object.base',
					},
				],
				searchResponse,
			);

			// When
			const result = await repository.search(anAlternanceFiltre());

			// Then
			expect(errorManagementService.logValidationError).toHaveBeenCalledWith(
				expectedApiValidationError,
				aLogInformation({
					apiSource: 'API Alternance',
					contexte: 'search api alternance recherche alternance',
					message: 'erreur de validation du schéma de l’api',
				}),
			);
			expect(result.instance).toEqual('success');
		});
		it('n’appelle pas le management d’erreur de validation du schéma de l’api quand il n’y a pas d’erreur de validation et continue l’exécution', async () => {
			const httpClientService = anAuthenticatedHttpClientService();
			const searchResponse = anAlternanceApiRechercheResponse();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(searchResponse));
			const errorManagementService = anErrorManagementService();
			const repository = new ApiAlternanceRepository(httpClientService, errorManagementService);

			// When
			const result = await repository.search(anAlternanceFiltre());

			// Then
			expect(errorManagementService.logValidationError).not.toHaveBeenCalled();
			expect(result.instance).toEqual('success');
		});
	});

	describe('get', () => {
		it('retourne l’alternance renvoyée par l’API', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aJobResponse({
				identifier: aJobIdentifierResponse({
					id: 'abc',
				}),
			})));
			const repository = new ApiAlternanceRepository(httpClientService, anErrorManagementService());

			// When
			const result = await repository.get('abc') as Success<Alternance>;

			// Then
			expect(result.result.id).toEqual('abc');
		});
		it('retourne une erreur quand il y a une erreur', async () => {
			// Given
			const httpError = anHttpError(500);
			const httpClientService = anAuthenticatedHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const expectedFailure = ErreurMetier.DEMANDE_INCORRECTE;
			const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
			const repository = new ApiAlternanceRepository(httpClientService, errorManagementService);
			(httpClientService.get as jest.Mock).mockRejectedValue(anHttpError(500));

			// When
			const result = await repository.get('abc');

			// Then
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API Alternance',
				contexte: 'get détail annonce alternance',
				message: 'impossible de récupérer le détail d‘une offre d‘alternance',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
		it('appelle le management d’erreur de validation quand il y a une erreur de validation et continue l’execution', async () => {
			const httpClientService = anAuthenticatedHttpClientService();
			const invalidResponse = aJobResponse({
				offer: anOfferResponse({
					// @ts-expect-error
					title: 1,
				}),
			});
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(invalidResponse));
			const errorManagementService = anErrorManagementService();
			const repository = new ApiAlternanceRepository(httpClientService, errorManagementService);

			const expectedApiValidationError = new ApiValidationError(
				[
					{
						context: {
							key: 'title',
							label: 'offer.title',
							value: 1,
						},
						message: '"offer.title" must be a string',
						path: ['offer', 'title'],
						type: 'string.base',
					},
				],
				invalidResponse);

			// When
			const result = await repository.get('abc');

			// Then
			expect(errorManagementService.logValidationError).toHaveBeenCalledWith(
				expect.any(ApiValidationError),
				expect.anything(),
			);
			expect(errorManagementService.logValidationError).toHaveBeenCalledWith(
				expectedApiValidationError,
				{
					apiSource: 'API Alternance',
					contexte: 'get détail annonce alternance',
					message: 'erreur de validation du schéma de l’api',
				},
			);
			expect(result.instance).toEqual('success');
		});

		it('appelle l’api laBonneAlternance avec l’endpoint /job/v1/offer', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
			const repository = new ApiAlternanceRepository(httpClientService, anErrorManagementService());

			// When
			await repository.get('abc');

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/job/v1/offer'));
		});
	});
});
