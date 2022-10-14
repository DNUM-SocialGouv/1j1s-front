import chalk from 'chalk';
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
      const req1 = await client.get('/test', (a) => a);
      const req2 = await client.get('/test', (a) => a);
      // Then
      miss.done();
      hit.done();
      expires.done();
      hitRefreshed.done();
      expect(req1).toEqual(createSuccess(body));
      expect(req2).toEqual(createSuccess(body));
      expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(2);
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
      await becomeTrue(() => expect(miss.pendingMocks()).toHaveLength(0));

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
      await becomeTrue(() => expect(miss.pendingMocks()).toHaveLength(0));

      deferred.reject(Error('Echec'));
      const [ res1, res2 ] = await Promise.all([req1, req2]);
      // Then
      miss.isDone();
      expect(res1).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      expect(res2).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
  });
  describe('.post(url)', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('rafraichit un token quand il reçoit un 403', async () => {
      // Given
      const accessToken = 'uytrdxcvghfrtyh';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .post('/test')
        .reply(403, 'forbidden');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
        .post('/test')
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
      const actual = await client.post('/test', {});
      // Then
      miss.isDone();
      hit.isDone();
      expect(actual.status).toEqual(200);
    });
    it('rafraichit un token quand il reçoit un 401', async () => {
      // Given
      const accessToken = 'uytrdxcvghfrtyh';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .post('/test')
        .reply(401, 'Unauthorized');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
        .post('/test')
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
      const actual = await client.post('/test', {});
      // Then
      miss.isDone();
      hit.isDone();
      expect(actual.status).toEqual(200);
    });
    it('rafraichit un token qui a expiré', async () => {
      // Given
      const accessToken1 = 'uytrdxcvghfrtyh';
      const accessToken2 = 'mpoijnbhjkloiuj';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .post('/test')
        .reply(401, 'Unauthorized');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken1}` } })
        .post('/test')
        .reply(200, body);

      const expires = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken1}` } })
        .post('/test')
        .reply(401);

      const hitRefreshed = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken2}` } })
        .post('/test')
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
      const req1 = await client.post('/test', {});
      const req2 = await client.post('/test', {});
      // Then
      miss.done();
      hit.done();
      expires.done();
      hitRefreshed.done();
      expect(req1.status).toEqual(200);
      expect(req2.status).toEqual(200);
      expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(2);
    });

    it("ne refraichit le token qu'une seule fois si plusieurs requêtes échouent simultanément", async () => {
      // Given
      const accessToken = 'uytrdxcvghfrtyh';
      const body = { some: 'body' };
      const miss = nock('https://some.test.api')
        .post('/test')
        .twice()
        .reply(401, 'Unauthorized');

      const hit = nock('https://some.test.api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
        .post('/test')
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
      const req1 = client.post('/test', {});
      const req2 = client.post('/test', {});
      await becomeTrue(() => expect(miss.pendingMocks()).toHaveLength(0));

      deferred.resolve(accessToken);
      const [ res1, res2 ] = await Promise.all([req1, req2]);
      // Then
      miss.isDone();
      hit.isDone();
      expect(res1.status).toEqual(200);
      expect(res2.status).toEqual(200);
      expect(tokenAgentStub.getToken).toHaveBeenCalledTimes(1);
    });

    it('fait échouer toutes les requêtes en cours si le rafraichissement échoue', async () => {
      // Given
      const miss = nock('https://some.test.api')
        .post('/test')
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
      const req1 = client.post('/test', {}).catch((e) => e);
      const req2 = client.post('/test', {}).catch((e) => e);

      await becomeTrue(() => expect(miss.pendingMocks()).toHaveLength(0));

      deferred.reject(Error('Echec'));
      const [ res1, res2 ] = await Promise.all([req1, req2]);
      // Then
      miss.isDone();
      expect(res1.response.status).toEqual(401);
      expect(res2.response.status).toEqual(401);
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

async function becomeTrue(predicate: () => void, timeout=200, interval=10) {
  const end = Date.now() + timeout;
  const [_, predicateString] = predicate.toString().split('\n').map((line: string) => line.replace(/^\s+(return ?)?/, ''));
  let lastErrorMessage = '';
  let tries = 0;
  while (Date.now() < end) {
    try {
      tries++;
      predicate();
      await delay(interval);
      return;
    } catch (e) {
      await delay(interval);
      lastErrorMessage = (e as Error).message;
    }
  }
  throw Error(`Condition '${chalk.italic(predicateString)}' did not become true after ${timeout}ms (${tries} tries)\n${lastErrorMessage}`);
}

function delay (ms: number) {
  return new Promise((done) => setTimeout(done, ms));
}

