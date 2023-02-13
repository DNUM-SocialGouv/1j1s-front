import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { récupererSuggestionsMétiersAlternanceHandler } from '~/pages/api/alternances/metiers/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';
import { aListeDeMetierLaBonneAlternance } from '~/server/alternances/domain/alternance.fixture';


describe('recupérer les métiers correspondant à la recherche', () => {
	it('retourne les métiers recherchés', async () => {
		const recherche = 'boulang';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/metiers?title=${recherche}`,
		).reply(200, aMetierLaBonneAlternanceApiResponse());

		await testApiHandler<MetierAlternance[] | ErrorHttpResponse>({
			handler: (req, res) => récupererSuggestionsMétiersAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aListeDeMetierLaBonneAlternance());
			},
			url: `/alternances/metier?motCle=${recherche}`,
		});
	});
});
