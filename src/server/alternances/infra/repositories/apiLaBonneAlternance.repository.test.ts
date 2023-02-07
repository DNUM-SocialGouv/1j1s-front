import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { anAlternanceFiltre } from '~/server/offres/domain/offre.fixture';
import { anHttpClientService } from '~/server/services/http/httpClientService.fixture';

describe('ApiLaBonneAlternanceRepository', () => {
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

	});
});
