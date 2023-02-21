import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { récupérerMétierAlternanceHandler } from '~/pages/api/metiers/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Métier } from '~/server/metiers/domain/métier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/metiers/infra/apiLaBonneAlternanceMétier.fixture';


describe('récupérer les métiers correspondant à la recherche', () => {
	it('retourne les métiers recherchés', async () => {
		const recherche = 'boulang';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/metiers?title=${recherche}`,
		).reply(200, aMetierLaBonneAlternanceApiResponse());

		await testApiHandler<Métier[] | ErrorHttpResponse>({
			handler: (req, res) => récupérerMétierAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aListeDeMetierLaBonneAlternance());
			},
			url: `/alternances/metier?motCle=${recherche}`,
		});
	});
});
