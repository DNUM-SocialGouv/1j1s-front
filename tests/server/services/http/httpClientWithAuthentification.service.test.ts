import nock from 'nock';

import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

describe('HttpClientServiceWithAuthentification', () => {
  describe('.get(url)', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('rafraichit un token quand il reçoit un 403', async () => {
      // Given
      const accessToken = 'uytrdxcvghfrtyh';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .get('/test')
        .reply(403, 'forbidden');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
        .get('/test')
        .reply(200, body);

      const tokenAgentStub = {
        getToken: jest.fn().mockResolvedValue(accessToken),
      };
      const client = new HttpClientServiceWithAuthentification({
        apiName: 'test',
        apiUrl: 'https://some.test.api',
        tokenAgent: tokenAgentStub,
      });


      // When
      const actual = await client.get('/test', undefined);
      // Then
      miss.isDone();
      hit.isDone();
      expect(actual.data).toEqual(body);
    });

    it('rafraichit un token quand il reçoit un 401', async () => {
      // Given
      const accessToken = 'uytrdxcvghfrtyh';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .get('/test')
        .reply(401, 'Unauthorized');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
        .get('/test')
        .reply(200, body);

      const tokenAgentStub = {
        getToken: jest.fn().mockResolvedValue(accessToken),
      };
      const client = new HttpClientServiceWithAuthentification({
        apiName: 'test',
        apiUrl: 'https://some.test.api',
        tokenAgent: tokenAgentStub,
      });


      // When
      const actual = await client.get('/test', undefined);
      // Then
      miss.isDone();
      hit.isDone();
      expect(actual.data).toEqual(body);
    });

    it('rafraichit un token qui a expiré', async () => {
      // Given
      const accessToken1 = 'uytrdxcvghfrtyh';
      const accessToken2 = 'mpoijnbhjkloiuj';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .get('/test')
        .reply(401, 'Unauthorized');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken1}` } })
        .get('/test')
        .reply(200, body);

      const expires = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken1}` } })
        .get('/test')
        .reply(401);

      const hitRefreshed = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken2}` } })
        .get('/test')
        .reply(200, body);

      let refresh = false;
      const tokenAgentStub = {
        getToken: jest.fn(async () => {
          if (!refresh) {
            refresh = true;
            return accessToken1;
          } else {
            return accessToken2;
          }
        }),
      };
      const client = new HttpClientServiceWithAuthentification({
        apiName: 'test',
        apiUrl: 'https://some.test.api',
        tokenAgent: tokenAgentStub,
      });


      // When
      const req1 = await client.get('/test', undefined);
      const req2 = await client.get('/test', undefined);
      // Then
      miss.done();
      hit.done();
      expires.done();
      hitRefreshed.done();
      expect(req1.data).toEqual(body);
      expect(req2.data).toEqual(body);
      expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(2);
    });
  });
});
