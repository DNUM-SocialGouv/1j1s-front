import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { MétierService } from '~/client/services/métiers/métier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

describe('MétierService', () => {
	describe('rechercherMétier', () => {
		it('appelle la bonne alternance avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const métierService = new MétierService(httpClientService);
			const métierQuery = 'boulang';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierLaBonneAlternance()));
			const result = await métierService.rechercherMétier(métierQuery);

			expect(result).toEqual({ instance: 'success', result: aListeDeMetierLaBonneAlternance() });
			expect(httpClientService.get).toHaveBeenCalledWith('metiers?motCle=boulang');
		});
	});
});
