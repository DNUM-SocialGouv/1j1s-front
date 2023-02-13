import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Alternance } from '~/server/alternances/domain/alternance';
import { uneAlternance } from '~/server/alternances/domain/alternance.fixture';
import { aListeLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';

import getAlternanceHandler from './[id].controller';

describe('rechercher alternance', () => {
	it('retourne une alternance', async () => {
		const alternanceId = 'g8_DWUYBnYooOG9KzQM_y-0';
		const rome = 'H1502';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs?caller=1jeune1solution&romes=${rome}&sources=matcha`,
		).reply(200, aListeLaBonneAlternanceApiResponse());

		await testApiHandler<Alternance | ErrorHttpResponse>({
			handler: (req, res) => getAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(uneAlternance());
			},
			url: `/alternances/${alternanceId}?rome=${rome}`,
		});
	});
});
