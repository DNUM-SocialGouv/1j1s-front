import { FormationService } from '~/client/services/formation/formation.service';
import { aRésultatFormation } from '~/client/services/formation/formation.service.fixture';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { createSuccess } from '~/server/errors/either';

describe('FormationService', () => {
	describe('rechercherFormation', () => {
		it('appelle formation avec la query', async () => {
			const httpClientService = anHttpClientService();
			const formationService = new FormationService(httpClientService);
			const formationQuery = 'codeRomes=D123,D122';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aRésultatFormation()));
			const result = await formationService.rechercherFormation(formationQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatFormation() });
			expect(httpClientService.get).toHaveBeenCalledWith('formations?codeRomes=D123,D122');
		});
	});
});
