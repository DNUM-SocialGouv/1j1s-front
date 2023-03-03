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
		expect(httpClientService.get).toHaveBeenCalledWith(expect.stringMatching('/formations'));
	});
	it('fait l’appel avec les bons paramètres', () => {
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
	});
});
