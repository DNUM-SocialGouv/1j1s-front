import { aRésultatsRechercheAlternance } from '@tests/fixtures/domain/alternance.fixture';
import { anAlternanceListResponse } from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherAlternanceHandler } from '~/pages/api/alternances';
import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('rechercher une alternance', () => {
  it('retourne la liste des alternances filtrée', async () => {
    nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/V1/')
      .get('/jobs?insee=75101&romes=D1103%2CD1101%2CH2101&longitude=2&latitude=48&radius=30&caller=1jeune1solution')
      .reply(200, anAlternanceListResponse().data);


    await testApiHandler<RésultatsRechercheAlternance | ErrorHttpResponse>({
      handler: (req, res) => rechercherAlternanceHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatsRechercheAlternance());
      },
      url: '/alternances?codeCommune=75101&codeRomes=D1103,D1101,H2101&radius=30&longitudeCommune=2&latitudeCommune=48',
    });
  });
});
