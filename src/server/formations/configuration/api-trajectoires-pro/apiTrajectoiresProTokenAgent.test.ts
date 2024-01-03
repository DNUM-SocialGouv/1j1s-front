import nock from 'nock';

import {
	ApiTrajectoiresProTokenAgent,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProTokenAgent';

describe('ApiTrajectoiresPro token agent', () => {
	it('doit récupérer un token sur la bonne url', async () => {
		// GIVEN
		const apiTrajectoiresProLoginResponse = {
			token: 'some-token',
		};
		const apiAuthenticationUrl = 'https://trajectoires-pro-recette.apprentissage.beta.gouv.fr/api/inserjeunes/auth/login';
		const username = '1j1s';
		const password = 'password';
		const requestBody = `password=${password}&username=${username}`;
		const requestHeaders =  { reqheaders: { 'Content-Type':'application/x-www-form-urlencoded' } };
		nock(apiAuthenticationUrl)
			.post('', requestBody, requestHeaders)
			.reply(200, apiTrajectoiresProLoginResponse);

		const apiTrajectoiresProTokenAgent = new ApiTrajectoiresProTokenAgent(apiAuthenticationUrl, username, password );

		// WHEN
		const token = await apiTrajectoiresProTokenAgent.getToken();

		// THEN
		expect(token).toBe(apiTrajectoiresProLoginResponse.token);
	});
});
