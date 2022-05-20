import { aRésultatRéférentielDomaine } from '@tests/fixtures/domain/offreEmploi.fixture';
import { aServeurIndisponibleError } from '@tests/fixtures/server/errors/errorResponse.fixture';
import { aRéférentielDomainesResponse } from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { consulterRéférentielDomainesHandler } from '~/pages/api/referentiel';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';


describe('récupérer le référentiel domaine', () => {
  it('retourne la liste des domaines', async () => {
    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/referentiel/domaines')
      .reply(200, aRéférentielDomainesResponse().data);

    await testApiHandler<RéférentielDomaine[] | ErrorHttpResponse>({
      handler: (req, res) => consulterRéférentielDomainesHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatRéférentielDomaine());
      },
      url: '/referentiel',
    });
  });

  it('retourne une erreur 500 quand le service est indisponible', async () => {
    nock('https://api.emploi-store.fr')
      .get('/partenaire/offresdemploi/v2/referentiel/domaines')
      .reply(500, aServeurIndisponibleError());

    await testApiHandler<RéférentielDomaine[] | ErrorHttpResponse>({
      handler: (req, res) => consulterRéférentielDomainesHandler(req, res),
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
