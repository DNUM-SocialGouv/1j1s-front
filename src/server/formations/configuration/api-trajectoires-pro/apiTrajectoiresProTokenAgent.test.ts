// @vitest-environment node
import nock from 'nock';

import {
	ApiTrajectoiresProTokenAgent,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProTokenAgent';

const apiAuthenticationUrl = 'https://omogen-api-pr.phm.education.gouv.fr/auth/token';
const clientId = 'my-client-id';
const clientSecret = 'my-client-secret';
const apiKey = 'my-api-key';
const requestBody = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

describe('ApiTrajectoiresPro token agent', () => {
	afterEach(() => {
		nock.cleanAll();
	});

	it('doit récupérer un token avec le flow client_credentials', async () => {
		// GIVEN
		const tokenResponse = { access_token: 'some-access-token', expires_in: 600 };
		nock(apiAuthenticationUrl)
			.post('', requestBody)
			.matchHeader('Content-Type', 'application/x-www-form-urlencoded')
			.matchHeader('X-omogen-api-key', apiKey)
			.reply(200, tokenResponse);

		const tokenAgent = new ApiTrajectoiresProTokenAgent(apiAuthenticationUrl, clientId, clientSecret, apiKey);

		// WHEN
		const token = await tokenAgent.getToken();

		// THEN
		expect(token).toBe('some-access-token');
		tokenAgent.destroy();
	});

	it('doit retourner le token en cache au second appel', async () => {
		// GIVEN
		const tokenResponse = { access_token: 'cached-token', expires_in: 600 };
		nock(apiAuthenticationUrl)
			.post('', requestBody)
			.matchHeader('X-omogen-api-key', apiKey)
			.once()
			.reply(200, tokenResponse);

		const tokenAgent = new ApiTrajectoiresProTokenAgent(apiAuthenticationUrl, clientId, clientSecret, apiKey);

		// WHEN
		await tokenAgent.getToken();
		const token = await tokenAgent.getToken();

		// THEN
		expect(token).toBe('cached-token');
		tokenAgent.destroy();
	});

	it('doit planifier le renouvellement du token avant expiration', async () => {
		// GIVEN
		const setTimeoutSpy = vi.spyOn(global, 'setTimeout');
		const tokenResponse = { access_token: 'some-token', expires_in: 600 };
		nock(apiAuthenticationUrl)
			.post('', requestBody)
			.matchHeader('X-omogen-api-key', apiKey)
			.reply(200, tokenResponse);

		const tokenAgent = new ApiTrajectoiresProTokenAgent(apiAuthenticationUrl, clientId, clientSecret, apiKey);

		// WHEN
		await tokenAgent.getToken();

		// THEN - le refresh doit être planifié à (600 - 60) * 1000 = 540000ms
		const refreshCall = setTimeoutSpy.mock.calls.find(([, delay]) => delay === 540_000);
		expect(refreshCall).toBeDefined();

		tokenAgent.destroy();
		setTimeoutSpy.mockRestore();
	});

	it('doit renouveler le token quand le cache est invalidé', async () => {
		// GIVEN
		nock(apiAuthenticationUrl)
			.post('', requestBody)
			.matchHeader('X-omogen-api-key', apiKey)
			.reply(200, { access_token: 'first-token', expires_in: 600 });

		nock(apiAuthenticationUrl)
			.post('', requestBody)
			.matchHeader('X-omogen-api-key', apiKey)
			.reply(200, { access_token: 'new-token', expires_in: 600 });

		const tokenAgent = new ApiTrajectoiresProTokenAgent(apiAuthenticationUrl, clientId, clientSecret, apiKey);
		await tokenAgent.getToken();

		// WHEN - on détruit (simule expiration) et on redemande un token
		tokenAgent.destroy();
		const token = await tokenAgent.getToken();

		// THEN
		expect(token).toBe('new-token');
		tokenAgent.destroy();
	});
});
