import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffStage3emeMetierService } from '~/client/services/metiers/bff.stage3eme.metier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme.fixture';

describe('BffStage3emeMetierService', () => {
	describe('rechercherMetier', () => {
		it('appelle le bon endpoint avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const metierService = new BffStage3emeMetierService(httpClientService);
			const metierQuery = 'boulang';
			
			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierStage3eme()));
			const result = await metierService.rechercherMetier(metierQuery);
			
			expect(result).toEqual({ instance: 'success', result: aListeDeMetierStage3eme() });
			expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme/metiers?motCle=boulang');
		});
	});	
});
