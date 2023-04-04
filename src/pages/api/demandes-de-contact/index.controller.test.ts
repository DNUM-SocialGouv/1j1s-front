import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { enregistrerDemandeDeContactHandler } from '~/pages/api/demandes-de-contact/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';

describe('enregistrerDemandeDeContactHandler', () => {
	const jwt = '3456789098765RFVBGFDRTYHJNfKJHGV';
	const identifier = '1j1s@gouv.fr'; // défini dans le fichier .env.test
	const password = 'monmotdepassesécurisé'; // défini dans le fichier .env.test
	afterEach(() => nock.cleanAll());

	describe('quand le type de demande de contact est CEJ', () => {
		it('répond une 200 quand tout s’est bien passé', async () => {
			let strapiReceivedBody: Record<string, string>;
			const strapiAuth = nock('http://localhost:1337/api')
				.post('/contact-cejs')
				.once()
				.reply(401, 'unauthorized')
				.post('/auth/local', { identifier, password })
				.once()
				.reply(200, { jwt });
			const strapiApi = nock('http://localhost:1337/api', { reqheaders: { Authorization: `Bearer ${jwt}` } })
				.post('/contact-cejs', (body) => {
					strapiReceivedBody = body;
					return true;
				})
				.once()
				.reply(201);

			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify({
							age: 18,
							codePostal: '95000',
							email: 'toto@msn.fr',
							nom: 'Mc Totface',
							prénom: 'Toto',
							type: 'CEJ',
							téléphone: '0678954322',
							ville: 'Cergy',
						}),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});
					expect(res.status).toEqual(200);
					expect(strapiReceivedBody).toEqual({
						data: {
							age: 18,
							code_postal: '95000',
							email: 'toto@msn.fr',
							nom: 'Mc Totface',
							prenom: 'Toto',
							telephone: '+33678954322',
							ville: 'Cergy',
						},
					});
					strapiAuth.done();
					strapiApi.done();
				},
				url: '/demandes-de-contact',
			});
		});
	});

	describe('quand le type de demande de contact est incorrecte', () => {
		it('répond une 400 quand DEMANDE_INCORRECTE', async () => {
			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => enregistrerDemandeDeContactHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify({
							email: 'toto@msn.fr',
							message: 'rrr',
							nom: 'Mc Totface',
							prénom: 'Toto',
							sujet: 'super sujet',
							type: 'wrong type',
							téléphone: '0678954322',
						}),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});
					expect(res.status).toEqual(400);
				},
				url: '/demandes-de-contact',
			});
		});
	});
});
