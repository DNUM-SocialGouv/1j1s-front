import nock from 'nock';

import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { aLoggerService } from '~/server/services/logger.service.fixture';

describe('AuthenticatedHttpClientService', () => {
	describe('.get(url)', () => {
		afterEach(() => {
			nock.cleanAll();
		});

		describe('quand un token est déjà présent', () => {
			describe('quand l’appel retourne une 200', () => {
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
					// Intialise le token avec un token expiré
					await client.retrieveToken();

					const response = await client.get('/test');

					authorizedCall.isDone();
					expect(response.data).toEqual(body);
					expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
				});
			});

			describe('quand l’appel retourne une erreur non lié à l’authentification', () => {
				it('ne renouvelle pas le token et retourne une erreur', async () => {
					// Given
					const apiUrl = 'https://some.test.api';
					const unauthorizedCall = nock(apiUrl)
						.get('/test')
						.reply(501);

					const tokenAgentStub = {
						getToken: jest.fn(),
					};

					const client = new AuthenticatedHttpClientService({
						apiName: 'test',
						apiUrl,
						tokenAgent: tokenAgentStub,
					}, aLoggerService());

					// When
					let result;
					try {
						result = await client.get('/test');
					} catch (error) {
						result = error;
					}

					// Then
					expect(result).toBeInstanceOf(Error);
					unauthorizedCall.isDone();
					expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
				});
			});

			describe('quand le token a expiré', () => {
				describe('quand le renouvellement du token réussit', () => {
					it('rejoue la requête initiale avec le nouveau token', async () => {
						const expiredToken = 'expired-123';
						const newToken = 'new-456';
						const body = { some: 'body' };
						const apiUrl = 'https://some.test.api';
						const unauthorizedCall = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${expiredToken}` } })
							.get('/test')
							.reply(401)
							.persist(true);

						const callWithNewActiveToken = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${newToken}` } })
							.get('/test')
							.reply(200, body);

						const tokenAgentStub = {
							getToken: jest.fn().mockResolvedValueOnce(expiredToken).mockResolvedValueOnce(newToken),
						};

						const client = new AuthenticatedHttpClientService({
							apiName: 'test',
							apiUrl,
							tokenAgent: tokenAgentStub,
						},  aLoggerService());
						// Intialise le token avec un token expiré
						await client.retrieveToken();

						const response = await client.get('/test');

						unauthorizedCall.isDone();
						callWithNewActiveToken.isDone();
						expect(response.data).toEqual(body);
						expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(2);
					});
				});

				describe('quand le renouvellement du token échoue', () => {
					it('log et retourne une erreur liée a la recuperation token', async () => {
						const error = 'Cannot refresh access token';
						const apiUrl = 'https://some.test.api';
						const logger = aLoggerService();
						const unauthorizedCall = nock(apiUrl)
							.get('/test')
							.reply(403);

						const tokenAgentStub = {
							getToken: jest.fn().mockRejectedValue(error),
						};

						const client = new AuthenticatedHttpClientService({
							apiName: 'test',
							apiUrl,
							tokenAgent: tokenAgentStub,
						},  logger);

						let result = undefined;
						try {
							await client.get('/test');
						} catch (e) {
							unauthorizedCall.isDone();
							result = e;
						}
						expect(result).toEqual(error);
						expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
						expect(logger.errorWithExtra).toHaveBeenCalledTimes(1);
						expect(logger.errorWithExtra).toHaveBeenCalledWith(expect.objectContaining({
							message: expect.stringContaining('Impossible de renouveler le token'),
						}));
					});
				});
			});
		});

		describe('quand il n’y a pas encore de token', () => {
			it('récupère un token avant de jouer la requête', async () => {
				// Given
				const newActiveToken = 'uytrdxcvghfrtyh';
				const body = { some: 'body' };
				const apiUrl = 'https://some.test.api';
				const callWithRefreshedCall = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${newActiveToken}` } })
					.get('/test')
					.reply(200, body);

				const tokenAgentStub = {
					getToken: jest.fn().mockResolvedValueOnce(newActiveToken),
				};

				const client = new AuthenticatedHttpClientService({
					apiName: 'test',
					apiUrl,
					tokenAgent: tokenAgentStub,
				}, aLoggerService());

				// When
				const response = await client.get('/test');

				// Then
				callWithRefreshedCall.isDone();
				expect(response.data).toEqual(body);
				expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('.post(url)', () => {
		afterEach(() => {
			nock.cleanAll();
		});

		describe('quand un token est déjà présent', () => {
			describe('quand l’appel retourne une 200', () => {
				it('ne renouvelle pas le token', async () => {
					const body = { some: 'body' };
					const apiUrl = 'https://some.test.api';
					const authorizedCall = nock(apiUrl)
						.post('/test')
						.reply(200, body);

					const tokenAgentStub = {
						getToken: jest.fn(),
					};

					const client = new AuthenticatedHttpClientService({
						apiName: 'test',
						apiUrl,
						tokenAgent: tokenAgentStub,
					}, aLoggerService());
					// Intialise le token avec un token expiré
					await client.retrieveToken();

					const response = await client.post('/test', {});

					authorizedCall.isDone();
					expect(response.data).toEqual(body);
					expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
				});
			});

			describe('quand l’appel retourne une erreur non lié à l’authentification', () => {
				it('ne renouvelle pas le token et retourne une erreur', async () => {
					// Given
					const apiUrl = 'https://some.test.api';
					const unauthorizedCall = nock(apiUrl)
						.post('/test')
						.reply(501);

					const tokenAgentStub = {
						getToken: jest.fn(),
					};

					const client = new AuthenticatedHttpClientService({
						apiName: 'test',
						apiUrl,
						tokenAgent: tokenAgentStub,
					}, aLoggerService());

					// When
					let result;
					try {
						result = await client.post('/test', {});
					} catch (error) {
						result = error;
					}

					// Then
					expect(result).toBeInstanceOf(Error);
					unauthorizedCall.isDone();
					expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
				});
			});

			describe('quand le token a expiré', () => {
				describe('quand le renouvellement du token réussit', () => {
					it('rejoue la requête initiale avec le nouveau token', async () => {
						const expiredToken = 'expired-123';
						const newToken = 'new-456';
						const body = { some: 'body' };
						const apiUrl = 'https://some.test.api';
						const unauthorizedCall = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${expiredToken}` } })
							.post('/test')
							.reply(401)
							.persist(true);

						const callWithNewActiveToken = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${newToken}` } })
							.post('/test')
							.reply(200, body);

						const tokenAgentStub = {
							getToken: jest.fn().mockResolvedValueOnce(expiredToken).mockResolvedValueOnce(newToken),
						};

						const client = new AuthenticatedHttpClientService({
							apiName: 'test',
							apiUrl,
							tokenAgent: tokenAgentStub,
						},  aLoggerService());
						// Intialise le token avec un token expiré
						await client.retrieveToken();

						const response = await client.post('/test', {});

						unauthorizedCall.isDone();
						callWithNewActiveToken.isDone();
						expect(response.data).toEqual(body);
						expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(2);
					});
				});

				describe('quand le renouvellement du token échoue', () => {
					it('log et retourne une erreur liée a la recuperation token', async () => {
						const error = 'Cannot refresh access token';
						const apiUrl = 'https://some.test.api';
						const logger = aLoggerService();
						const unauthorizedCall = nock(apiUrl)
							.post('/test')
							.reply(403);

						const tokenAgentStub = {
							getToken: jest.fn().mockRejectedValue(error),
						};

						const client = new AuthenticatedHttpClientService({
							apiName: 'test',
							apiUrl,
							tokenAgent: tokenAgentStub,
						},  logger);

						let result = undefined;
						try {
							await client.post('/test', {});
						} catch (e) {
							unauthorizedCall.isDone();
							result = e;
						}
						expect(result).toEqual(error);
						expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
						expect(logger.errorWithExtra).toHaveBeenCalledTimes(1);
						expect(logger.errorWithExtra).toHaveBeenCalledWith(expect.objectContaining({
							message: expect.stringContaining('Impossible de renouveler le token'),
						}));
					});
				});
			});
		});

		describe('quand il n’y a pas encore de token', () => {
			it('récupère un token avant de jouer la requête', async () => {
				// Given
				const newActiveToken = 'uytrdxcvghfrtyh';
				const body = { some: 'body' };
				const apiUrl = 'https://some.test.api';
				const callWithRefreshedCall = nock(apiUrl, { reqheaders: { Authorization: `Bearer ${newActiveToken}` } })
					.post('/test')
					.reply(200, body);

				const tokenAgentStub = {
					getToken: jest.fn().mockResolvedValueOnce(newActiveToken),
				};

				const client = new AuthenticatedHttpClientService({
					apiName: 'test',
					apiUrl,
					tokenAgent: tokenAgentStub,
				}, aLoggerService());

				// When
				const response = await client.post('/test', {});

				// Then
				callWithRefreshedCall.isDone();
				expect(response.data).toEqual(body);
				expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
			});
		});
	});
});
