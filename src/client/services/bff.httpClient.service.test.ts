import { BffHttpClientService } from '~/client/services/bff.httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';
import { anAxiosError, anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

function aClientLoggerService(): LoggerService {
	return { setTransactionId: vi.fn() } as unknown as LoggerService;
}

function aBffHttpClientServiceRejectingWith(status: number): BffHttpClientService {
	const bffHttpClientService = new BffHttpClientService('un-session-id', aClientLoggerService());
	const axiosError = anAxiosError({ response: anAxiosResponse({}, status) });
	vi.spyOn(bffHttpClientService.client, 'get').mockRejectedValue(axiosError);
	vi.spyOn(bffHttpClientService.client, 'post').mockRejectedValue(axiosError);
	return bffHttpClientService;
}

describe('BffHttpClientService', () => {
	describe('lorsque le bff répond une 429', () => {
		it('retourne une failure trop de requêtes sur le get', async () => {
			// GIVEN
			const bffHttpClientService = aBffHttpClientServiceRejectingWith(429);

			// WHEN
			const result = await bffHttpClientService.get('une-ressource');

			// THEN
			expect(result).toStrictEqual(createFailure(ErreurTechnique.TOO_MANY_REQUESTS));
		});

		it('retourne une failure trop de requêtes sur le post', async () => {
			// GIVEN
			const bffHttpClientService = aBffHttpClientServiceRejectingWith(429);

			// WHEN
			const result = await bffHttpClientService.post('une-ressource', { some: 'body' });

			// THEN
			expect(result).toStrictEqual(createFailure(ErreurTechnique.TOO_MANY_REQUESTS));
		});
	});

	describe('lorsque le bff répond une 503', () => {
		it('retourne une failure service indisponible', async () => {
			// GIVEN
			const bffHttpClientService = aBffHttpClientServiceRejectingWith(503);

			// WHEN
			const result = await bffHttpClientService.get('une-ressource');

			// THEN
			expect(result).toStrictEqual(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
		});
	});
});
