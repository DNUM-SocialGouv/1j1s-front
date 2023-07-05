import { FormationInitialeService } from '~/client/services/formationInitiale/formationInitiale.service';
import { aResultatListFormationInitiale } from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { createSuccess } from '~/server/errors/either';

describe('rechercher une formation initiale', () => {
	it('lorsqu‘il y a un filtre, doit appeler la bonne url', async () => {
		// GIVEN
		const httpClient = anHttpClientService();
		const formationInitialeService = new FormationInitialeService(httpClient);
		const formationsInitialesSuccessResponse = createSuccess([aResultatListFormationInitiale()]);
		jest.spyOn(httpClient, 'get').mockResolvedValueOnce(formationsInitialesSuccessResponse);

		// WHEN
		const resultatFormationInitiale = await formationInitialeService.rechercherFormationInitiale({ motCle: 'informatique' });

		// THEN
		expect(httpClient.get).toHaveBeenCalledWith('formations-initiales?motCle=informatique');
		expect(resultatFormationInitiale).toStrictEqual(formationsInitialesSuccessResponse);
	});
	it('lorsqu‘il n‘y a pas de filtre, doit appeler la bonne url', async () => {
		// GIVEN
		const httpClient = anHttpClientService();
		const formationInitialeService = new FormationInitialeService(httpClient);
		const formationsInitialesSuccessResponse = createSuccess([aResultatListFormationInitiale()]);
		jest.spyOn(httpClient, 'get').mockResolvedValueOnce(formationsInitialesSuccessResponse);

		// WHEN
		const resultatFormationInitiale = await formationInitialeService.rechercherFormationInitiale({ motCle: undefined });

		// THEN
		expect(httpClient.get).toHaveBeenCalledWith('formations-initiales?');
		expect(resultatFormationInitiale).toStrictEqual(formationsInitialesSuccessResponse);
	});
});
