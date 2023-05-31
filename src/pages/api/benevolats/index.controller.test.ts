import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { missionBenevolatQuerySchema, rechercherMissionHandler } from '~/pages/api/benevolats/index.controller';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';
import { aSearchMissionEngagementResponse } from '~/server/engagement/infra/repositories/apiEngagement.response.fixture';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

describe('rechercher une mission de bénévolat', () => {
	it('retourne la liste des missions filtrées', async () => {
		nock('https://api.api-engagement.beta.gouv.fr/v0')
			.get('/mission/search?distance=10km&domain=culture-loisirs&from=0&lat=48.841959&lon=2.295289&publisher=5f5931496c7ea514150a818f&size=15')
			.reply(200, anAxiosResponse(aSearchMissionEngagementResponse()).data);

		await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
			handler: (req, res) => rechercherMissionHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aRésultatRechercheMission());
			},
			url: 'benevolat?domain=culture-loisirs&libelleCommune=Paris%2015e%20Arrondissement%20(75015)&codeCommune=75115&latitudeCommune=48.841959&longitudeCommune=2.295289&distanceCommune=10&page=1',
		});
	});

	describe('quand le schema des paramètres n‘est pas respecté', () => {
		it('retourne directement une erreur', async () => {
			await testApiHandler<RésultatsRechercheMission | ErrorHttpResponse>({
				handler: (req, res) => withValidation({ query: missionBenevolatQuerySchema }, rechercherMissionHandler)(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(res.status).toEqual(400);
					expect(json).toEqual({ error: 'les paramètres dans l‘url ne respectent pas le schema de validation' });
				},
				url: 'benevolats?page=-1',
			});
		});
	});
});
