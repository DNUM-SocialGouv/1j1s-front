import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	ApiTrajectoiresProStatistiqueResponse,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import {
	ApiTrajectoiresProStatistiqueRepository,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.repository';
import { aLocalisationRepository } from '~/server/localisations/domain/localisation.fixture';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('apiTrajectoiresProCertification.repository', () => {
	let codeCertification: string;
	let codePostal: string;

	beforeEach(() => {
		codeCertification = '123';
		codePostal = '75000';
	});

	describe('get', () => {
		it('appelle l’api geoLocalisation avec les bons paramètres', async () => {
			const httpService = aPublicHttpClientService();
			const localisationRepository = aLocalisationRepository();
			const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

			await repository.get(codeCertification, codePostal);

			expect(localisationRepository.getCodeRegionByCodePostal).toHaveBeenCalledWith(codePostal);

		});

		describe('lorsque l’appel à l’api geoLocalisation échoue', () => {
			it('retourne une erreur SERVICE_INDISPONIBLE', async () => {
				const httpService = aPublicHttpClientService();
				const localisationRepository = aLocalisationRepository();
				jest.spyOn(localisationRepository, 'getCodeRegionByCodePostal').mockResolvedValueOnce(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

				const returnValue = await repository.get(codeCertification, codePostal);

				expect(localisationRepository.getCodeRegionByCodePostal).toHaveBeenCalledWith(codePostal);
				expect(httpService.get).toHaveBeenCalledTimes(0);
				expect(returnValue).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
			});
		});

		describe('lorsque l’appel à l’api geoLocalisation réussit', () => {
			describe('mais que le code région récupéré n’est pas défini', () => {
				it('retourne une erreur SERVICE_INDISPONIBLE', async () => {
					const httpService = aPublicHttpClientService();
					const localisationRepository = aLocalisationRepository();
					jest.spyOn(localisationRepository, 'getCodeRegionByCodePostal').mockResolvedValue(createSuccess(undefined));
					const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

					const returnValue = await repository.get(codeCertification, codePostal);

					expect(localisationRepository.getCodeRegionByCodePostal).toHaveBeenCalledWith(codePostal);
					expect(returnValue).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				});
			});

			describe('lorsque l’appel à l’api trajectoiresProCertification échoue', () => {
				it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
					const httpService = aPublicHttpClientService();
					const localisationRepository = aLocalisationRepository();
					const errorManagementService = anErrorManagementService();
					const httpError = anHttpError(404);
					const expectedFailureReturnedByErrorManagement = createFailure(ErreurMétier.CONTENU_INDISPONIBLE);

					jest.spyOn(localisationRepository, 'getCodeRegionByCodePostal').mockResolvedValue(createSuccess('11'));
					jest.spyOn(httpService, 'get').mockRejectedValue(httpError);
					jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(expectedFailureReturnedByErrorManagement);

					const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, errorManagementService);

					const returnValue = await repository.get(codeCertification, codePostal);

					expect(returnValue).toEqual(expectedFailureReturnedByErrorManagement);
					expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
						apiSource: 'API Trajectoires Pro',
						contexte: 'get statistique de formation',
						message: '[API Trajectoires Pro] statistique de formation non trouvée',
					});
				});
			});

			describe('lorsque l’appel à l’api trajectoiresProCertification réussit', () => {
				describe('et que la région des statistiques n’est pas retournée', () => {
					it('retourne une erreur CONTENU_INDISPONIBLE', async () => {
						const httpService = aPublicHttpClientService();
						const localisationRepository = aLocalisationRepository();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = {
							millesime: '2020_2021',
							region: undefined,
							taux_autres_6_mois: '23',
							taux_en_emploi_6_mois: '77',
							taux_en_formation: '0',
						};
						jest.spyOn(localisationRepository, 'getCodeRegionByCodePostal').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

						const returnValue = await repository.get(codeCertification, codePostal);

						// Then
						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));


					});
				});

				describe('et que la région est retournée mais pas les statistiques', () => {
					it('retourne une erreur CONTENU_INDISPONIBLE', async () => {
						const httpService = aPublicHttpClientService();
						const localisationRepository = aLocalisationRepository();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = {
							millesime: '2020_2021',
							region: {
								nom: 'Ile-de-France',
							},
							taux_autres_6_mois: undefined,
							taux_en_emploi_6_mois: undefined,
							taux_en_formation: undefined,
						};
						jest.spyOn(localisationRepository, 'getCodeRegionByCodePostal').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

						const returnValue = await repository.get(codeCertification, codePostal);

						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));


					});
				});

				describe('et que la region et au moins une statistique est disponible', () => {
					it('retourne les statistiques de la formation', async () => {
						// Given
						const httpService = aPublicHttpClientService();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = {
							millesime: '2020_2021',
							region: {
								nom: 'Ile-de-France',
							},
							taux_en_emploi_6_mois: '77',
						};
						const localisationRepository = aLocalisationRepository();
						jest.spyOn(localisationRepository, 'getCodeRegionByCodePostal').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

						// When
						const returnValue = await repository.get(codeCertification, codePostal);

						// Then
						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createSuccess({
							millesime: '2020-2021',
							region: 'Ile-de-France',
							tauxAutres6Mois: undefined,
							tauxEnEmploi6Mois: '77',
							tauxEnFormation: undefined,
						}));
					});
				});
			});
		});
	});
});
