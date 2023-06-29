import { NextApiRequest } from 'next';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	formationInitialeFiltreMapper,
	rechercherFormationInitialeHandler,
} from '~/pages/api/formations-initiales/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { aFormationInitiale } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/formationInitialeResponse.fixture';

describe('lorsque je veux faire une recherche de formations initiales', () => {
	it('en recette, doit récupérer des formations initiales en mode non authentifié', async () => {
		// GIVEN
		const motCle = 'informatique';
		const apiBaseUrl = 'https://api.opendata.onisep.fr/api/1.0';
		const apiSearchUrl = `${apiBaseUrl}/dataset/5fa591127f501`;
		const searchFormationInitialeCall = nock(apiSearchUrl)
			.get(`/search?q=${motCle}`)
			.reply(200, aResultatRechercheFormationInitialeApiResponse);

		// WHEN
		await testApiHandler<Array<FormationInitiale> | ErrorHttpResponse>({
			handler: (req, res) => rechercherFormationInitialeHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				// THEN
				expect(searchFormationInitialeCall.isDone()).toBe(true);
				expect(json).toEqual([aFormationInitiale()]);
			},
			url: `/formations-initiales?motCle=${motCle}`,
		});
	});

	it('map les params de la requete vers un filtre de formation initiale', () => {
		const request: NextApiRequest = {
			query: {
				motCle: 'informatique',
			},
		} as unknown as NextApiRequest;

		const result = formationInitialeFiltreMapper(request);

		expect(result).toEqual({
			motCle: 'informatique',
		});
	});
});
