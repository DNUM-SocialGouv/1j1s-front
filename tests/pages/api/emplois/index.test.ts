import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  aRésultatRechercheOffreEmploiAxiosResponse,
  aRésultatRéférentielCommuneResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherOffreEmploiHandler } from '~/pages/api/emplois';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('rechercher une offre d\'emploi', () => {
  it('retourne la liste des offres d\'emploi filtrée', async () => {
    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres')
      .get('/search?range=0-14&motsCles=boulanger&typeContrat=CDD%2CCDI&commune=75101')
      .reply(401)
      .get('/search?range=0-14&motsCles=boulanger&typeContrat=CDD%2CCDI&commune=75101')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel')
      .get('/communes')
      .reply(200, aRésultatRéférentielCommuneResponse().data);

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
      url: '/emplois?motCle=boulanger&typeDeContrats=CDD,CDI&codeLocalisation=75101&typeLocalisation=COMMUNE&page=1',
    });
  });
});
