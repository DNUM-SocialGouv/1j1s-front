import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceApiJobsResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	aLaBonneAlternanceApiJobsResponse,
	aMatchaResponse,
	anAlternanceFiltre,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ApiValidationError } from '~/server/services/error/apiValidationError';
import {
	aLogInformation,
	anErrorManagementService,
} from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

describe('ApiLaBonneAlternanceRepository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = aPublicHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService(), anErrorManagementService());

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
		});
		it('fait l’appel avec les bons paramètres', () => {
			const httpClientService = aPublicHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService(), anErrorManagementService());

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
			const errorManagementServiceSearch = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
			const errorManagementServiceGet = anErrorManagementService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, errorManagementServiceSearch, errorManagementServiceGet);
			const expectedFailure = ErreurMetier.CONTENU_INDISPONIBLE;

			// When
			const result = await repository.search(anAlternanceFiltre());
			expect(errorManagementServiceSearch.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'search la bonne alternance recherche alternance',
				message: 'impossible d’effectuer une recherche d’alternance',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
		it('appelle le management d’erreur de validation du schéma de l’api quand il y a une erreur de validation et continue l’execution', async () => {
			const httpClientService = aPublicHttpClientService();
			const searchResponse = {
				...aLaBonneAlternanceApiJobsResponse(),
				matchas: {
					results: [
						aMatchaResponse(
							{
								job: {
									id: 1,
								},
							} as unknown as Partial<AlternanceApiJobsResponse.Matcha>,
							// NOTE (DORO 2023-08-29) : utilisation du as unknown as Partial<AlternanceApiJobsResponse.Matcha> pour forcer un type incorrect
						),
					],
				},
			};
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(searchResponse));
			const caller = '1jeune1solution-test';
			const errorManagementServiceSearch = anErrorManagementService();
			const errorManagementServiceGet = anErrorManagementService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, errorManagementServiceSearch, errorManagementServiceGet);

			const expectedApiValidationError = new ApiValidationError(
				[
					{
						context: {
							key: 'id',
							label: 'matchas.results[0].job.id',
							value: 1,
						},
						message: '"matchas.results[0].job.id" must be a string',
						path: ['matchas', 'results', 0, 'job', 'id'],
						type: 'string.base',
					},
				],
				searchResponse,
			);

			// When
			const result = await repository.search(anAlternanceFiltre());

			// Then
			expect(errorManagementServiceSearch.logValidationError).toHaveBeenCalledWith(
				expectedApiValidationError,
				aLogInformation({
					apiSource: 'API LaBonneAlternance',
					contexte: 'search la bonne alternance recherche alternance',
					message: 'erreur de validation du schéma de l’api',
				}),
			);
			expect(result.instance).toEqual('success');
		});
		it('n’appelle pas le management d’erreur de validation du schéma de l’api quand il n’y a pas d’erreur de validation et continue l’execution', async () => {
			const httpClientService = aPublicHttpClientService();
			const searchResponse = {
				...aLaBonneAlternanceApiJobsResponse(),
				matchas: {
					results: [
						aMatchaResponse(),
					],
				},
			};
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(searchResponse));
			const caller = '1jeune1solution-test';
			const errorManagementServiceSearch = anErrorManagementService();
			const errorManagementServiceGet = anErrorManagementService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, errorManagementServiceSearch, errorManagementServiceGet);

			// When
			const result = await repository.search(anAlternanceFiltre());

			// Then
			expect(errorManagementServiceSearch.logValidationError).not.toHaveBeenCalled();
			expect(result.instance).toEqual('success');
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
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService(), anErrorManagementService());

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
			const expectedFailure = ErreurMetier.DEMANDE_INCORRECTE;
			const errorManagementServiceSearch = anErrorManagementService();
			const errorManagementServiceGet = anErrorManagementService({ handleFailureError: jest.fn(() => createFailure(expectedFailure)) });
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, '1jeune1solution-test', errorManagementServiceSearch, errorManagementServiceGet);
			(httpClientService.get as jest.Mock).mockRejectedValue(anHttpError(500));

			// When
			const result = await repository.get('abc');

			// Then
			expect(errorManagementServiceGet.handleFailureError).toHaveBeenCalledWith(httpError, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get détail annonce alternance',
				message: 'impossible de récupérer le détail d‘une offre d‘alternance',
			});
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
		it('appelle le management d’erreur de validation quand il y a une erreur de validation et continue l’execution', async () => {
			const httpClientService = aPublicHttpClientService();
			const matchaResponseWithAnAttributeWithANumberInsteadOfAString = {
				matchas: [{
					company: { name: 'une entreprise' },
					diplomaLevel: 'débutant',
					job: {
						contractType: 'Apprentissage, CDI',
						id: 'id',
						romeDetails: {
							competencesDeBase: [{ libelle: 'savoir faire' }],
							definition: 'Prépare et confectionne des produits de pâtisserie.',
						},
					},
					place: { city: 'paris' },
					title: 1,
				}],
			};
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(matchaResponseWithAnAttributeWithANumberInsteadOfAString));
			const caller = '1jeune1solution-test';
			const errorManagementServiceSearch = anErrorManagementService();
			const errorManagementServiceGet = anErrorManagementService();
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, errorManagementServiceSearch, errorManagementServiceGet);

			const expectedApiValidationError = new ApiValidationError(
				[
					{
						context: {
							key: 'title',
							label: 'matchas[0].title',
							value: 1,
						},
						message: '"matchas[0].title" must be a string',
						path: ['matchas', 0, 'title'],
						type: 'string.base',
					},
				], 
				matchaResponseWithAnAttributeWithANumberInsteadOfAString);

			// When
			const result = await repository.get('abc');

			// Then
			expect(errorManagementServiceGet.logValidationError).toHaveBeenCalledWith(
				expect.any(ApiValidationError),
				expect.anything(),
			);
			expect(errorManagementServiceGet.logValidationError).toHaveBeenCalledWith(
				expectedApiValidationError,
				{
					apiSource: 'API LaBonneAlternance',
				  contexte: 'get détail annonce alternance',
				  message: 'erreur de validation du schéma de l’api',
				},
			);
			expect(result.instance).toEqual('success');
		});

		describe('lorsque l’id fournit correspond à une offre Pole Emploi', () => {
			it('appelle l’api laBonneAlternance avec l’endpoint /jobs/job', async () => {
				// Given
				const caller = '1jeune1solution-test';
				const httpClientService = aPublicHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService(), anErrorManagementService());

				// When
				await repository.get('1234567');

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs/job/1234567'));
			});
		});
		describe('lorsque l’id fournit ne correspond pas à une offre PEJob', () => {
			it('appelle l’api laBonneAlternance avec l’endpoint /jobs/matcha', async () => {
				// Given
				const caller = '1jeune1solution-test';
				const httpClientService = aPublicHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller, anErrorManagementService(), anErrorManagementService());

				// When
				await repository.get('abc');

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs/matcha/abc'));
			});
		});
	});
});
