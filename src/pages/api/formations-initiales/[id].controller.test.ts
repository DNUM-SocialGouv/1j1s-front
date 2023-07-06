import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { consulterDetailFormationInitialeHandler } from '~/pages/api/formations-initiales/[id].controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { FormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale';
import {
	aFormationInitialeDetail,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/formationInitialeResponse.fixture';

describe('getDetail', () => {
	it('retourne le détail d‘une formationInitiale', async () => {
		// GIVEN
		const id = 'FOR.1234';
		const apiBaseUrl = 'https://api.opendata.onisep.fr/api/1.0';
		const apiSearchUrl = `${apiBaseUrl}/dataset/5fa591127f501`;
		const getDetailFormationInitialeCall = nock(apiSearchUrl)
			.get(`/search?q=${id}`)
			.reply(200, aResultatRechercheFormationInitialeApiResponse);

		// WHEN
		await testApiHandler<FormationInitialeDetail | ErrorHttpResponse>({
			handler: (req, res) => consulterDetailFormationInitialeHandler(req, res),
			params: { id: id },
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				// THEN
				expect(getDetailFormationInitialeCall.isDone()).toBe(true);
				expect(json).toEqual(aFormationInitialeDetail());
			},
			url: `/formations-initiales/${id}`,
		});
	});
});
