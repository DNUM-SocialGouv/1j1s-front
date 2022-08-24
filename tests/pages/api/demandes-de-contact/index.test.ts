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
    describe('quand le type de demande de contact est CEJ', () => {
      it('répond une 200 quand tout s’est bien passé', async () => {
        const strapiApi = nock('http://localhost:1337/api')
          .post('/contact-cejs', {
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
                type: 'CEJ',
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
    });

    describe('quand le type de demande de contact est entreprise', () => {
      it('répond une 200 quand tout s’est bien passé', async () => {
        const strapiApi = nock('http://localhost:1337/api')
          .post('/contact-entreprises', {
            data: {
              email: 'toto@msn.fr',
              message: 'rrr',
              nom: 'Mc Totface',
              prenom: 'Toto',
              sujet: 'super sujet',
              telephone: '+33678954322',
            },
          })
          .reply(201);

        await testApiHandler<void | ErrorHttpResponse>({
          handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
          test: async ({ fetch }) => {
            const res = await fetch({
              body: JSON.stringify({
                email: 'toto@msn.fr',
                message: 'rrr',
                nom: 'Mc Totface',
                prénom: 'Toto',
                sujet: 'super sujet',
                type: 'LesEntreprisesSEngagent',
                téléphone: '0678954322',
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
    });

    describe('quand le type de demande de contact est incorrecte', () => {
      it('répond une 400 quand DEMANDE_INCORRECTE',async () => {
        await testApiHandler<void | ErrorHttpResponse>({
          handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
          test: async ({ fetch }) => {
            const res = await fetch({
              body: JSON.stringify({
                email: 'toto@msn.fr',
                message: 'rrr',
                nom: 'Mc Totface',
                prénom: 'Toto',
                sujet: 'super sujet',
                type: 'wrong type',
                téléphone: '0678954322',
              }),
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
