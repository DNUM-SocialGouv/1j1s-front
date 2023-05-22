import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { enregistrerContactPOEHandler } from '~/pages/api/contacts-poe/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';

describe('enregistrerContactPOEHandler', () => {
	const jwt = '3456789098765RFVBGFDRTYHJNfKJHGV';
	const identifier = '1j1s@gouv.fr'; // défini dans le fichier .env.test
	const password = 'monmotdepassesécurisé'; // défini dans le fichier .env.test

	describe('quand l‘appel est en succès', () => {
		it('retourne un status 200', async () => {
			let strapiReceivedBody: Record<string, string>;
			const strapiAuth = nock('http://localhost:1337/api')
				.post('/auth/local', { identifier, password })
				.once()
				.reply(200, { jwt });
			const strapiApi = nock('http://localhost:1337/api', { reqheaders: { Authorization: `Bearer ${jwt}` } })
				.post('/contacts-poe', (body) => {
					strapiReceivedBody = body;
					return true;
				})
				.once()
				.reply(201);

			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => enregistrerContactPOEHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify({
							codePostal: '95000',
							commentaire: 'Places disponibles dans 2 mois',
							email: 'toto@msn.fr',
							nom: 'Mc Totface',
							nomSociété: 'OCTO Technology',
							nombreARecruter: '5',
							prénom: 'Toto',
							secteur: 'information-communication',
							siret: '41816609600069',
							taille: 'xxlarge',
							travail: 'consultant',
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
							code_postal: '95000',
							commentaire: 'Places disponibles dans 2 mois',
							email: 'toto@msn.fr',
							nom: 'Mc Totface',
							nom_societe: 'OCTO Technology',
							nombreARecruter: '5',
							prenom: 'Toto',
							secteur: 'information-communication',
							siret: '41816609600069',
							taille: 'xxlarge',
							telephone: '+33678954322',
							travail: 'consultant',
							ville: 'Cergy',
						},
					});
					strapiAuth.done();
					strapiApi.done();
				},
				url: '/contacts-poe',
			});
		});
	});

	describe('quand l‘appel est une demande incorrecte', () => {
		it('retourne un status 400', async () => {
			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => enregistrerContactPOEHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify({
							age: 'not allowed',
							codePostal: '95000',
							commentaire: 'Places disponibles dans 2 mois',
							email: 'toto@msn.fr',
							nom: 'Mc Totface',
							nomSociété: 'OCTO Technology',
							nombreARecruter: '5',
							prénom: 'Toto',
							secteur: 'information-communication',
							siret: '41816609600069',
							taille: 'xxlarge',
							travail: 'consultant',
							téléphone: '0678954322',
							ville: 'Cergy',
						}),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});
					expect(res.status).toEqual(400);
				},
				url: '/contacts-poe',
			});
		});
	});
});
