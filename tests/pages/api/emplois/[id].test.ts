import { aBarmanOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { aBarmanOffreEmploiAxiosResponse } from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { consulterOffreEmploiHandler } from '~/pages/api/emplois/[id]';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('consulter offre emploi api controller', () => {
  it('retourne l\'offre d\'emploi', async () => {
    nock('https://api.emploi-store.fr/')
      .get('/partenaire/offresdemploi/v2/offres/132LKFB')
      .reply(200, aBarmanOffreEmploiAxiosResponse().data);

    await testApiHandler<OffreEmploi>({
      handler: (req, res) => consulterOffreEmploiHandler(req, res),
      paramsPatcher: (params) => (params.id = '132LKFB'),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aBarmanOffreEmploi());
      },
    });
  });
});
