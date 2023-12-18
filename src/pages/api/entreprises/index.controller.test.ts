import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	anEntreprise,
	anEntrepriseMember,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import entreprisesHandler, { enregistrerEntreprisesHandler } from '~/pages/api/entreprises/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';

describe('enregistrerEntreprisesHandler', () => {
	afterEach(() => nock.cleanAll());

	it('répond une 200 quand tout s’est bien passé', async () => {
		let strapiReceivedBody: Record<string, string>;
		const leeApi = nock('https://staging.lesentreprises-sengagent.local')
			.post('/api/members', (body) => {
				strapiReceivedBody = body;
				return true;
			})
			.reply(201);

		await testApiHandler<void | ErrorHttpResponse>({
			handler: (req, res) => enregistrerEntreprisesHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({
					body: JSON.stringify(anEntreprise()),
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
				});
				expect(res.status).toEqual(200);
				expect(strapiReceivedBody).toEqual(anEntrepriseMember());
				leeApi.done();
			},
			url: '/entreprises',
		});
	});

	describe('Quand les paramètres de l‘url respectent le schema de validation', () => {
	  it.each([
		  { téléphone: 'RTYHFYUIJN' },
		  { téléphone: '555-2341-111' },
		  { email: 'toto chez msn' },
		  { email: '' },
		  { nomSociété: '' },
		  { siret: '' },
		  { siret: 'coucou bonjour' },
		  { siret: '3456765' },
		  { codePostal: '' },
		  { codePostal: 'bonjour' },
		  { codePostal: '27B' },
		  { codePostal: '123456' },
		  { codePostal: '97000' },
		  { codePostal: '97700' },
		  { secteur: 'pas un secteur' },
		  { secteur: '' },
		  { taille: '8' },
		  { taille: '' },
		  { ville: '' },
		  { prénom: '' },
		  { nom: '' },
		  { travail: '' },
	  ])('l’url contenant le paramètre %j est invalide', async (queryParametersToTestInError) => {
		  await testApiHandler<void | ErrorHttpResponse>({
			  handler: (req, res) => entreprisesHandler(req, res),
			  test: async ({ fetch }) => {
				  const res = await fetch({
					  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
					  // @ts-expect-error
					  body: JSON.stringify(anEntreprise(queryParametersToTestInError)),
					  headers: {
						  'content-type': 'application/json',
					  },
					  method: 'POST',
				  });
				  expect(res.status).toEqual(400);
			  },
			  url: '/entreprises',
		  });
	  });
	});
});
