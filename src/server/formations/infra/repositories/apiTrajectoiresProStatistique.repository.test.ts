import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	ApiTrajectoiresProStatistiqueResponse,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import {
	anApiTrajectoiresProStatistiqueResponse,
	aStatistiquesMappedFromApi,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.fixture';
import {
	ApiTrajectoiresProStatistiqueRepository,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.repository';
import { aLocalisationRepository } from '~/server/localisations/domain/localisation.fixture';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { Severity } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('apiTrajectoiresProCertification.repository', () => {
	let codeCertification: string;
	let longitude: number;
	let latitude: number;

	beforeEach(() => {
		codeCertification = '123';
		longitude = 2.3522;
		latitude = 48.8566;
	});

	describe('get', () => {
		it('appelle l’api geoLocalisation avec les bons paramètres', async () => {
			const httpService = anAuthenticatedHttpClientService();
			const localisationRepository = aLocalisationRepository();
			const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

			await repository.get(codeCertification, longitude, latitude);

			expect(localisationRepository.getCodeRegionByLongitudeLatitude).toHaveBeenCalledWith(longitude, latitude);

		});

		describe('lorsque l’appel à l’api geoLocalisation échoue', () => {
			it('retourne l’erreur renvoyée par l’api geoLocalisation', async () => {
				const httpService = anAuthenticatedHttpClientService();
				const localisationRepository = aLocalisationRepository();
				const failure = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
				jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValueOnce(failure);
				const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

				const returnValue = await repository.get(codeCertification, longitude, latitude);

				expect(localisationRepository.getCodeRegionByLongitudeLatitude).toHaveBeenCalledWith(longitude, latitude);
				expect(httpService.get).toHaveBeenCalledTimes(0);
				expect(returnValue).toEqual(failure);
			});
		});

		describe('lorsque l’appel à l’api geoLocalisation réussit', () => {
			it('appelle l’api trajectoiresProCertification avec les bons paramètres', async () => {
				const httpService = anAuthenticatedHttpClientService();
				const localisationRepository = aLocalisationRepository();
				const codeRegion = createSuccess('11');
				jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(codeRegion);
				const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

				await repository.get(codeCertification, longitude, latitude);

				// Then
				expect(httpService.get).toHaveBeenCalledTimes(1);
				expect(httpService.get).toHaveBeenCalledWith(`inserjeunes/regionales/${codeRegion.result}/certifications/${codeCertification}`);
			});

			describe('lorsque l’appel à l’api trajectoiresProCertification échoue', () => {
				it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
					const httpService = anAuthenticatedHttpClientService();
					const localisationRepository = aLocalisationRepository();
					const errorManagementService = anErrorManagementService();
					const httpError = anHttpError(404);
					const expectedFailureReturnedByErrorManagement = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);

					jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(createSuccess('11'));
					jest.spyOn(httpService, 'get').mockRejectedValue(httpError);
					jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(expectedFailureReturnedByErrorManagement);

					const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, errorManagementService);

					const returnValue = await repository.get(codeCertification, longitude, latitude);

					expect(returnValue).toEqual(expectedFailureReturnedByErrorManagement);
					expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
						apiSource: 'API Trajectoires Pro',
						contexte: 'get statistique de formation',
						message: 'statistique de formation non trouvée',
					});
				});
			});

			describe('lorsque l’appel à l’api trajectoiresProCertification réussit', () => {
				describe('et que la région des statistiques n’est pas retournée', () => {
					it('une erreur est logguée', async () => {
						const httpService = anAuthenticatedHttpClientService();
						const localisationRepository = aLocalisationRepository();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = anApiTrajectoiresProStatistiqueResponse({
							region: undefined,
						});
						const error = Error(JSON.stringify(aStatistiquesMappedFromApi({ region: undefined })));
						const errorManagementService = anErrorManagementService();
						jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, errorManagementService);

						await repository.get(codeCertification, longitude, latitude);

						expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(error, aLogInformation({
							apiSource: 'API Trajectoires Pro',
							contexte: 'get statistique de formation',
							message: 'statistique de formation trouvée mais incomplète',
							severity: Severity.WARNING,
						}));
					});
					it('une erreur est retournée par l‘error management service', async () => {
						const httpService = anAuthenticatedHttpClientService();
						const localisationRepository = aLocalisationRepository();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = anApiTrajectoiresProStatistiqueResponse({
							region: undefined,
						});
						const errorManagementService = anErrorManagementService();
						const failureReturnedByErrorManagement = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
						jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(failureReturnedByErrorManagement);
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, errorManagementService);

						const returnValue = await repository.get(codeCertification, longitude, latitude);

						expect(returnValue).toEqual(failureReturnedByErrorManagement);
					});
				});

				describe('et que la région est retournée mais pas les statistiques', () => {
					it('une erreur est logguée', async () => {
						const httpService = anAuthenticatedHttpClientService();
						const localisationRepository = aLocalisationRepository();
						const errorManagementService = anErrorManagementService();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = anApiTrajectoiresProStatistiqueResponse({
							region: {
								nom: 'Ile-de-France',
							},
							taux_autres_6_mois: undefined,
							taux_en_emploi_6_mois: undefined,
							taux_en_formation: undefined,
						});
						const error = Error(JSON.stringify(aStatistiquesMappedFromApi()));
						jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, errorManagementService);

						await repository.get(codeCertification, longitude, latitude);

						expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(error, aLogInformation({
							apiSource: 'API Trajectoires Pro',
							contexte: 'get statistique de formation',
							message: 'statistique de formation trouvée mais incomplète',
							severity: Severity.WARNING,
						}));
					});
					it('une erreur est retournée par la gestion d’erreur', async () => {
						const httpService = anAuthenticatedHttpClientService();
						const localisationRepository = aLocalisationRepository();
						const errorManagementService = anErrorManagementService();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = anApiTrajectoiresProStatistiqueResponse();
						const failureReturnedByErrorManagement = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
						jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(failureReturnedByErrorManagement);

						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, errorManagementService);

						const returnValue = await repository.get(codeCertification, longitude, latitude);

						expect(returnValue).toEqual(failureReturnedByErrorManagement);
					});
				});

				describe('et la réponse contient la région et au moins une statistique', () => {
					it('retourne les statistiques de la formation', async () => {
						// Given
						const httpService = anAuthenticatedHttpClientService();
						const statistiquesFormation: ApiTrajectoiresProStatistiqueResponse = anApiTrajectoiresProStatistiqueResponse({
							millesime: '2020_2021',
							region: {
								nom: 'Ile-de-France',
							},
							taux_en_emploi_6_mois: '77',
						});
						const localisationRepository = aLocalisationRepository();
						jest.spyOn(localisationRepository, 'getCodeRegionByLongitudeLatitude').mockResolvedValue(createSuccess('11'));
						jest.spyOn(httpService, 'get').mockResolvedValue(anAxiosResponse(statistiquesFormation));
						const repository = new ApiTrajectoiresProStatistiqueRepository(httpService, localisationRepository, anErrorManagementService());

						// When
						const returnValue = await repository.get(codeCertification, longitude, latitude);

						// Then
						expect(httpService.get).toHaveBeenCalledTimes(1);
						expect(returnValue).toEqual(createSuccess(aStatistiquesMappedFromApi({
							millesime: '2020-2021',
							region: 'Ile-de-France',
							tauxAutres6Mois: undefined,
							tauxEnEmploi6Mois: '77',
							tauxEnFormation: undefined,
						})));
					});
				});
			});
		});
	});
});
