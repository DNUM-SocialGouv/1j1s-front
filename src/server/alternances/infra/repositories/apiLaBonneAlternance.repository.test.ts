import { Alternance } from '~/server/alternances/domain/alternance';
import {
	aMatchaResponse,
	anAlternanceFiltre,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
	Failure,
	Success,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	anAxiosError,
	anAxiosResponse,
	anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

describe('ApiLaBonneAlternanceRepository', () => {
	describe('search', () => {
		it('appelle l’api LaBonneAlternance', () => {
			// Given
			const httpClientService = anHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller);

			// When
			repository.search(anAlternanceFiltre());

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
		});
		it('fait l’appel avec les bons paramètres', () => {
			const httpClientService = anHttpClientService();
			const caller = '1jeune1solution-test';
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, caller);

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
	});

	describe('get', () => {
		it('retourne l’alternance renvoyée par l’API', async () => {
			// Given
			const httpClientService = anHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({
				matchas: [
					aMatchaResponse({ job: {
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
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, '1jeune1solution-test');

			// When
			const result = await repository.get('abc') as Success<Alternance>;
			// Then
			expect(result.result.id).toEqual('abc');
		});
		it('crée une erreur quand l’API renvoie une erreur', async () => {
			// Given
			const httpClientService = anHttpClientService();
			(httpClientService.get as jest.Mock).mockRejectedValue(anAxiosError({ status: 500 }));
			const repository = new ApiLaBonneAlternanceRepository(httpClientService, '1jeune1solution-test');

			// When
			const result = await repository.get('abc') as Failure;

			// Then
			expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
		});
		describe('lorsque l’id fournit correspond à une offre Pole Emploi', () => {
			it('appelle l’api laBonneAlternance avec l’endpoint /jobs/job', async () => {
				// Given
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService, '1jeune1solution-test');

				// When
				await repository.get('1234567');

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs/job/1234567'));
			});
		});
		describe('lorsque l’id fournit ne correspond pas à une offre matcha', () => {
			it('appelle l’api laBonneAlternance avec l’endpoint /jobs/matcha', async () => {
				// Given
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse({ matchas: [aMatchaResponse()] }));
				const repository = new ApiLaBonneAlternanceRepository(httpClientService, '1jeune1solution-test');

				// When
				await repository.get('abc');

				// Then
				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs/matcha/abc'));
			});
		});
	});
});
