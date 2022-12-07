import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherMissionHandler } from '~/pages/api/services-civique/index.controller';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';
import { aSearchMissionEngagementResponse } from '~/server/engagement/infra/repositories/apiEngagement.response.fixture';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { anAxiosResponse } from '~/server/services/http/httpClientService.fixture';

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

  describe('quand le schema des paramètres n‘est pas respecté', () => {
    it('retourne directement une erreur', async () => {
      await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
        handler: (req, res) => rechercherMissionHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          expect(res.status).toEqual(503);
          expect(json).toEqual({ error: 'SERVICE_INDISPONIBLE' });
        },
        url: 'services-civique?page=-1',
      });
    });
  });
});
