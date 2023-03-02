import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import {
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

describe('AlternanceService', () => {
	describe('rechercherAlternance', () => {
		it('appelle alternance avec la query', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const alternanceQuery = 'codeCommune=13180&codeRomes=D123,D122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845';

			(httpClientService.get as jest.Mock).mockResolvedValue(createSuccess(aRésultatRechercherMultipleAlternance()));
			const result = await alternanceService.rechercherAlternance(alternanceQuery);

			expect(result).toEqual({ instance: 'success', result: aRésultatRechercherMultipleAlternance() });
			expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeCommune=13180&codeRomes=D123%2CD122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845');
		});
	});

	describe('filtrerQueries', () => {
		it('filtre les queries pour ne garder que celles attendues', async () => {
			const httpClientService = anHttpClientService();
			const alternanceService = new AlternanceService(httpClientService);
			const formationQuery = 'codeCommune=13180&codeRomes=D123,D122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845&unwantedQuery=query-en-trop';

			const result = alternanceService.filtrerQueries(formationQuery);

			expect(result).toEqual('codeCommune=13180&codeRomes=D123%2CD122&distanceCommune=30&latitudeCommune=2.37&longitudeCommune=15.845');

		});
	});
});
