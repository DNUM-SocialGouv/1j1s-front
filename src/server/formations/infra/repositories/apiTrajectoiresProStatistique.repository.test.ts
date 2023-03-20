import {
	createFailure,
	createSuccess,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ApiTrajectoiresProStatistiqueResponse } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import { ApiTrajectoiresProStatistiqueRepository } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.repository';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import {
	anAxiosError,
	anHttpClientService,
	anHttpClientServiceWithCache,
} from '~/server/services/http/httpClientService.fixture';

describe('apiTrajectoiresProCertification.repository', () => {
	describe('get', () => {
		it('appelle l’api geoLocalisation avec les bons paramètres', () => {
			// Given
			const apiGeoLocalisationHttpService = anHttpClientServiceWithCache();
			const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(apiGeoLocalisationHttpService);

			const httpService = anHttpClientService();
			const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, apiGeoLocalisationRepository);

			const codeCertification = '123';
			const codePostal = '75000';

			// When
			repository.get(codeCertification, codePostal);

			// Then
			expect(apiGeoLocalisationHttpService.get).toHaveBeenCalledWith(`communes?codePostal=${codePostal}`);
		});

		describe('lorsque l’appel à l’api geoLocalisation échoue', () => {
			it('retourne une erreur', async () => {
				// Given
				const apiGeoLocalisationHttpService = anHttpClientServiceWithCache();
				(apiGeoLocalisationHttpService.get as jest.Mock).mockRejectedValue(anAxiosError({ status: 500 }));
				const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(apiGeoLocalisationHttpService);

				const httpService = anHttpClientService();
				const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, apiGeoLocalisationRepository);

				const codeCertification = '123';
				const codePostal = '75000';

				// When
				const returnValue = await repository.get(codeCertification, codePostal);

				// Then
				expect(httpService.get).toHaveBeenCalledTimes(0);
				expect(returnValue).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
			});
		});

		describe('lorsque l’appel à l’api geoLocalisation réussit', () => {
			describe('lorsque l’appel à l’api trajectoiresProCertification échoue', () => {
				it('retourne une erreur', async () => {
					// Given
					const apiGeoLocalisationHttpService = anHttpClientServiceWithCache();
					(apiGeoLocalisationHttpService.get as jest.Mock).mockResolvedValue({ data: [{ codeRegion: '11' }] });
					const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(apiGeoLocalisationHttpService);

					const httpService = anHttpClientService();
					(httpService.get as jest.Mock).mockRejectedValue(anAxiosError({ status: 500 }));
					const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, apiGeoLocalisationRepository);

					const codeCertification = '123';
					const codePostal = '75000';

					// When
					const returnValue = await repository.get(codeCertification, codePostal);

					// Then
					expect(httpService.get).toHaveBeenCalledTimes(1);
					expect(returnValue).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
				});
			});

			describe('lorsque l’appel à l’api trajectoiresProCertification réussit', () => {
				describe('et que la région n’est pas retournée', () => {
					it('retourne une erreur', async () => {
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = {
							millesime: '2020_2021',
							region: undefined,
							taux_autres_6_mois: '23',
							taux_en_emploi_6_mois: '77',
							taux_en_formation: '0',
						};

						const apiGeoLocalisationHttpService = anHttpClientServiceWithCache();
						(apiGeoLocalisationHttpService.get as jest.Mock).mockResolvedValue({ data: [{ codeRegion: '11' }] });
						const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(apiGeoLocalisationHttpService);

						const httpService = anHttpClientService();
						(httpService.get as jest.Mock).mockResolvedValue({ data: statistiquesFormation });
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, apiGeoLocalisationRepository);

						const codeCertification = '123';
						const codePostal = '75000';

						// When
						const returnValue = await repository.get(codeCertification, codePostal);

						// Then
						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));


					});
				});

				describe('et que la région est retournée mais pas les statistiques', () => {
					it('retourne une erreur', async () => {
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = {
							millesime: '2020_2021',
							region: {
								nom: 'Ile-de-France',
							},
							taux_autres_6_mois: undefined,
							taux_en_emploi_6_mois: undefined,
							taux_en_formation: undefined,
						};

						const apiGeoLocalisationHttpService = anHttpClientServiceWithCache();
						(apiGeoLocalisationHttpService.get as jest.Mock).mockResolvedValue({ data: [{ codeRegion: '11' }] });
						const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(apiGeoLocalisationHttpService);

						const httpService = anHttpClientService();
						(httpService.get as jest.Mock).mockResolvedValue({ data: statistiquesFormation });
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, apiGeoLocalisationRepository);

						const codeCertification = '123';
						const codePostal = '75000';

						// When
						const returnValue = await repository.get(codeCertification, codePostal);

						// Then
						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));


					});
				});
				describe('et que la region et au moins une statisque est disponible', () => {
					it('retourne les statistiques de la formation', async () => {
						// Given
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = {
							millesime: '2020_2021',
							region: {
								nom: 'Ile-de-France',
							},
							taux_autres_6_mois: '23',
							taux_en_emploi_6_mois: '77',
							taux_en_formation: '0',
						};

						const apiGeoLocalisationHttpService = anHttpClientServiceWithCache();
						(apiGeoLocalisationHttpService.get as jest.Mock).mockResolvedValue({ data: [{ codeRegion: '11' }] });
						const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(apiGeoLocalisationHttpService);

						const httpService = anHttpClientService();
						(httpService.get as jest.Mock).mockResolvedValue({ data: statistiquesFormation });
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, apiGeoLocalisationRepository);

						const codeCertification = '123';
						const codePostal = '75000';

						// When
						const returnValue = await repository.get(codeCertification, codePostal);

						// Then
						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createSuccess({
							millesime: '2020-2021',
							region: 'Ile-de-France',
							tauxAutres6Mois: '23',
							tauxEnEmploi6Mois: '77',
							tauxEnFormation: '0',
						}));
					});
				});
			});
		});
	});
});
