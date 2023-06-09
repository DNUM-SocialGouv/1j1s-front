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
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('apiLaBonneAlternanceFormation.repository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, anErrorManagementService());

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
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, anErrorManagementService());

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
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, anErrorManagementService());

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
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, errorManagementService);
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
			const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', anErrorManagementService());
			jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(anHttpError(500, 'internal_error'));

			// When
			repository.get(id);

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith('/v1/formations/formationDescription/formationId');
		});

		describe('quand l‘appel à l’api est en erreur car LaBonneAlternance n’a pas réussi à récupérer le détail d’une formation de leur côté', () => {
			describe('si les filtres sont absents', () => {
				it('log les informations de l’erreur et retourne une erreur métier associée', async () => {
					// Given
					const httpClientService = aPublicHttpClientService();
					const errorManagementService = anErrorManagementService();
					const errorReturnedByErrorManagementService = ErreurMétier.DEMANDE_INCORRECTE;
					const httpError = anHttpError(500, 'internal_error');
					jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(httpError);
					jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

					const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', errorManagementService);


					// When
					const result = await repository.get('formationId__');

					// Then
					expect(httpClientService.get).toHaveBeenCalledTimes(1);
					expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
						apiSource: 'API LaBonneAlternance',
						contexte: 'get formation la bonne alternance',
						message: '[API LaBonneAlternance] impossible de récupérer le détail d’une formation',
					}));
					expect(result.instance).toBe('failure');
					expect((result as Failure).errorType).toEqual(errorReturnedByErrorManagementService);
				});
			});
			describe('si les filtres sont présents', () => {
				describe('utilise les filtres pour faire une recherche', () => {
					describe('si la formation est trouvée dans le résultat de recherche', () => {
						describe('si la cleMinistereEducatif n’est pas trouvée', () => {
							it('retourne la formation trouvée sans lien de demande de rendez vous', async () => {
								// Given
								const httpClientService = aPublicHttpClientService();
								jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(anHttpError(500, 'internal_error'));
								jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));

								const id = '456__';

								const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', anErrorManagementService());

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
							describe('appelle l’api LaBonneAlternance pour créer un lien de demande de rendez-vous', () => {
								it('retourne la formation trouvée avec le lien de demande de rendez vous', async () => {
									// Given
									const httpClientService = aPublicHttpClientService();
									jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(anHttpError(500, 'internal_error'));
									jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));
									jest.spyOn(httpClientService, 'post').mockResolvedValueOnce(anAxiosResponse({ form_url: 'url Demande de Rendez vous' }));

									const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', anErrorManagementService());
									const id = '123__cleMinistereEducatif-123456';

									// When
									const result = await repository.get(id, aFormationQuery());

									// Then
									expect(httpClientService.get).toHaveBeenCalledTimes(2);
									expect(httpClientService.post).toHaveBeenCalledTimes(1);
									expect(httpClientService.post).toHaveBeenCalledWith('/appointment-request/context/create', {
										idCleMinistereEducatif: aLaBonneAlternanceApiRésultatRechercheFormationResponse().results[0].cleMinistereEducatif,
										referrer: 'jeune_1_solution',
									});
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
								it('quand l’appel est en erreur, log l’erreur et retourne la formation trouvée sans lien de demande de rendez vous', async() => {
									// Given
									const httpClientService = aPublicHttpClientService();
									const errorManagementService = anErrorManagementService();
									jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(anHttpError(500, 'internal_error'));
									jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));
									const errorCreationRdv = anHttpError(500);
									jest.spyOn(httpClientService, 'post').mockRejectedValueOnce(errorCreationRdv);

									const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', errorManagementService);
									const id = '123__cleMinistereEducatif-123456';

									// When
									const result = await repository.get(id, aFormationQuery());

									// Then
									expect(httpClientService.get).toHaveBeenCalledTimes(2);
									expect(httpClientService.post).toHaveBeenCalledTimes(1);
									expect(httpClientService.post).toHaveBeenCalledWith('/appointment-request/context/create', {
										idCleMinistereEducatif: aLaBonneAlternanceApiRésultatRechercheFormationResponse().results[0].cleMinistereEducatif,
										referrer: 'jeune_1_solution',
									});
									expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorCreationRdv, aLogInformation({
										apiSource: 'API LaBonneAlternance',
										contexte: 'get formation la bonne alternance',
										message: '[API LaBonneAlternance] impossible de créer le lien de demande de rdv pour une formation',
									}));
									expect(result).toEqual(createSuccess({
										adresse: {
											adresseComplète: '1 rue de la République',
											codePostal: '75001',
										},
										contact: {},
										nomEntreprise: 'La Bonne Alternance',
										tags: [ 'Paris' ],
										titre: 'Développeur web',
									}));
								});
							});
						});
					});

					describe('si la formation n’est pas trouvée dans le résultat de recherche', () => {
						it('log les informations spécifiques de l’erreur et retourne une erreur demande incorrecte', async () => {
							// Given
							const httpClientService = aPublicHttpClientService();
							const errorManagementService = anErrorManagementService();
							jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(anHttpError(500, 'internal_error'));
							jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));
							const demandeIncorrecte = ErreurMétier.DEMANDE_INCORRECTE;
							jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(createFailure(demandeIncorrecte));

							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', errorManagementService);

							// When
							const result = await repository.get('id pas dans la recherche__', aFormationQuery());

							// Then
							expect(httpClientService.get).toHaveBeenCalledTimes(2);
							expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(demandeIncorrecte, aLogInformation({
								apiSource: 'API LaBonneAlternance',
								contexte: 'get formation la bonne alternance',
								message: '[API LaBonneAlternance] impossible de récupérer le détail d’une formation en effectuant de nouveau la recherche',
							}));
							expect(result).toEqual(createFailure(demandeIncorrecte));
						});
					});

					describe('si la recherche est en erreur', () => {
						it('retourne l’erreur retournée par la recherche', async() => {
							// Given
							const httpClientService = aPublicHttpClientService();
							const errorManagementService = anErrorManagementService();
							const httpError = anHttpError(500);
							const errorReturnedByErrorManagementServiceForSearch = ErreurMétier.SERVICE_INDISPONIBLE;

							jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(anHttpError(500, 'internal_error'));
							jest.spyOn(httpClientService, 'get').mockRejectedValueOnce(httpError);
							jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(createFailure(errorReturnedByErrorManagementServiceForSearch));

							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', errorManagementService);

							// When
							const { errorType } = await repository.get('id formation__', aFormationQuery()) as Failure;

							// Then
							expect(httpClientService.get).toHaveBeenCalledTimes(2);
							expect(errorType).toEqual(errorReturnedByErrorManagementServiceForSearch);
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
					jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aLaBonneAlternanceApiFormationResponse()));
					const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', anErrorManagementService());

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
						jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiFormationResponse()));
						const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', anErrorManagementService());

						// When
						const result = await repository.get('formationId__', aFormationQuery());

						// Then
						expect(httpClientService.get).toHaveBeenCalledTimes(1);
						expect(result).toEqual(createSuccess(aFormation()));
					});
				});
				describe('si la cleMinistereEducatif est trouvée', () => {
					describe('appelle l’api LaBonneAlternance pour créer un lien de demande de rendez-vous', () => {
						it('retourne la formation renvoyée par l’API avec le lien de demande de rendez vous', async () => {
							// Given
							const httpClientService = aPublicHttpClientService();
							jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiFormationResponse()));
							jest.spyOn(httpClientService, 'post').mockResolvedValueOnce(anAxiosResponse({ form_url: 'url Demande de Rendez vous' }));
							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', anErrorManagementService());

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
						it('si l’api est erreur, log l’erreur et retourne la formation trouvée sans le lien de demande de rendez vous', async () => {
							// Given
							const httpClientService = aPublicHttpClientService();
							const errorManagementService = anErrorManagementService();
							jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(
								aLaBonneAlternanceApiFormationResponse(),
							));
							const errorCreationRdv = anHttpError(500);
							jest.spyOn(httpClientService, 'post').mockRejectedValueOnce(errorCreationRdv);
							const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test', errorManagementService);

							// When
							const result = await repository.get('123__cleMinistereEducatif-123456', aFormationQuery());

							// Then
							expect(httpClientService.get).toHaveBeenCalledTimes(1);
							expect(httpClientService.post).toHaveBeenCalledTimes(1);
							expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorCreationRdv, aLogInformation({
								apiSource: 'API LaBonneAlternance',
								contexte: 'get formation la bonne alternance',
								message: '[API LaBonneAlternance] impossible de créer le lien de demande de rdv pour une formation',
							}));
							expect(result).toEqual(createSuccess({
								...aFormation(),
							}));
						});
					});
				});
			});
		});

		describe('quand l’api répond avec une erreur', () => {
			it('log les informations de l’erreur et retourne une erreur métier associée', async() => {
				// GIVEN
				const id = 'formationId__';
				const caller = '1jeune1solution-test';
				const httpError = anHttpError(400);
				const httpClientService = aPublicHttpClientService();
				const errorManagementService = anErrorManagementService();
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller, errorManagementService);
				const errorReturnedByErrorManagementService = ErreurMétier.DEMANDE_INCORRECTE;
				jest.spyOn(httpClientService, 'get').mockRejectedValue(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(errorReturnedByErrorManagementService));

				// WHEN
				const { errorType } = await repository.get(id) as Failure;

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: 'API LaBonneAlternance',
					contexte: 'get formation la bonne alternance',
					message: '[API LaBonneAlternance] impossible de récupérer le détail d’une formation',
				}));
				expect(errorType).toEqual(errorReturnedByErrorManagementService);
			});
		});
	});
});
