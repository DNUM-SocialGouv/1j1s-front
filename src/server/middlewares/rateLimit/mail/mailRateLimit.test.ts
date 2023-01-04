import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	envoyerDemandeContactAccompagnementHandler,
} from '~/pages/api/etablissements-accompagnement/contact/index.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { Mail } from '~/server/mail/domain/mail';
import { aTipimailRequest } from '~/server/mail/infra/repositories/tipimail.fixture';

describe('rechercher une offre d‘emploi', () => {
	describe('Quand l‘utilisateur envoie trop de requêtes', () => {
		it('retourne une erreur TOO_MANY_REQUESTS', async () => {
			let tipimailDemandeDeContact: Mail;
			const expectedBody = aTipimailRequest();
			
			for (let i = 0; i < Number(process.env.RATE_LIMIT_REQUESTS_NUMBER); i++) {
				nock('https://api.tipimail.com/v1')
					.post('/messages/send', (body) => { tipimailDemandeDeContact = body; return true; })
					.reply(200);

				nock('https://api.tipimail.com/v1')
					.post('/messages/send', (body) => { tipimailDemandeDeContact = body; return true; })
					.reply(200);

				await testApiHandler<void | ErrorHttpResponse>({
					handler: (req, res) => envoyerDemandeContactAccompagnementHandler(req, res),
					test: async ({ fetch }) => {
						const res = await fetch({
							body: JSON.stringify({
								age: '23',
								commentaire: 'Merci de me recontacter',
								commune: 'Paris (75006)',
								email: 'john.doe@email.com',
								nom: 'Doe',
								prénom: 'John',
								téléphone: '0606060606',
								établissement: {
									email: 'email@email.com',
									nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
									type: 'mission_locale',
								},
							}),
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
						});

						expect(res.status).toEqual(200);
						expect(tipimailDemandeDeContact).toEqual(expectedBody);
					},
					url: '/etablissements-accompagnement/contact',
				});
			}
			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => envoyerDemandeContactAccompagnementHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify({
							age: '23',
							codeCommune: '75056',
							commentaire: 'Merci de me recontacter',
							email: 'john.doe@email.com',
							nom: 'Doe',
							nomCommune: 'Paris',
							prénom: 'John',
							téléphone: '0606060606',
							établissement: {
								email: 'email@email.com',
								nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
								type: 'mission_locale',
							},
						}),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});

					expect(res.status).toEqual(429);
					const json = await res.json() as ErrorHttpResponse;
					expect(json.error).toEqual('TOO_MANY_REQUESTS');
				},
				url: '/etablissements-accompagnement/contact',
			});
		});
	});
});
