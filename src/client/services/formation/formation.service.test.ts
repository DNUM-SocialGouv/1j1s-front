import { FormationService } from '~/client/services/formation/formation.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';

describe('FormationService', () => {
	it('appelle le endpoint avec la query', async () => {
		const httpClientService = anHttpClientService();
		const formationService = new FormationService(httpClientService);
		const formationQuery = {
			codeCommune: '13180',
			codeRomes: 'D123,D122',
			distanceCommune: '30',
			latitudeCommune: '2.37',
			longitudeCommune: '15.845',
		};

		await formationService.rechercherFormation(formationQuery);

		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('formations'));
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('codeCommune=13180'));
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('codeRomes=D123%2CD122'));
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('distanceCommune=30'));
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('latitudeCommune=2.37'));
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('longitudeCommune=15.845'));
	});

	describe('rechercherFormation', () => {
		describe('quand le paramètre optionnel niveauEtude est présent', () => {
			describe('et que ça valeur est renseignée', () => {
				it('appelle formation avec la query avec le paramètre niveauEtude', async () => {
					const httpClientService = anHttpClientService();
					const formationService = new FormationService(httpClientService);
					const formationQuery = {
						codeCommune: '13180',
						codeRomes: 'D123, D122',
						distanceCommune: '30',
						latitudeCommune: '2.37',
						longitudeCommune: '15.845',
						niveauEtudes: '6',
					};

					await formationService.rechercherFormation(formationQuery);

					expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('niveauEtudes=6'));
				});
			});
			describe('et que ça valeur est indifférent', () => {
				it('appelle formation avec la query sans le paramètre niveauEtude', async () => {
					const httpClientService = anHttpClientService();
					const formationService = new FormationService(httpClientService);
					const formationQuery = {
						codeCommune: '13180',
						codeRomes: 'D123, D122',
						distanceCommune: '30',
						latitudeCommune: '2.37',
						longitudeCommune: '15.845',
						niveauEtudes: 'indifférent',
					};

					await formationService.rechercherFormation(formationQuery);

					expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('niveauEtudes'));
				});
			});
		});

		describe('quand le paramètre optionnel niveauEtude n’est pas présent', () => {
			it('appelle formation avec la query sans le paramètre niveauEtude', async () => {
				const httpClientService = anHttpClientService();
				const formationService = new FormationService(httpClientService);
				const formationQuery = {
					codeCommune: '13180',
					codeRomes: 'D123, D122',
					distanceCommune: '30',
					latitudeCommune: '2.37',
					longitudeCommune: '15.845',
					niveauEtudes: undefined,
				};

				await formationService.rechercherFormation(formationQuery);

				expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('niveauEtudes'));
			});
		});
	});
});
