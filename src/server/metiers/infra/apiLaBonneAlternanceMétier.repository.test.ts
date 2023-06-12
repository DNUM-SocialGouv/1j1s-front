import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Métier } from '~/server/metiers/domain/métier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';
import { aMetierLaBonneAlternanceApiResponse } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.fixture';
import { ApiLaBonneAlternanceMétierRepository } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.repository';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiLaBonneAlternanceMétierRepository', () => {
	describe('getMetierList', () => {
		describe('Quand l‘api renvoie un résultat', () => {
			it('retourne un tableau de métier', async () => {
				const httpClientService = aPublicHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aMetierLaBonneAlternanceApiResponse()));
				const expected = aListeDeMetierLaBonneAlternance();

				const repository = new ApiLaBonneAlternanceMétierRepository(httpClientService, anErrorManagementService());

				const response = await repository.getMetierList('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('success');
				expect((response as Success<Array<Métier>>).result).toEqual(expected);
			});
		});

		describe('Quand l‘api renvoie une erreur', () => {
			it("retourne une instance d'erreur", async () => {
				const httpError = anHttpError(429);
				const httpClientService = aPublicHttpClientService({
					get: jest.fn(async () => {
						throw httpError;
					}),
				});
				const expectedFailure = ErreurMétier.DEMANDE_INCORRECTE;
				const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
				const repository = new ApiLaBonneAlternanceMétierRepository(httpClientService, errorManagementService);

				const response = await repository.getMetierList('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API LaBonneAlternance',
					contexte: 'get metier la bonne alternance',
					message: 'impossible de récuperer les métiers',
				});
				expect(response.instance).toEqual('failure');
				expect((response as Failure).errorType).toEqual(expectedFailure);
			});
		});
	});
});
