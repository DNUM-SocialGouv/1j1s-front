import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { aRésultatRechercheOffreEmploiAxiosResponse } from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherOffreEmploiHandler } from '~/pages/api/emplois';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('rechercher une offre d\'emploi', () => {
  it('retourne la liste des offres d\'emploi filtrée', async () => {
    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/offres/search?range=0-29&motsCles=boulanger&typeContrat=CDD%2CCDI&region=34')
      .reply(401)
      .get('/partenaire/offresdemploi/v2/offres/search?range=0-29&motsCles=boulanger&typeContrat=CDD%2CCDI&region=34')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://entreprise.pole-emploi.fr')
      .post('/connexion/oauth2/access_token?realm=partenaire')
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffreEmploi | ErrorHttpResponse>({
      handler: (req, res) => rechercherOffreEmploiHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatsRechercheOffreEmploi());
      },
      url: '/emplois?page=1&motCle=boulanger&typeDeContrats=CDD,CDI&codeInsee=34&typeLocalisation=REGION',
    });
  });

  it('retourne une erreur 500 quand le service est indisponible', async () => {
    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/offres/search?motsCles=&range=29970-29999&typeContrat=')
      .reply(401)
      .get('/partenaire/offresdemploi/v2/offres/search?motsCles=&range=29970-29999&typeContrat=')
      .reply(500,
        {
          'codeErreur': '1652879820005',
          'codeHttp': 500,
          'message': 'Service indisponible',
        },
      );

    nock('https://entreprise.pole-emploi.fr')
      .post('/connexion/oauth2/access_token?realm=partenaire')
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffreEmploi | ErrorHttpResponse>({
      handler: (req, res) => rechercherOffreEmploiHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(res.status).toEqual(500);
        expect(json).toEqual({ error: 'SERVICE_INDISPONIBLE' });
      },
      url: '/emplois?page=1000',
    });
  });
});
