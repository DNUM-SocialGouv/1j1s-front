import nock from 'nock';

import { OnisepTokenAgent } from '~/server/formations-initiales/configuration/tokenAgent/onisepTokenAgent';

describe('Onisep token agent', () => {
	it('doit récupérer un token sur la bonne url', async () => {
		// GIVEN
		const onisepLoginResponse = {
			token: 'some-token',
		};
		const apiAuthenticationUrl = 'https://api.opendata.onisep.fr/api/1.0/login';
		const email = 'email@example.com';
		const password = 'some-password';
		const requestBody = { body: { email, password }, headers: { 'Content-Type':'application/x-www-form-urlencoded' } };
		nock(apiAuthenticationUrl)
			.post('', requestBody )
			.reply(200, onisepLoginResponse);

		const onisepTokenAgent = new OnisepTokenAgent(apiAuthenticationUrl, email, password );

		// WHEN
		const token = await onisepTokenAgent.getToken();

		// THEN
		expect(token).toBe(onisepLoginResponse.token);
	});
});
