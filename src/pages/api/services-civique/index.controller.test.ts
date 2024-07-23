import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import {
	missionServiceCiviqueQuerySchema,
	rechercherMissionHandler,
} from '~/pages/api/services-civique/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';
import {
	aSearchMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response.fixture';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

describe('rechercher une mission du service civique', () => {
	it('retourne la liste des missions filtrées', async () => {
		nock('https://api.api-engagement.beta.gouv.fr/v0')
			.get('/mission/search?distance=10km&domain=culture-loisirs&from=0&lat=48.841959&lon=2.295289&publisher=5f99dbe75eb1ad767733b206&size=15')
			.reply(200, anAxiosResponse(aSearchMissionEngagementResponse()).data);

		await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
			pagesHandler: (req, res) => rechercherMissionHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aRésultatRechercheMission());
			},
			url: 'services-civique?domain=culture-loisirs&codeCommune=75115&latitudeCommune=48.841959&longitudeCommune=2.295289&distanceCommune=10&page=1',
		});
	});

	describe('quand le schema des paramètres de l’url n‘est pas respecté', () => {
		it('retourne directement une erreur', async () => {
			await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
				pagesHandler: (req, res) => withValidation({ query: missionServiceCiviqueQuerySchema }, rechercherMissionHandler)(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(res.status).toEqual(400);
					expect(json).toEqual({ error: 'les paramètres dans l‘url ne respectent pas le schema de validation' });
				},
				url: 'services-civique?page=-1',
			});
		});
	});
});
