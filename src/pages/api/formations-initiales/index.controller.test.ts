import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherFormationsInitialesHandler } from '~/pages/api/formations-initiales/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { aFormationInitiale } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	aFormationInitialeApiResponse,
	aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/formationInitialeResponse.fixture';

describe('lorsque je veux faire une recherche de formations initiales', () => {
	it('doit récupérer des formations initiales', async () => {
		// GIVEN
		const token = 'some-token';
		const onisepLoginResponse = {
			token,
		};
		const apiBaseUrl = 'https://api.opendata.onisep.fr/api/1.0';
		const apiAuthenticationUrl = `${apiBaseUrl}/login`;
		const apiSearchUrl = `${apiBaseUrl}/dataset/5fa591127f501/search`;
		const emailEncoded = 'fake%40example.com';
		const password = 'password-bidon';
		const getTokenRequestBody = `email=${emailEncoded}&password=${password}`;
		const getTokenRequestHeaders =  { reqheaders: { 'Content-Type':'application/x-www-form-urlencoded' } };
		const requestOptions = {
			reqheaders: {
				'Application-ID': '123456789',
				authorization: `Bearer ${token}`,
			},
		};
		nock(apiAuthenticationUrl)
			.post('', getTokenRequestBody, getTokenRequestHeaders)
			.reply(200, onisepLoginResponse);
		nock(apiSearchUrl)
			.get('', undefined, requestOptions)
			.reply(200, aResultatRechercheFormationInitialeApiResponse);

		// WHEN
		await testApiHandler<Array<FormationInitiale> | ErrorHttpResponse>({
			handler: (req, res) => rechercherFormationsInitialesHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				// THEN
				expect(json).toEqual([aFormationInitiale()]);
			},
			url: '/formations-initiales',
		});
	});
});
