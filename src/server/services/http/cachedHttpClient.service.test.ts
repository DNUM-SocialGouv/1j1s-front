import nock from 'nock';

import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

const clientConfig: PublicHttpClientConfig = {
	apiName: 'SOME_API_NAME',
	apiUrl: 'https://some.url.com',
};
const someQueryParams = 'param1=unParam&param2=unAutreParam';
const someOtherQueryParams = 'param1=unParam&param3=encoreUnAutreParam';
let bodyWithoutParams: { info: string; status: string };
let bodyWithSomeParams: { extra: string; info: string; status: string };
let bodyWithSomeOtherParams: { extra: string; info: string; status: string };
let httpClientServiceWithCache: CachedHttpClientService;

describe('CachedHttpClientService', () => {
	beforeEach(() => {
		httpClientServiceWithCache = new CachedHttpClientService(clientConfig);
		bodyWithoutParams = {
			info: 'some extra info',
			status: 'It’s all fine',
		};
		bodyWithSomeParams = {
			extra: 'hey we’ve got some query params',
			info: 'some extra info',
			status: 'It’s all fine',
		};
		bodyWithSomeOtherParams = {
			extra: 'hey we’ve got some other query params',
			info: 'some other extra info',
			status: 'It’s all fine',
		};
		nock('https://some.url.com')
			.get('/some-endpoint')
			.reply(200, bodyWithoutParams)
			.get(`/some-endpoint?${someQueryParams}`)
			.reply(200, bodyWithSomeParams)
			.get(`/some-endpoint?${someOtherQueryParams}`)
			.reply(200, bodyWithSomeOtherParams);
	});

	describe('get', () => {
		describe('Lorsqu’un appel HTTP est effectué une seule fois', () => {
			it('retourne le résultat de la requête', async () => {
				// When
				const actual = await httpClientServiceWithCache.get('some-endpoint');

				// Then
				expect(actual.data).toEqual({ ...bodyWithoutParams });
			});
		});

		describe('Lorsqu’un appel HTTP est effectué plusieurs fois', () => {
			describe('et que les queryParams sont identiques', () => {
				it('retourne le résultat de la requête avec le cache', async () => {
					// Given
					await httpClientServiceWithCache.get(`some-endpoint?${someQueryParams}`);

					// When
					const actual = await httpClientServiceWithCache.get(`some-endpoint?${someQueryParams}`);

					// Then
					expect(actual.data).toEqual({ ...bodyWithSomeParams });
					expect(actual.cached).toBeTruthy();
				});
			});

			describe('et que les queryParams ne sont pas identiques', () => {
				it('retourne le résultat de la requête sans le cache', async () => {
					// Given
					await httpClientServiceWithCache.get(`some-endpoint?${someQueryParams}`);

					// When
					const actual = await httpClientServiceWithCache.get(`some-endpoint?${someOtherQueryParams}`);

					// Then
					expect(actual.data).toEqual({ ...bodyWithSomeOtherParams });
					expect(actual.cached).toBeFalsy();
				});
			});
		});
	});
});
