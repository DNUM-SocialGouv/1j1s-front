import nock from 'nock';

import { FranceTravailTokenAgent } from '~/server/offres/configuration/france-travail/franceTravailTokenAgent';

describe('ClientCredentialsTokenAgent()', () => {
	describe('getToken()', () => {
		const access_token = 'HJNBVFTYUJN345678987654EDCFVHB';
		beforeEach(() => {
			nock('https://some.oauth2.server')
				.post('/oauth2/token')
				.reply(200, { access_token });
		});
		afterEach(() => nock.cleanAll());
		it('fetches a new token using client credentials', async () => {
			// Given
			const agent = new FranceTravailTokenAgent({
				clientId: 'id',
				clientSecret: 'secret',
				scope: 'openid',
				url: 'https://some.oauth2.server/oauth2/token',
			});
			// When
			const actual = await agent.getToken();
			// Then
			expect(actual).toEqual(access_token);
		});
	});
});
