import { FormationInitialeService } from '~/client/services/formationInitiale/formationInitiale.service';
import { aResultatListFormationInitiale } from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { createSuccess } from '~/server/errors/either';

describe('rechercher une formation initiale', () => {
	it('doit appeler la bonne url', async () => {
		// GIVEN
		const httpClient = anHttpClientService();
		const formationInitialeService = new FormationInitialeService(httpClient);
		const formationsInitialesSuccessResponse = createSuccess([aResultatListFormationInitiale()]);
		jest.spyOn(httpClient, 'get').mockResolvedValueOnce(formationsInitialesSuccessResponse);

		// WHEN
		const resultatFormationInitiale = await formationInitialeService.rechercherFormationInitiale({ motCle: 'informatique' });

		// THEN
		expect(httpClient.get).toHaveBeenCalledWith('formations-initiales?domaine=informatique');
		expect(resultatFormationInitiale).toStrictEqual(formationsInitialesSuccessResponse);
	});
});
