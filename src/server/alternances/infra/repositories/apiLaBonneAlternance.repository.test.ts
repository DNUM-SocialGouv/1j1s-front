import { Alternance } from '~/server/alternances/domain/alternance';
import {
	aMatchaResponse,
	anAlternanceFiltre,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiLaBonneAlternanceRepository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService());

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
		});
		it('fait l’appel avec les bons paramètres', () => {
			const httpClientService = aPublicHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService());

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution-test/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=D1406,D1407/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*insee=13180/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*longitude=29.10/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*latitude=48.2/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*radius=30/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*sources=matcha/));
		});
		it('retourne une erreur quand il y a une erreur', async () => {
			const httpError = anHttpError(500);
			const httpClientService = aPublicHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const caller = '1jeune1solution-test';
			const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, errorManagementService);
			const expectedFailure = ErreurMétier.CONTENU_INDISPONIBLE;

			// When
			const result = await repository.search(anAlternanceFiltre());
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'search la bonne alternance recherche alternance',
				message: 'impossible d’effectuer une recherche d’alternance',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});

	describe('get', () => {
		it('retourne l’alternance renvoyée par l’API', async () => {
			// Given
			const caller = '1jeune1solution-test';
			const httpClientService = aPublicHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({
				matchas: [
					aMatchaResponse({
						job: {
							contractType: 'Apprentissage, CDD',
							id: 'abc',
							romeDetails: {
								competencesDeBase: [],
								definition: 'Super alternance dans une boucherie',
							},
						},
					}),
				],
			}));
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService());

			// When
			const result = await repository.get('abc') as Success<Alternance>;
			// Then
			expect(result.result.id).toEqual('abc');
		});
		it('retourne une erreur quand il y a une erreur', async () => {
			// Given
			const httpError = anHttpError(500);
			const httpClientService = aPublicHttpClientService({
				get: jest.fn(async () => {
					throw httpError;
				}),
			});
			const expectedFailure = ErreurMétier.DEMANDE_INCORRECTE;
			const errorManagementService = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, '1jeune1solution-test', errorManagementService);
			(httpClientService.get as jest.Mock).mockRejectedValue(anHttpError(500));

			// When
			const result = await repository.get('abc');

			// Then
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get détail annonce alternance',
				message: 'impossible de récuperer le détail d‘une offre d‘alternance',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});

		describe('lorsque l’id fournit correspond à une offre Pole Emploi', () => {
			it('appelle l’api laBonneAlternance avec l’endpoint /jobs/job', async () => {
				// Given
				const caller = '1jeune1solution-test';
				const httpClientService = aPublicHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService());

				// When
				await repository.get('1234567');

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs/job/1234567'));
			});
			describe('lorsque l’api LaBonneAlternance renvoie une donnée différente de l’attendu', () => {
				it('log un warn dans sentry et continue l’execution', async () => {
					// Given
					const caller = '1jeune1solution-test';
					const httpClientService = aPublicHttpClientService();
					(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ peJobs: [{
						company: undefined,
						contact: undefined,
						job: {
							contractDescription: undefined,
							contractType: undefined,
							description: undefined,
							duration: undefined,
							id: undefined,
						},
						place: undefined,
						title: undefined,
						url: undefined,
					}] }));
					const logger = aLoggerService();
					const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, logger);

					// When
					const result = await repository.get('1234567');

					// Then
					expect(logger.warnWithExtra).toHaveBeenCalledTimes(1);
					expect(logger.warnWithExtra).toHaveBeenCalledWith(
						new SentryException('[API LaBonneAlternance] Erreur de validation de la réponse de l’API',
							expect.anything(),
							expect.anything(),
						),
					);
					expect(result.instance).toEqual('success');
				});
			});
		});
		describe('lorsque l’id fournit ne correspond pas à une offre PEJob', () => {
			it('appelle l’api laBonneAlternance avec l’endpoint /jobs/matcha', async () => {
				// Given
				const caller = '1jeune1solution-test';
				const httpClientService = aPublicHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService());

				// When
				await repository.get('abc');

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs/matcha/abc'));
			});
		});
	});
});
