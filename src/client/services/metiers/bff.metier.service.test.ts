import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

describe('MetierService', () => {
	describe('rechercherMetier', () => {
		it('appelle la bonne alternance avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const metierService = new MetierService(httpClientService);
			const metierQuery = 'boulang';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierLaBonneAlternance()));
			const result = await metierService.rechercherMetier(metierQuery);

			expect(result).toEqual({ instance: 'success', result: aListeDeMetierLaBonneAlternance() });
			expect(httpClientService.get).toHaveBeenCalledWith('metiers?motCle=boulang');
		});
	});
});
