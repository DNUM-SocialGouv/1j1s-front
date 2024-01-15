import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import rechercherMetiers3eEt2deController from '~/pages/api/stages-3e-et-2de/metiers/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';
import { aMetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de.fixture';
import {
	anApiPoleEmploiMetierStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiPoleEmploiMetierStage3eEt2de.fixture';

describe('rechercher les métiers de stage 3e et 2de', () => {
	describe('par mot clé', () => {
		it.todo('retourne les métiers filtrés par mot clé correspondants');

		describe('par appellationCodes', () => {
			it('retourne les métiers filtrés par appellationCodes correspondants', async () => {
				const appellationsApiPoleEmploi = [anApiPoleEmploiMetierStage3eEt2de({
					code: '11573',
					libelle: 'Boulanger',
				}),
				anApiPoleEmploiMetierStage3eEt2de({
					code: '11578',
					libelle: 'Apprenti boulanger',
				}),
				];
				nock('https://entreprise.pole-emploi.fr')
					.post('/connexion/oauth2/access_token?realm=partenaire')
					.reply(200, { access_token: 'fake_access_token' });
				nock('https://api.pole-emploi.io/partenaire/offresdemploi/v2/referentiel').get(
					'/appellations',
				).reply(200, appellationsApiPoleEmploi);

				const metierBoulanger = aMetierStage3eEt2de({
					code: '11573',
					label: 'Boulanger',
				});
				const metierApprentiBoulanger = aMetierStage3eEt2de({
					code: '11578',
					label: 'Apprenti boulanger',
				});
				const expected = [
					metierBoulanger,
					metierApprentiBoulanger,
				];

				await testApiHandler<MetierStage3eEt2de[] | ErrorHttpResponse>({
					handler: (req, res) => rechercherMetiers3eEt2deController(req, res),
					params: {
						appellationCodes: [metierBoulanger.code, metierApprentiBoulanger.code],
					},
					test: async ({ fetch }) => {
						const metiersStages3eEt2de = await fetch({ method: 'GET' });
						const jsonMetiersStages3eEt2de = await metiersStages3eEt2de.json();
						expect(jsonMetiersStages3eEt2de).toEqual(expected);
					},
					url: `/stages-3e-et-2de/metiers?appellationCodes=${metierBoulanger.code}&appellationCodes=${metierApprentiBoulanger.code}`,
				});
			});
		});

		it.todo('validation xor');

	});
});
