import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/metiers/infra/apiLaBonneAlternanceMétier.fixture';
import { mapMetier } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.mapper';

describe('mapMetier', () => {
	it('converti une response en liste de métiers', () => {
		const responseAPI: MetierLaBonneAlternanceApiResponse = aMetierLaBonneAlternanceApiResponse();

		const result = mapMetier(responseAPI);

		expect(result).toEqual(responseAPI.labelsAndRomes);
	});
});
