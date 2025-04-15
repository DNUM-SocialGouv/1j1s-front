import { anAlternanceFiltre } from '~/server/alternances/domain/alternance.fixture';
import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ApiValidationError } from '~/server/services/error/apiValidationError';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

import {
	aJobResponse,
	anAlternanceApiRechercheResponse,
} from './apiAlternance.fixture';
import {
	ApiAlternanceRepository,
} from './apiAlternance.repository';

describe('apiAlternanceRepository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
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
});
