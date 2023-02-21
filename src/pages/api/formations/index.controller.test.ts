import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherFormationHandler } from '~/pages/api/formations/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Formation } from '~/server/formations/domain/formation';
import { aRésultatFormation } from '~/server/formations/domain/formation.fixture';
import {
	aLaBonneAlternanceApiFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';

describe('rechercher formation', () => {
	it('retournes une liste de formations', async () => {
		const codeRomes = 'F1603,I1308';
		const caller = '1jeune1solution';

		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/formations?caller=${caller}&romes=${codeRomes}`,
		).reply(200, aLaBonneAlternanceApiFormationResponse());

		await testApiHandler<Array<Formation> | ErrorHttpResponse>({
			handler: (req, res) => rechercherFormationHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aRésultatFormation());
			},
			url: '/formations?codeRomes=F1603,I1308&libelleMetier=Paris',
		});
	});
});
