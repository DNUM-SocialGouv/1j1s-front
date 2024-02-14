import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import entreprisesHandler, { enregistrerEntreprisesHandler } from '~/pages/api/entreprises/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { anEntrepriseSouhaitantSEngager } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager.fixture';
import {
	anApiLesEntreprisesSEngagentCompany,
} from '~/server/entreprises/infra/apiLesEntreprisesSEngagentCompany.fixture';

describe('enregistrerEntreprisesHandler', () => {
	afterEach(() => nock.cleanAll());

	it('répond une 200 quand tout s’est bien passé', async () => {
		let bodySendToLEE: Record<string, string>;
		const leeApi = nock('https://staging.lesentreprises-sengagent.local')
			.post('/api/members', (body) => {
				bodySendToLEE = body;
				return true;
			})
			.reply(201);

		await testApiHandler<void | ErrorHttpResponse>({
			pagesHandler: (req, res) => enregistrerEntreprisesHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({
					body: JSON.stringify(anEntrepriseSouhaitantSEngager()),
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
				});
				expect(res.status).toEqual(200);
				expect(bodySendToLEE).toEqual(anApiLesEntreprisesSEngagentCompany());
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
	  ])('l’url contenant le paramètre %o est invalide', async (queryParametersToTestInError) => {
		  await testApiHandler<void | ErrorHttpResponse>({
			  pagesHandler: (req, res) => entreprisesHandler(req, res),
			  test: async ({ fetch }) => {
				  const res = await fetch({
					  // @ts-expect-error
					  body: JSON.stringify(anEntrepriseSouhaitantSEngager(queryParametersToTestInError)),
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
