import { aFormationQuery } from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';
import {
	ApiLaBonneAlternanceFormationRepository,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.repository';
import { anHttpClientService } from '~/server/services/http/httpClientService.fixture';

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
	});
	it('fait l’appel avec les bons paramètres', () => {
		const httpClientService = anHttpClientService();
		const caller = '1jeune1solution-test';
		const repository = new ApiLaBonneAlternanceFormationRepository(httpClientService, caller);

		repository.search(aFormationQuery());

		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching(`caller=${caller}`));
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('romes=D1406,D1407'));
	});
});
