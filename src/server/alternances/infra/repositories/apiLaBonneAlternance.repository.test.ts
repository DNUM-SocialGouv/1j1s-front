import { MetierAlternance } from '~/server/alternances/domain/métier';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
	aListeDeMetierLaBonneAlternance,
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';
import { Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';
import { anAlternanceFQuery } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture'

describe('ApiLaBonneAlternanceRepository', () => {
	describe('getMetier', () => {
		describe('Quand l‘api renvoit un résultat', () => {
			it('retourne un tableau de métier', async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aMetierLaBonneAlternanceApiResponse()));
				const expected = aListeDeMetierLaBonneAlternance();
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				const response = await repository.getMetier('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('success');
				expect((response as Success<Array<MetierAlternance>>).result).toEqual(expected);
			});
		});

		describe('Quand l‘api renvoie une erreur', () => {
			it("retourne une instance d'erreur", async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockRejectedValue(anAxiosError({ status: '429' }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				const response = await repository.getMetier('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('failure');
				expect((response as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
	});
	describe('search', () => {
		describe('quand on appelle l’api LaBonneAlternance', () => {
			it('appelle l’api LaBonneAlternance', () => {
				// Given
				const httpClientService = anHttpClientService();
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				// When
				repository.search(anAlternanceFQuery());

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
			});
		});
		it('fait l’appelle avec le caller 1J1S', () => {
			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceFQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution/));
		});
		it('fait l’appelle avec la query obligatoire romes', () => {

			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceFQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=D1406,D1407/));
		});

		it('fait l’appelle avec la query sources à matcha', () => {

			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceFQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*sources=matcha/));
		});

	});
});
