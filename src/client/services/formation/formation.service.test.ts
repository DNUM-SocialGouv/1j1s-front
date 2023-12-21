import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { FormationQueryParams } from '~/client/hooks/useFormationQuery';
import { FormationService } from '~/client/services/formation/formation.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';

describe('FormationService', () => {
	it('appelle le endpoint avec la query', async () => {
		const httpClientService = anHttpClientService();
		const formationService = new FormationService(httpClientService);
		const formationQuery = {
			codeRomes: ['D123', 'D122'],
			distanceCommune: '30',
			...aCommuneQuery({
				codeCommune: '13180',
				latitudeCommune: '2.37',
				longitudeCommune: '15.845',
			}),
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
						codeRomes: ['D123', 'D122'],
						distanceCommune: '30',
						niveauEtudes: '6',
						...aCommuneQuery({
							codeCommune: '13180',
							latitudeCommune: '2.37',
							longitudeCommune: '15.845',
						}),
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
						codeRomes: ['D123', 'D122'],
						distanceCommune: '30',
						niveauEtudes: 'indifférent',
						...aCommuneQuery({
							codeCommune: '13180',
							latitudeCommune: '2.37',
							longitudeCommune: '15.845',
						}),
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
					codeRomes: ['D123', 'D122'],
					distanceCommune: '30',
					niveauEtudes: undefined,
					...aCommuneQuery({
						codeCommune: '13180',
						latitudeCommune: '2.37',
						longitudeCommune: '15.845',
					}),
				};

				await formationService.rechercherFormation(formationQuery);

				expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('niveauEtudes'));
			});
		});
	});

	it("filtre les query params d'affichage", async () => {
		const httpClientService = anHttpClientService();
		const formationService = new FormationService(httpClientService);
		const formationQuery: FormationQueryParams = {
			...aCommuneQuery(),
		};

		await formationService.rechercherFormation(formationQuery);

		expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringContaining('libelleCommune'));
	});
});
