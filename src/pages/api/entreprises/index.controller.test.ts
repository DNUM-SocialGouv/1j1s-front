import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	anEntreprise,
	anEntrepriseMember,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { enregistrerEntreprisesHandler } from '~/pages/api/entreprises/index.controller';
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

	// TODO (SULI 06-12-2023): ajouter le test de la validation par schema JOi maintenant que le usecase ne se charge plus de ça

	/*
	* describe('quand le téléphone n‘est pas valide', () => {
			it('résous une erreur DEMANDE_INCORRECTE', async () => {
				// Given
				const commandeInvalide = {
					...commande,
					téléphone: 'coucou',
				};
				// When
				const actual = await usecase.rejoindreLaMobilisation(commandeInvalide);
				// Then
				expect(actual).toEqual(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
			});
		});
		const invalidFields = [
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
		];
		for (const invalid of invalidFields) {
			describe(`mais avec ${JSON.stringify(invalid)}`, () => {
				it('résout une Failure', async () => {
					// Given
					const commandeInvalide = { ...commande, ...invalid };
					// When
					const actual = await usecase.rejoindreLaMobilisation(commandeInvalide);
					// Then
					expect(actual).toEqual(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				});
			});
		}
	* */
});
