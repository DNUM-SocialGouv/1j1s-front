import { aRechercheMétierResponse } from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { handlerRechercheMétier } from '~/pages/api/metiers/search';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

describe('rechercher un métier', () => {
  it('retourne la liste des métiers recherchées et leurs codes ROMES', async () => {
    nock('https://labonnealternance.apprentissage.beta.gouv.fr/api/V1/')
      .get('/metiers?title=bou')
      .reply(200, aRechercheMétierResponse().data);

    await testApiHandler<MétierRecherché[]>({
      handler: (req, res) => handlerRechercheMétier(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual([
          {
            codeROMEList: ['D1103', 'D1101', 'H2101'],
            intitulé: 'Boucherie, charcuterie, traiteur',
          },
          {
            codeROMEList: ['D1102', 'D1104'],
            intitulé: 'Boulangerie, pâtisserie, chocolaterie',
          },
        ]);
      },
      url: '/metiers/search?intitule=bou',
    });
  });
});
