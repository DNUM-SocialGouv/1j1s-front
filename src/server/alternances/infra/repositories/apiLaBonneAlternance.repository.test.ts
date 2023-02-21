import { aListeDeMetierLaBonneAlternance } from '~/server/alternances/domain/alternance.fixture';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { anAlternanceQuery } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';
import { Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

describe('ApiLaBonneAlternanceRepository', () => {
	describe('getMetierList', () => {
		describe('Quand l‘api renvoit un résultat', () => {
			it('retourne un tableau de métier', async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aMetierLaBonneAlternanceApiResponse()));
				const expected = aListeDeMetierLaBonneAlternance();
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				const response = await repository.getMetierList('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('success');
				expect((response as Success<Array<MetierAlternance>>).result).toEqual(expected);
			});
		});

		describe('Quand l‘api renvoie une erreur', () => {
			it("retourne une instance d'erreur", async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockRejectedValue(anAxiosError({ status: 429 }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				const response = await repository.getMetierList('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('failure');
				expect((response as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
	});

	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
		});
		it('fait l’appel avec les bons paramètres', () => {
			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=D1406,D1407/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*sources=matcha/));
		});
	});
});
