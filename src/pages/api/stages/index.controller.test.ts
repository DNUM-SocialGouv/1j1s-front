import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { anEmployeurDepotStage, anOffreDeStageDepot } from '~/client/services/stage/stageService.fixture';
import depotOffreDeStageController from '~/pages/api/stages/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { OffreStageDepot } from '~/server/stages/domain/stages';
import { aStrapiOffreDeStageDepot } from '~/server/stages/repository/strapiStages.fixture';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;


jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('enregistrer une offre de stage', () => {
	const jwt = '3456789098765RFVBGFDRTYHJNfKJHGV';
	const identifier = '1j1s@gouv.fr'; // défini dans le fichier .env.test
	const password = 'monmotdepassesécurisé'; // défini dans le fichier .env.test

	describe('lorsque le body est valide', () => {
		it('retourne 200', async () => {
			let strapiReceivedBody: {data: OffreDeStageDepot};
			const strapiAuth = nock('http://localhost:1337/api')
				.post('/auth/local', { identifier, password })
				.once()
				.reply(200, { jwt });
			const strapiApi = nock('http://localhost:1337/api', { reqheaders: { Authorization: `Bearer ${jwt}` } })
				.post('/offres-de-stage', (body) => {
					strapiReceivedBody = body;
					return true;
				})
				.once()
				.reply(201);

			await testApiHandler<void | ErrorHttpResponse>({
				pagesHandler: (req, res) => depotOffreDeStageController(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify(anOffreDeStageDepot()),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});
					expect(res.status).toEqual(200);
					const strapiReceivedBodyData = strapiReceivedBody.data;
					expect(strapiReceivedBodyData).toEqual(aStrapiOffreDeStageDepot());
					strapiAuth.done();
					strapiApi.done();
				},
				url: '/stages',
			});
		});
	});

	describe('quand l’offre de stage n’a pas un format valide, retourne une 400', () => {
		it('le nom de l’employeur ne doit pas dépasser 255 caractères', async () => {
			const nomTresTresLong = 'Plateforme ultra haut champ 3T-7T du Centre Hospitalier Universitaire (CHU) de Poitiers. Laboratoire commun Imagerie Métabolique Multinoyaux Multiorganes (I3M), Laboratoire et Mathématiques et Applications (LMA), Centre National de la Recherche Scientifique (CNRS) UMR 7348, Université de Poitiers, France.';
			await testApiHandler<void | ErrorHttpResponse>({
				pagesHandler: (req, res) => depotOffreDeStageController(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify(anOffreDeStageDepot({ employeur: anEmployeurDepotStage({ nom: nomTresTresLong }) })),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});
					expect(res.status).toEqual(400);
				},
				url: '/stages',
			});
		});
	});
});
