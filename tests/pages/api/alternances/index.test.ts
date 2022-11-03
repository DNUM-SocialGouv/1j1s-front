import { aRésultatsRechercheOffre } from '@tests/fixtures/domain/offre.fixture';
import { anAxiosError, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import {
  aRésultatRechercheOffreEmploiAxiosResponse,
  aRésultatRéférentielCommuneResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { NextApiRequest } from 'next';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { alternanceFiltreMapper, rechercherAlternanceHandler } from '~/pages/api/alternances';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';

describe('rechercher une alternance', () => {
  it('retourne la liste des alternances filtrée', async () => {
    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres')
      .get('/search?commune=75101&motsCles=boulanger&range=0-14&natureContrat=E2,FS')
      .reply(401, anAxiosError({ response: anAxiosResponse({}, 401) }))
      .get('/search?commune=75101&motsCles=boulanger&range=0-14&natureContrat=E2,FS')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel')
      .get('/communes')
      .reply(200, aRésultatRéférentielCommuneResponse().data);

    nock('https://entreprise.pole-emploi.fr')
      .post('/connexion/oauth2/access_token?realm=partenaire')
      .reply(200, { access_token: 'fake_access_token' });

    await testApiHandler<RésultatsRechercheOffre | ErrorHttpResponse>({
      handler: (req, res) => rechercherAlternanceHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatsRechercheOffre());
      },
      url: '/emplois?motCle=boulanger&codeLocalisation=75101&typeLocalisation=COMMUNE&page=1',
    });
  });

  it('map la request parameters to AlternanceFiltre', () => {
    const request: NextApiRequest = {
      query: {
        codeLocalisation: '75101',
        motCle: 'boulanger',
        page: '1',
        typeLocalisation: 'COMMUNE',
      },
    } as unknown as NextApiRequest;

    const result = alternanceFiltreMapper(request);

    expect(result).toEqual({
      localisation: {
        code: '75101',
        type: 'COMMUNE',
      },
      motClé: 'boulanger',
      page: 1,
    });
  });
});
