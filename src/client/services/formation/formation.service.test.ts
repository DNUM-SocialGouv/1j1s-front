import { FormationService } from '~/client/services/formation/formation.service';
import { aRésultatFormation } from '~/client/services/formation/formation.service.fixture';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { createSuccess } from '~/server/errors/either';

describe('FormationService', () => {
	describe('rechercherFormation', () => {
		it('filtre les queries pour ne garder que celles attendues', async () => {
			const httpClientService = anHttpClientService();
			const formationService = new FormationService(httpClientService);
			const formationQuery = 'codeCommune=13180&codeRomes=D123,D122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845&unwantedQuery=query-en-trop';

			await formationService.rechercherFormation(formationQuery);

			expect(httpClientService.get).toHaveBeenCalledWith('formations?codeCommune=13180&codeRomes=D123%2CD122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845');

		});

		describe('quand le paramètre optionnel niveauEtude est présent', () => {
			it('appelle formation avec la query avec le paramètre niveauEtude', async () => {
				const httpClientService = anHttpClientService();
				const formationService = new FormationService(httpClientService);
				const formationQuery = 'codeCommune=13180&codeRomes=D123,D122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845&niveauEtudes=6';

				(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aRésultatFormation()));
				const result = await formationService.rechercherFormation(formationQuery);

				expect(result).toEqual({ instance: 'success', result: aRésultatFormation() });
				expect(httpClientService.get).toHaveBeenCalledWith('formations?codeCommune=13180&codeRomes=D123%2CD122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845&niveauEtudes=6');
			});
		});

		describe('quand le paramètre optionnel niveauEtude n’est pas présent', () => {
			it('appelle formation avec la query sans le paramètre niveauEtude', async () => {
				const httpClientService = anHttpClientService();
				const formationService = new FormationService(httpClientService);
				const formationQuery = 'codeCommune=13180&codeRomes=D123,D122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845';

				(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aRésultatFormation()));
				const result = await formationService.rechercherFormation(formationQuery);

				expect(result).toEqual({ instance: 'success', result: aRésultatFormation() });
				expect(httpClientService.get).toHaveBeenCalledWith('formations?codeCommune=13180&codeRomes=D123%2CD122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845');
			});
		});

	});

});
