import { createFailure, createSuccess } from '~/server/errors/either';
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
import { anAxiosError, anAxiosResponse, anHttpClientService } from '~/server/services/http/httpClientService.fixture';

describe('apiLaBonneAlternanceFormation.repository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = anHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller);

			// When
			repository.search(aFormationQuery());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/formations'));
		});


		describe('quand le paramètre de niveau d’étude est présent dans les filtres', () => {
			it('fait l’appel avec les paramètres obligatoires et celui du niveau d’études', () => {
				const httpClientService = anHttpClientService();
				const caller = '1jeune1solution-test';
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller);

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

		describe('quand le paramètre de niveau d’étude n’est  pas présent dans les filtres', () => {
			it('fait l’appel avec les paramètres obligatoires', () => {
				const httpClientService = anHttpClientService();
				const caller = '1jeune1solution-test';
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller);

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
	});

	describe('get', () => {
		it('appelle l’api LaBonneAlternance avec les bons paramètres', () => {
			// Given
			const id = 'formationId';
			const httpClientService = anHttpClientService();
			const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test');

			// When
			repository.get(id);

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(`/formations/formationDescription/${id}`);
		});

		describe('quand la formation existe', () => {
			it('retourne la formation renvoyée par l’API', async () => {
				// Given
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue({
					data: aLaBonneAlternanceApiFormationResponse(),
				});
				const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test');

				// When
				const result = await repository.get('formationId');

				// Then
				expect(result).toEqual(createSuccess(aFormation()));
			});
		});

		describe('quand la formation n’existe pas', () => {
			describe('si les filtres sont présents', () => {
				describe('si la formation est trouvée', () => {
					it('retourne la formation trouvée', async () => {
						// Given
						const httpClientService = anHttpClientService();
						(httpClientService.get as jest.Mock).mockRejectedValueOnce(anAxiosError({
							response: anAxiosResponse({
								error: 'internal_error',
							}, 500),
							status: 500,
						}));
						(httpClientService.get as jest.Mock).mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));

						const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test');

						// When
						const result = await repository.get('123', aFormationQuery());

						// Then
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
				describe('si la formation n’est pas trouvée', () => {
					it('retourne une erreur', async () => {
						// Given
						const httpClientService = anHttpClientService();
						(httpClientService.get as jest.Mock).mockRejectedValueOnce(anAxiosError({
							response: anAxiosResponse({
								error: 'internal_error',
							}, 500),
							status: 500,
						}));
						(httpClientService.get as jest.Mock).mockResolvedValueOnce(anAxiosResponse(aLaBonneAlternanceApiRésultatRechercheFormationResponse()));

						const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test');

						// When
						const result = await repository.get('id pas dans la recherche', aFormationQuery());

						// Then
						expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
					});
				});
			});
			describe('si les filtres sont absents', () => {
				it('retourne une erreur', async () => {
					// Given
					const httpClientService = anHttpClientService();
					(httpClientService.get as jest.Mock).mockRejectedValue(new Error('error'));
					const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, '1jeune1solution-test');

					// When
					const result = await repository.get('formationId');

					// Then
					expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				});
			});
		});
	});
});
