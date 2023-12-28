import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffAlternanceMetierService } from '~/client/services/metiers/bff.alternance.metier.service';
import { aMetiersList } from '~/client/services/metiers/metier.fixture';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

describe('BffLbaMetierService', () => {
	describe('rechercherMetier', () => {
		it('appelle le bon endpoint avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const metierService = new BffAlternanceMetierService(httpClientService);
			const metierQuery = 'boulang';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierLaBonneAlternance()));
			const result = await metierService.rechercherMetier(metierQuery);

			expect(result).toEqual({ instance: 'success', result: aMetiersList() });
			expect(httpClientService.get).toHaveBeenCalledWith('metiers?motCle=boulang');
		});
	});
});
