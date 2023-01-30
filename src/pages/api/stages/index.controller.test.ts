import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { anOffreDeStageFormulaire } from '~/client/services/stage/stageService.fixture';
import { enregistrerOffreDeStageHandler  } from '~/pages/api/stages/index.controller';
import { anOffreDeStageDepot } from '~/server/cms/domain/offreDeStage.fixture';
import { OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('enregistrer une offre de stage', () => {
	const jwt = '3456789098765RFVBGFDRTYHJNfKJHGV';
	const identifier = '1j1s@gouv.fr'; // défini dans le fichier .env.test
	const password = 'monmotdepassesécurisé'; // défini dans le fichier .env.test

	describe('lorsque le body est valide', () => {
		it('retourne 200', async () => {
			let strapiReceivedBody: {data: OffreDeStageDepot};
			const strapiAuth = nock('http://localhost:1337/api')
				.post('/offre-de-stage')
				.once()
				.reply(401, 'unauthorized')
				.post('/auth/local', { identifier, password })
				.once()
				.reply(200, { jwt });
			const strapiApi = nock('http://localhost:1337/api', { reqheaders: { Authorization: `Bearer ${jwt}` } })
				.post('/offre-de-stage', (body) => {
					strapiReceivedBody = body;
					return true;
				})
				.once()
				.reply(201);

			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => enregistrerOffreDeStageHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify(anOffreDeStageFormulaire()),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});
					expect(res.status).toEqual(200);
					const strapiReceivedBodyData: OffreDeStageDepot = strapiReceivedBody.data;
					expect(strapiReceivedBodyData).toEqual(anOffreDeStageDepot());
					strapiAuth.done();
					strapiApi.done();
				},
				url: '/stages',
			});
		});
	});
});
