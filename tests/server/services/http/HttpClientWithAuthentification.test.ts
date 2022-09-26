import nock from 'nock';

import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
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
      const actual = await client.get('/test', (a) => a);
      // Then
      miss.isDone();
      hit.isDone();
      expect(actual).toEqual(createSuccess(body));
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
      const actual = await client.get('/test', (a) => a);
      // Then
      miss.isDone();
      hit.isDone();
      expect(actual).toEqual(createSuccess(body));
    });

    it("ne refraichit le token qu'une seule fois si plusieurs requêtes échouent simultanément", async () => {
      // Given
      const accessToken = 'uytrdxcvghfrtyh';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .get('/test')
        .twice()
        .reply(401, 'Unauthorized');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
        .get('/test')
        .twice()
        .reply(200, body);

      const deferred = new Deferred<string>();
      const tokenAgentStub = {
        getToken: jest.fn(() => deferred.promise),
      };
      const client = new HttpClientServiceWithAuthentification({
        apiName: 'test',
        apiUrl: 'https://some.test.api',
        tokenAgent: tokenAgentStub,
      });


      // When
      const req1 = client.get('/test', (a) => a);
      const req2 = client.get('/test', (a) => a);
      await delay(5);
      deferred.resolve(accessToken);
      const [ res1, res2 ] = await Promise.all([req1, req2]);
      // Then
      miss.isDone();
      hit.isDone();
      expect(res1).toEqual(createSuccess(body));
      expect(res2).toEqual(createSuccess(body));
      expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
    });

    it('fait échouer toutes les requêtes en cours si le rafraichissement échoue', async () => {
      // Given
      const miss = nock('https://some.test.api')
        .get('/test')
        .twice()
        .reply(401, 'Unauthorized');

      const deferred = new Deferred<string>();
      const tokenAgentStub = {
        getToken: jest.fn(() => deferred.promise),
      };
      const client = new HttpClientServiceWithAuthentification({
        apiName: 'test',
        apiUrl: 'https://some.test.api',
        tokenAgent: tokenAgentStub,
      });


      // When
      const req1 = client.get('/test', (a) => a);
      const req2 = client.get('/test', (a) => a);
      await delay(5);
      deferred.reject(Error('Echec'));
      const [ res1, res2 ] = await Promise.all([req1, req2]);
      // Then
      miss.isDone();
      expect(res1).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      expect(res2).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
  });
});

class Deferred<T> {
  promise: Promise<T>;
  done = false;
  error = false;

  reject!: (reason: Error) => void;
  resolve!: (value: T) => void;

  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

function delay (ms: number) {
  return new Promise((done) => setTimeout(done, ms));
}
