import nock from 'nock';

import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { aLoggerService } from '~/server/services/logger.service.fixture';

describe('AuthenticatedHttpClientService', () => {
	describe('.get(url)', () => {
		afterEach(() => {
			nock.cleanAll();
		});

		describe('quand l’appel ne retourne pas un code d’erreur 401', () => {
			it('ne renouvelle pas le token', async () => {
				const body = { some: 'body' };
				const apiUrl = 'https://some.test.api';
				const authorizedCall = nock(apiUrl)
					.get('/test')
					.reply(200, body);

				const tokenAgentStub = {
					getToken: jest.fn(),
				};

				const client = new AuthenticatedHttpClientService({
					apiName: 'test',
					apiUrl,
					tokenAgent: tokenAgentStub,
				}, aLoggerService());

				const actual = await client.get('/test');

				authorizedCall.isDone();
				expect(actual.data).toEqual(body);
				expect(tokenAgentStub.getToken).not.toHaveBeenCalled();
			});
		});

		describe('quand le token a expiré', () => {
			describe('quand le renouvellement du token réussit', () => {
				it('renouvelle le token et rejoue la requête initiale', async () => {
					const accessToken = 'uytrdxcvghfrtyh';
					const body = { some: 'body' };
					const apiUrl = 'https://some.test.api';
					const unauthorizedCall = nock(apiUrl)
						.get('/test')
						.reply(401);

					const callWithRefreshedCall = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${accessToken}` } })
						.get('/test')
						.reply(200, body);

					const tokenAgentStub = {
						getToken: jest.fn().mockResolvedValue(accessToken),
					};

					const client = new AuthenticatedHttpClientService({
						apiName: 'test',
						apiUrl,
						tokenAgent: tokenAgentStub,
					},  aLoggerService());

					const actual = await client.get('/test');

					unauthorizedCall.isDone();
					callWithRefreshedCall.isDone();
					expect(actual.data).toEqual(body);
					expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
				});
			});

			describe('quand le renouvellement du token échoue', () => {
				it('retourne l’erreur liée au refresh token', async () => {
					const error = 'Cannot refresh access token';
					const apiUrl = 'https://some.test.api';
					const unauthorizedCall = nock(apiUrl)
						.get('/test')
						.reply(401);

					const tokenAgentStub = {
						getToken: jest.fn().mockRejectedValue(error),
					};

					const client = new AuthenticatedHttpClientService({
						apiName: 'test',
						apiUrl,
						tokenAgent: tokenAgentStub,
					},  aLoggerService());

					let result = undefined;
					try {
						await client.get('/test');
					} catch (e) {
						unauthorizedCall.isDone();
						result = e;
					}
					expect(result).toEqual(error);
					expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
				});
			});
		});
	});
});
