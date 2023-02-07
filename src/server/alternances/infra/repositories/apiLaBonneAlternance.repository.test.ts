import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { anAlternanceFiltre } from '~/server/offres/domain/offre.fixture';
import {
	anAxiosResponse,
	anHttpClientService
} from '~/server/services/http/httpClientService.fixture';
import {
	aListeDeMetierLaBonneAlternance,
	aMetierLaBonneAlternanceApiResponse
} from '~/server/alternances/infra/repositories/laBonneAlternance.fixture'

describe('ApiLaBonneAlternanceRepository', () => {
	describe('getMetier', () => {
		describe('Quand l‘api renvoit un résultat', () => {
			it("retourne un tableau de métier", async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aMetierLaBonneAlternanceApiResponse()))
				const expected = aListeDeMetierLaBonneAlternance()
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				const response = await repository.getMetier('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('success');
				if (response.instance !== 'failure') {
					expect(response.result!).toEqual(expected);
				}

			})
		});

		describe('Quand l‘api renvoit une erreur', () => {

		});
	});
	describe('search', () => {
		describe('quand on appelle l’api LaBonneAlternance', () => {
			it('appelle l’api LaBonneAlternance', () => {
				// Given
				const httpClientService = anHttpClientService();
				const repository = new ApiLaBonneAlternanceRepository(httpClientService);

				// When
				repository.search(anAlternanceFiltre());

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
			});
		});
		it('fait l’appelle avec le caller 1J1S', () => {
			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution/));
		});
		it('fait l’appelle avec la query obligatoire romes', () => {

			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=D1406,D1407/));
		});

		it('fait l’appelle avec la query sources à matcha', () => {

			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*sources=matcha/));
		});

	});
});
