import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { aRésultatRechercheOffreEmploiAxiosResponse } from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { offreEmploiHandler } from '~/pages/api/emplois';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('emploi api controller', () => {
  it('retourne la liste des offres d\'emploi filtrée', async () => {
    nock('https://api.emploi-store.fr/')
      .get('/partenaire/offresdemploi/v2/offres/search?range=0-39&motsCles=boulanger')
      .reply(401)
      .get('/partenaire/offresdemploi/v2/offres/search?range=0-39&motsCles=boulanger')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://entreprise.pole-emploi.fr/')
      .post('/connexion/oauth2/access_token?realm=partenaire', {
        client_id: 'PAR_test_eb72042b043039608997944fe5e741ddba12ddcd4d003e74ba9aff72d785fd19',
        client_secret: '78f6558668b2b43488b70f04947860e848e85401738feb152bb2d6025ecf0fb9',
        grant_type: 'client_credentials',
        scope: 'application_PAR_test_eb72042b043039608997944fe5e741ddba12ddcd4d003e74ba9aff72d785fd19 api_offresdemploiv2 o2dsoffre',
      })
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffreEmploi>({
      handler: (req, res) => offreEmploiHandler(req, res),
      requestPatcher: (req) => (req.url = '/emplois?page=1&motsCles=boulanger'),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatsRechercheOffreEmploi());
      },
      url: '/emplois?page=1&motsCles=boulanger',
    });
  });
});
