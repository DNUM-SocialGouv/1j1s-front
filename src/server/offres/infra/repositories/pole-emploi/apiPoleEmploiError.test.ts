import { Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	errorFromApiPoleEmploi,
	handleSearchFailureError,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiError';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

describe('handleSearchFailureError', () => {
	errorFromApiPoleEmploi.forEach((messageErrorFromApiPoleEmploi) => {
		describe(`quand l’api renvoie une erreur 400 et le message d’erreur ${messageErrorFromApiPoleEmploi}`, () => {
			it('retourne une failure demande incorrecte sans logger', async () => {
				const error = anHttpError(400, messageErrorFromApiPoleEmploi, anAxiosResponse(
					{
						message: messageErrorFromApiPoleEmploi,
					},
					400,
				));

				const result = await handleSearchFailureError(error, 'context') as Failure;

				expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
		it('retourne une failure demande incorrecte en loggant', async () => {
			const error = anHttpError(400, 'message inconnu', anAxiosResponse(
				{
					message: 'message inconnu',
				},
				400,
			));

			const result = await handleSearchFailureError(error, 'context') as Failure;

			expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
		});
	});
});


