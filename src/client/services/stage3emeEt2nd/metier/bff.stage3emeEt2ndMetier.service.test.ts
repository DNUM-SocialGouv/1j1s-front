import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import {
	BffStage3emeEt2ndMetierService,
} from '~/client/services/stage3emeEt2nd/metier/bff.stage3emeEt2ndMetier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierStage3eme } from '~/server/stage-3eme-et-2nd/domain/metierStage3emeEt2nd.fixture';

describe('BffStage3emeMetierService', () => {
	describe('rechercherMetier', () => {
		it('appelle le bon endpoint avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const metierService = new BffStage3emeEt2ndMetierService(httpClientService);
			const metierQuery = 'boulang';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierStage3eme()));
			const result = await metierService.rechercherMetier(metierQuery);

			expect(result).toEqual({ instance: 'success', result: aListeDeMetierStage3eme() });
			expect(httpClientService.get).toHaveBeenCalledWith('stages-3eme-et-2nd/metiers?motCle=boulang');
		});
	});
});
