import nock from 'nock';

import { OnisepTokenAgent } from '~/server/formations-initiales/configuration/onisepTokenAgent';

describe('Onisep token agent', () => {
	it('doit récupérer un token sur la bonne url', async () => {
		// GIVEN
		const tokenResponse = {
			token: 'toto',
		};
		const email = 'email@example.com';
		const password = 'myPassword';
		const requestBody = { body: { email, password }, headers: { 'Content-Type':'application/x-www-form-urlencoded' } };
		nock('https://api.opendata.onisep.fr/api/1.0')
			.post('/login', requestBody )
			.reply(200, tokenResponse);
		const onisepTokenAgent = new OnisepTokenAgent('https://api.opendata.onisep.fr/api/1.0/login', email, password );

		// WHEN
		const token = await onisepTokenAgent.getToken();

		// THEN
		expect(token).toBe(tokenResponse.token);
	});
});
