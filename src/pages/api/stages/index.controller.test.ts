import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { anOffreDeStageFormulaire } from '~/client/services/stage/stageService.fixture';
import { enregistrerOffreDeStageBodySchema,enregistrerOffreDeStageHandler  } from '~/pages/api/stages/index.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { anOffreDeStageDepot } from '~/server/cms/domain/offreDeStage.fixture';


describe('enregistrer une offre de stage', () => {
	const jwt = '3456789098765RFVBGFDRTYHJNfKJHGV';
	const identifier = '1j1s@gouv.fr'; // défini dans le fichier .env.test
	const password = 'monmotdepassesécurisé'; // défini dans le fichier .env.test

	describe('lorsque le body est valide', () => {
		it('retourne 200', async () => {
			let strapiReceivedBody: Record<string, string>;

			const strapiAuth = nock('http://localhost:1337/api')
				.post('/stages')
				.once()
				.reply(401, 'unauthorized')
				.post('/auth/local', { identifier, password })
				.once()
				.reply(200, { jwt });
			const strapiApi = nock('http://localhost:1337/api', { reqheaders: { Authorization: `Bearer ${jwt}` } })
				.post('/stages', (body) => {
					strapiReceivedBody = body;
					return true;
				})
				.once()
				.reply(201);

			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => enregistrerOffreDeStageHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch(anOffreDeStageFormulaire());
					expect(res.status).toEqual(201);
					expect(strapiReceivedBody).toEqual(anOffreDeStageDepot());
					strapiAuth.done();
					strapiApi.done();
				},
				url: '/stages',
			});
		});
	});
	
	describe('lorsque le body est invalide', () => {
		it('retourne 400', () => {

			const body ={

			};
			const result = enregistrerOffreDeStageBodySchema.validate(body);

			expect(result.error?.name).toEqual('ValidationError');
			expect(result.error?.message).toEqual('"établissement.type" must be one of [cij, mission_locale, pole_emploi]');
		});
	});
});
