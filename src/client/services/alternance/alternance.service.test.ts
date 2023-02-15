import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import {
	aListeDeMetierLaBonneAlternance,
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

describe('AlternanceService', () => {
	describe('rechercherAlternance', () => {
		it('appelle alternance avec la query', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery = 'codeRomes=D123,D122';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aRésultatRechercherMultipleAlternance()));
			const result = await alternanceService.rechercherAlternance(alternanceQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatRechercherMultipleAlternance() });
			expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeRomes=D123,D122');
		});
	});

	describe('rechercherMétier', () => {
		it('appelle la bonne alternance avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const métierQuery = 'boulang';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierLaBonneAlternance()));
			const result = await alternanceService.rechercherMétier(métierQuery);

			expect(result).toEqual({ instance: 'success', result: aListeDeMetierLaBonneAlternance() });
			expect(httpClientService.get).toHaveBeenCalledWith('alternances/metiers?motCle=boulang');
		});
	});
});
