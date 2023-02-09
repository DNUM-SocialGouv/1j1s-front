import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherAlternanceHandler } from '~/pages/api/alternances/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Alternance } from '~/server/alternances/domain/alternance';
import { aRésultatRechercheAlternance } from '~/server/alternances/domain/alternance.fixture';
import {
	aListeLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';

describe('rechercher alternance', () => {
	it("retourne une liste d'alternance", async () => {
		const query = 'D123,D122';
		const caller = '1jeune1solution';
		const sources = 'matcha';

		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs?caller=${caller}&romes=${query}&sources=${sources}`,
		).reply(200, aListeLaBonneAlternanceApiResponse());

		await testApiHandler<Array<Alternance> | ErrorHttpResponse>({
			handler: (req, res) => rechercherAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aRésultatRechercheAlternance());
			},
			url: '/alternances?codeRomes=D123,D122',
		});
	});
});
