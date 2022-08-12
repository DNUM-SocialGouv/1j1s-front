import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { enregistrerDemandeDeContactHandler } from '~/pages/api/demandes-de-contact';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('enregistrerDemandeDeContactHandler', () => {

  describe('GET', () => {
    it('retourne une erreur 406', async () => {
      await testApiHandler<void | ErrorHttpResponse>({
        handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toEqual(406);
        },
        url: '/demandes-de-contact',
      });
    });
  });

  describe('POST', () => {
    it('répond une 200 quand tout s’est bien passé', async () => {
      const strapiApi = nock('http://localhost:1337/api')
        .post('/contacts', {
          data: {
            age: 18,
            email: 'toto@msn.fr',
            nom: 'Mc Totface',
            prenom: 'Toto',
            telephone: '+33678954322',
            ville: 'Cergy',
          },
        })
        .reply(201);

      await testApiHandler<void | ErrorHttpResponse>({
        handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({
            body: JSON.stringify({
              age: 18,
              email: 'toto@msn.fr',
              nom: 'Mc Totface',
              prénom: 'Toto',
              téléphone: '0678954322',
              ville: 'Cergy',
            }),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
          });
          expect(res.status).toEqual(200);
          strapiApi.done();
        },
        url: '/demandes-de-contact',
      });
    });

    describe('quand le body de la requête est vide', () => {
      it('répond une 400 quand DEMANDE_INCORRECTE',async () => {
        await testApiHandler<void | ErrorHttpResponse>({
          handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
          test: async ({ fetch }) => {
            const res = await fetch({
              body: JSON.stringify({}),
              headers: {
                'content-type': 'application/json',
              },
              method: 'POST',
            });
            expect(res.status).toEqual(400);
          },
          url: '/demandes-de-contact',
        });
      });
    });
  });
});
