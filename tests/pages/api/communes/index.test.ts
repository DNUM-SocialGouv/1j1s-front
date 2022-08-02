
import { aRechercheAdresseResponse } from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherCommuneHandler } from '~/pages/api/communes';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';

describe('rechercherCommuneHandler', () => {
  describe('quand l\'api répond avec une 200', () => {
    it('retourne la liste des communes en fonction du paramètre de recherche', async() => {
      nock('https://api-adresse.data.gouv.fr/')
        .get('/search/?type=municipality&q=paris&limit=21')
        .reply(200, aRechercheAdresseResponse().data);

      await testApiHandler<RésultatsRechercheCommune | ErrorHttpResponse>({
        handler: (req, res) => rechercherCommuneHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          expect(json).toEqual({
            résultats: [
              {
                code: '93005',
                coordonnées: {
                  latitude: 48.926541,
                  longitude: 2.493832,
                },
                libelle: '20 Avenue Jules Jouy 93600 Aulnay-sous-Bois (93600)',
                ville: 'Aulnay-sous-Bois',
              },
              {
                code: '28201',
                coordonnées: {
                  latitude: 48.510887,
                  longitude: 1.553914,
                },
                libelle: '20 Avenue de la Gare 28300 Jouy (28300)',
                ville: 'Jouy',
              },
            ],
          });
        },
        url: '/communes?q=paris',
      });
    });
  });
});



