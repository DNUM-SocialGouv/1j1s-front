import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { unEnvoieEmail } from '~/client/services/envoieEmail/envoieEmail.fixture';
import { envoyerEmailHandler } from '~/pages/api/envoie-email/index.controller';
import { EnvoieEmail } from '~/server/envoie-email/domain/EnvoieEmail';
import { aEnvoieEmailList } from '~/server/envoie-email/domain/EnvoieEmail.fixture';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('envoie un mail', () => {
  describe('lorsque l’envoie est valide', () => {
    it('retourne un success', async () => {
      nock('https://api.tipimail.com/v1')
        .post('/messages/send')
        .reply(201);

      await testApiHandler<EnvoieEmail[] | ErrorHttpResponse>({
        handler: (req, res) => envoyerEmailHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({
            body: JSON.stringify(unEnvoieEmail()),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
          });
          expect(res.status).toEqual(200);
          const json = await res.json();
          expect(json).toEqual(aEnvoieEmailList());
        },
      });
    });
  });
  describe('lorsque l’envoie echoue', () => {
    it('retourne une erreur Service indisponible', async () => {
      nock('https://api.tipimail.com/v1')
        .post('/messages/send')
        .reply(406);

      await testApiHandler<EnvoieEmail[] | ErrorHttpResponse>({
        handler: (req, res) => envoyerEmailHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'POST' });
          const json = await res.json();
          expect(json).toEqual({ error: ErreurMétier.SERVICE_INDISPONIBLE });
        },
      });
    });
  });
});
