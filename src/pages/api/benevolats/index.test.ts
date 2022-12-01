import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherMissionHandler } from '~/pages/api/benevolats/index.controller';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';
import { aSearchMissionEngagementResponse } from '~/server/engagement/infra/repositories/apiEngagement.response.fixture';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { anAxiosResponse } from '~/server/services/http/httpClientService.fixture';

describe('rechercher une mission de bénévolat', () => {
  it('retourne la liste des missions filtrées', async () => {
    nock('https://api.api-engagement.beta.gouv.fr/v0')
      .get('/mission/search?publisher=5f5931496c7ea514150a818f&size=15&from=0')
      .reply(200, anAxiosResponse(aSearchMissionEngagementResponse()).data);

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
