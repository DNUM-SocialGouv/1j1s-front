import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { enregistrerEntreprisesHandler } from '~/pages/api/entreprises';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('enregistrerEntreprisesHandler', () => {
  const jwt = '3456789098765RFVBGFDRTYHJNfKJHGV';
  const identifier = '1j1s@gouv.fr'; // défini dans le fichier .env.test
  const password = 'monmotdepassesécurisé'; // défini dans le fichier .env.test
  afterEach(() => nock.cleanAll());

  describe('GET', () => {
    it('retourne une erreur 406', async () => {
      await testApiHandler<void | ErrorHttpResponse>({
        handler: (req, res) => enregistrerEntreprisesHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toEqual(406);
        },
        url: '/entreprises',
      });
    });
  });

  describe('POST', () => {
    it('répond une 200 quand tout s’est bien passé', async () => {
      const strapiAuth = nock('http://localhost:1337/api')
        .post('/entreprises')
        .once()
        .reply(401, 'unauthorized')
        .post('/auth/local', { identifier, password })
        .once()
        .reply(200, { jwt });
      const strapiApi = nock('http://localhost:1337/api', { reqheaders: { Authorization: `Bearer ${jwt}` } })
        .post('/entreprises', {
          data: {
            code_postal: '75002',
            email: 'email@octo.com',
            nom: 'Toto',
            nom_societe: 'Octo',
            prenom: 'Tata',
            secteur: 'Dev',
            siret: '123456789123',
            taille: '~ 1000',
            telephone: '0611223344',
            travail: 'Dev',
          },
        })
        .reply(201);

      await testApiHandler<void | ErrorHttpResponse>({
        handler: (req, res) => enregistrerEntreprisesHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({
            body: JSON.stringify({
              codePostal: '75002',
              email: 'email@octo.com',
              nom: 'Toto',
              nomSociété: 'Octo',
              prénom: 'Tata',
              secteur: 'Dev',
              siret: '123456789123',
              taille: '~ 1000',
              travail: 'Dev',
              téléphone: '0611223344',
            }),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
          });
          expect(res.status).toEqual(200);
          strapiAuth.done();
          strapiApi.done();
        },
        url: '/entreprises',
      });
    });
  });
});
