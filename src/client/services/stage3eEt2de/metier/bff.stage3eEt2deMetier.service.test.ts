import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import {
	BffStage3eEt2deMetierService,
} from '~/client/services/stage3eEt2de/metier/bff.stage3eEt2deMetier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de.fixture';

describe('BffStage3eEt2deMetierService', () => {
	describe('rechercherMetier', () => {
		it('appelle le bon endpoint avec le métier recherché', async () => {
			const httpClientService = anHttpClientService();
			const metierService = new BffStage3eEt2deMetierService(httpClientService);
			const metierQuery = 'boulang';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aListeDeMetierStage3eEt2de()));
			const result = await metierService.rechercherMetier(metierQuery);

			expect(result).toEqual({ instance: 'success', result: aListeDeMetierStage3eEt2de() });
			expect(httpClientService.get).toHaveBeenCalledWith('stages-3e-et-2de/metiers?motCle=boulang');
		});
	});
});
