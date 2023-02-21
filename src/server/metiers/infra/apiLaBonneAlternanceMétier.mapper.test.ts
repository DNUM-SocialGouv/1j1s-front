import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/metiers/infra/apiLaBonneAlternanceMétier.fixture';
import { mapMétier } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.mapper';

describe('mapMétier', () => {
	it('converti une response en liste de métiers', () => {
		const responseAPI: MetierLaBonneAlternanceApiResponse = aMetierLaBonneAlternanceApiResponse();

		const result = mapMétier(responseAPI);

		expect(result).toEqual(responseAPI.labelsAndRomes);
	});
});
