import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	aCommandeRejoindreLaMobilisation,
	anEntrepriseMember,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { enregistrerEntreprisesHandler } from '~/pages/api/entreprises/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';

describe('enregistrerEntreprisesHandler', () => {
	afterEach(() => nock.cleanAll());

	it('répond une 200 quand tout s’est bien passé', async () => {
		let strapiReceivedBody: Record<string, string>;
		const leeApi = nock('https://staging.lesentreprises-sengagent.local')
			.post('/api/members', (body) => {
				strapiReceivedBody = body;
				return true;
			})
			.reply(201);

		await testApiHandler<void | ErrorHttpResponse>({
			handler: (req, res) => enregistrerEntreprisesHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({
					body: JSON.stringify(aCommandeRejoindreLaMobilisation()),
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
				});
				expect(res.status).toEqual(200);
				expect(strapiReceivedBody).toEqual(anEntrepriseMember());
				leeApi.done();
			},
			url: '/entreprises',
		});
	});
});
