import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { aRésultatRechercheAlternance } from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

describe('AlternanceService', () => {
	describe('rechercherAlternance', () => {
		it('appelle alternance avec la query', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery = 'codeRomes=D123,D122';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aRésultatRechercheAlternance()));
			const result = await alternanceService.rechercherAlternance(alternanceQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatRechercheAlternance() });
			expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeRomes=D123,D122');
		});
	});
});
