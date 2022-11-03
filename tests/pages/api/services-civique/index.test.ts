import { aRésultatRechercheMission } from '@tests/fixtures/domain/missionEngagement.fixture';
import { aSearchMissionEngagementResponse } from '@tests/fixtures/server/engagement/apiEngagement.response.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherMissionHandler } from '~/pages/api/services-civique';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('rechercher une mission du service civique', () => {
  it('retourne la liste des missions filtrées', async () => {
    nock('https://api.api-engagement.beta.gouv.fr/v0')
      .get('/mission/search?publisher=5f99dbe75eb1ad767733b206&size=15&from=0')
      .reply(200, anAxiosResponse(aSearchMissionEngagementResponse()).data);

    await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
      handler: (req, res) => rechercherMissionHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual(aRésultatRechercheMission());
      },
      url: 'services-civique?page=1',
    });
  });
});
