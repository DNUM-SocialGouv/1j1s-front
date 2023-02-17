import { Alternance } from '~/server/alternances/domain/alternance';
import {
	aListeLaBonneAlternanceApiResponse,
	aMatchaResponse,
	anAlternanceFiltre,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
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
		it('renvoie la bonne alternance dans la liste renvoyée par l’api', async () => {
			// Given
			const httpClientService = anHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aListeLaBonneAlternanceApiResponse([
				aMatchaResponse({ id: 'def' }),
				aMatchaResponse({ id: 'abc' }),
			])));
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			const result = await repository.get('abc', 'I1234') as Success<Alternance>;

			// Then
			expect(result.result.id).toEqual('abc');
		});
		it('renvoie une erreur CONTENU_INDISPONIBLE quand l’offre n’existe pas', async () => {
			// Given
			const httpClientService = anHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aListeLaBonneAlternanceApiResponse([
				aMatchaResponse({ id: 'def' }),
			])));
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			const result = await repository.get('abc', 'I1234') as Failure;

			// Then
			expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
		});
		it('appelle l’api laBonneAlternance', async () => {
			// Given
			const httpClientService = anHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aListeLaBonneAlternanceApiResponse()));
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			await repository.get('abc', 'I1234');

			// Then
			expect(httpClientService.get).toHaveBeenCalledTimes(1);
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/jobs'));
		});
		it('fait l’appel avec les bons paramètres', async () => {
			const httpClientService = anHttpClientService();
			(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aListeLaBonneAlternanceApiResponse()));
			const repository = new ApiLaBonneAlternanceRepository(httpClientService);

			// When
			await repository.get('abc', 'I1234');

			// Then
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*caller=1jeune1solution/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*romes=I1234/));
			expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(/\?(.*&)*sources=matcha/));
		});
	});
});
