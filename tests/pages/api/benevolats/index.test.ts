import { aRésultatRechercheMission } from '@tests/fixtures/domain/missionEngagement.fixture';
import { aRésultatRechercheMissionAxiosResponse } from '@tests/fixtures/services/engagementHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherMissionHandler } from '~/pages/api/benevolats';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('rechercher une mission de bénévolat', () => {
  it('retourne la liste des missions filtrées', async () => {
    nock('https://api.api-engagement.beta.gouv.fr/v0')
      .get('/mission/search?publisher=5f5931496c7ea514150a818f&size=15&from=0')
      .reply(200, aRésultatRechercheMissionAxiosResponse().data);

    await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
      handler: (req, res) => rechercherMissionHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatRechercheMission());
      },
      url: 'benevolats?page=1',
    });
  });
});
