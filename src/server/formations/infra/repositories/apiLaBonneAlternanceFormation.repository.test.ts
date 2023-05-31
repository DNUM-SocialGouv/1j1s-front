import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aFormation } from '~/server/formations/domain/formation.fixture';
import {
	aFormationQuery,
	aFormationQueryWithNiveauEtudes,
	aLaBonneAlternanceApiFormationResponse,
	aLaBonneAlternanceApiRésultatRechercheFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';
import {
	ApiLaBonneAlternanceFormationRepository,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.repository';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

describe('apiLaBonneAlternanceFormation.repository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, aLoggerService(), anErrorManagementService());

			// When
			repository.search(aFormationQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/formations'));
		});

		describe('quand le paramètre de niveau d’étude est présent dans les filtres', () => {
			it('fait l’appel avec les paramètres obligatoires et celui du niveau d’études', () => {
				const httpClientService = aPublicHttpClientService();
				const caller = '1jeune1solution-test';
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, aLoggerService(), anErrorManagementService());

				repository.search(aFormationQueryWithNiveauEtudes());

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution-test/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=F1603,I1308/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*insee=13180/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*longitude=29.10/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*latitude=48.2/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*radius=30/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*diploma=6/));
			});
		});

		describe('quand le paramètre de niveau d’étude n’est pas présent dans les filtres', () => {
			it('fait l’appel avec les paramètres obligatoires', () => {
				const httpClientService = aPublicHttpClientService();
				const caller = '1jeune1solution-test';
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, aLoggerService(), anErrorManagementService());

				repository.search(aFormationQuery());

				// Then
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution-test/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=F1603,I1308/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*insee=13180/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*longitude=29.10/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*latitude=48.2/));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*radius=30/));
				expect(httpClientService.get).not.toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*diploma=6/));
			});
		});

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async() => {
				// GIVEN
				const caller = '1jeune1solution-test';
				const httpError = anHttpError(500);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, aLoggerService(), errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMétier.SERVICE_INDISPONIBLE;
				jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const { errorType } = await repository.search(aFormationQuery()) as Failure;

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
					apiSource: 'API LaBonneAlternance',
					contexte: 'search formation la bonne alternance',
					message: '[API LaBonneAlternance] impossible d’effectuer une recherche de formation',
				});
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
			});
		});
	});

	describe('get', () => {
		it('appelle l’api LaBonneAlternance avec les bons paramètres', () => {
			// Given
			const id = 'formationId__';
			const httpClientService = aPublicHttpClientService();
			const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());
			(httpClientService.get as jest.Mock).mockRejectedValueOnce(anHttpError(500, 'internal_error'));

			// When
			repository.get(id);

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith('/v1/formations/formationDescription/formationId');
		});

		describe('quand la formation n’existe pas', () => {
			describe('si les filtres sont absents', () => {
				it('retourne une erreur', async () => {
					// Given
					const httpClientService = aPublicHttpClientService();
					(httpClientService.get as jest.Mock).mockRejectedValueOnce(anHttpError(500, 'internal_error'));
					const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());

					// When
					const result = await repository.get('formationId__');

					// Then
					expect(httpClientService.get).toHaveBeenCalledTimes(1);
					expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				});
			});
			describe('si les filtres sont présents', () => {
				describe('si la formation n’est pas trouvée', () => {
					it('retourne une erreur', async () => {
						// Given
						const httpClientService = aPublicHttpClientService();
						(httpClientService.get as jest.Mock).mockRejectedValueOnce(anHttpError(500, 'internal_error'));
						(httpClientService.get as jest.Mock).mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));

						const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());

						// When
						const result = await repository.get('id pas dans la recherche__', aFormationQuery());

						// Then
						expect(httpClientService.get).toHaveBeenCalledTimes(2);
						expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
					});
				});
				describe('si la formation est trouvée', () => {
					describe('si la cleMinistereEducatif n’est pas trouvée', () => {
						it('retourne la formation trouvée sans lien de demande de rendez vous', async () => {
							// Given
							const httpClientService = aPublicHttpClientService();
							(httpClientService.get as jest.Mock).mockRejectedValueOnce(anHttpError(500, 'internal_error'));
							(httpClientService.get as jest.Mock).mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));

							const id = '456__';

							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());

							// When
							const result = await repository.get(id, aFormationQuery());

							// Then
							expect(httpClientService.get).toHaveBeenCalledTimes(2);
							expect(httpClientService.post).toHaveBeenCalledTimes(0);
							expect(result).toEqual(createSuccess({
								adresse: {
									adresseComplète: undefined,
									codePostal: undefined,
								},
								contact: {},
								nomEntreprise: 'La Bonne Alternance',
								tags: [ 'Paris' ],
								titre: 'Développeur web',
							}));
						});
					});
					describe('si la cleMinistereEducatif est trouvée', () => {
						it('appelle l’api LaBonneAlternance avec les bons paramètres', async () => {
							// Given
							const httpClientService = aPublicHttpClientService();
							(httpClientService.get as jest.Mock).mockRejectedValueOnce(anHttpError(500, 'internal_error'));
							(httpClientService.get as jest.Mock).mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));

							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());
							const id = '123__cleMinistereEducatif-123456';

							// When
							await repository.get(id, aFormationQuery());

							// Then
							expect(httpClientService.get).toHaveBeenCalledTimes(2);
							// expect(httpClientService.post).toHaveBeenCalledTimes(1);
							expect(httpClientService.post).toHaveBeenCalledWith('/appointment-request/context/create', {
								idCleMinistereEducatif: aLaBonneAlternanceApiRésultatRechercheFormationResponse().results[0].cleMinistereEducatif,
								referrer: 'jeune_1_solution',
							});
						});
						it('retourne la formation trouvée avec le lien de demande de rendez vous', async () => {
							// Given
							const httpClientService = aPublicHttpClientService();
							(httpClientService.get as jest.Mock).mockRejectedValueOnce(anHttpError(500, 'internal_error'));
							(httpClientService.get as jest.Mock).mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));
							(httpClientService.post as jest.Mock).mockResolvedValueOnce(anAxiosResponse({ form_url: 'url Demande de Rendez vous' }));

							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());
							const id = '123__cleMinistereEducatif-123456';

							// When
							const result = await repository.get(id, aFormationQuery());

							// Then
							// expect(httpClientService.get).toHaveBeenCalledTimes(2);
							// expect(httpClientService.post).toHaveBeenCalledTimes(1);
							expect(result).toEqual(createSuccess({
								adresse: {
									adresseComplète: '1 rue de la République',
									codePostal: '75001',
								},
								contact: {},
								lienDemandeRendezVous: 'url Demande de Rendez vous',
								nomEntreprise: 'La Bonne Alternance',
								tags: [ 'Paris' ],
								titre: 'Développeur web',
							}));
						});
					});
				});
			});
		});

		describe('quand la formation existe', () => {
			describe('si les filtres sont absents', () => {
				it('retourne la formation renvoyée par l’API sans lien de demande de rendez vous', async () => {
					// Given
					const httpClientService = aPublicHttpClientService();
					(httpClientService.get as jest.Mock).mockResolvedValue({
						data: aLaBonneAlternanceApiFormationResponse(),
					});
					const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());

					// When
					const result = await repository.get('formationId');

					// Then
					expect(httpClientService.get).toHaveBeenCalledTimes(1);
					expect(result).toEqual(createSuccess(aFormation()));
				});
			});
			describe('si les filtres sont présents', () => {
				describe('si la cleMinistereEducatif n’est pas trouvée', () => {
					it('retourne la formation renvoyée par l’API sans lien de demande de rendez vous', async () => {
						// Given
						const httpClientService = aPublicHttpClientService();
						(httpClientService.get as jest.Mock).mockResolvedValueOnce({
							data: aLaBonneAlternanceApiFormationResponse(),
						});
						const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());

						// When
						const result = await repository.get('formationId__', aFormationQuery());

						// Then
						expect(httpClientService.get).toHaveBeenCalledTimes(1);
						expect(result).toEqual(createSuccess(aFormation()));
					});
				});
				describe('si la cleMinistereEducatif est trouvée', () => {
					it('retourne la formation renvoyée par l’API avec le lien de demande de rendez vous', async () => {
						// Given
						const httpClientService = aPublicHttpClientService();
						(httpClientService.get as jest.Mock).mockResolvedValueOnce({
							data: aLaBonneAlternanceApiFormationResponse(),
						});
						(httpClientService.post as jest.Mock).mockResolvedValueOnce(anAxiosResponse({ form_url: 'url Demande de Rendez vous' }));
						const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', aLoggerService(), anErrorManagementService());

						// When
						const result = await repository.get('123__cleMinistereEducatif-123456', aFormationQuery());

						// Then
						expect(httpClientService.get).toHaveBeenCalledTimes(1);
						expect(httpClientService.post).toHaveBeenCalledTimes(1);
						expect(result).toEqual(createSuccess({
							...aFormation(),
							lienDemandeRendezVous: 'url Demande de Rendez vous',
						}));
					});
				});
			});
		});
	});
});
