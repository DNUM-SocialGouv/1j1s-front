import {
	OnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';
import { anAuthenticatedHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('onisep formation initiales repository', () => {
	describe('search', () => {
		it('doit appeler l’api onisep avec les bons paramètres', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient);

			// WHEN
			await formationInitialeRepository.search();

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith('/dataset/5fa591127f501/search');
		});

		it.todo('doit retourner les formations initales');

		describe('en cas d’erreur', () => {
			it.todo('doit logguer les informations de l’erreur');
			it.todo('doit retourner une erreur métier correspondant');
		});
	});
});
