import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherEmploiEuropeHandler } from '~/pages/api/emplois-europe/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { aResultatRechercheEmploiEuropeList } from '~/server/emplois-europe/domain/emploiEurope.fixture';
import {
	aResultatRechercheApiEuresEmploiEurope,
} from '~/server/emplois-europe/infra/repositories/fixtureEmploiEurope.repository';

describe('rechercher emplois en Europe', () => {
	it('retourne une liste d’emplois', async () => {
		const result = aResultatRechercheApiEuresEmploiEurope({
			data: {
				items: [
					{
						header: {
							handle: '1',
						},
					},
					{
						header: {
							handle: '2',
						},
					},
				],
			},
		});
		nock('https://webgate.acceptance.ec.europa.eu/eures-api/output/api/v1/jv/').post(
			'/search',
			{
				dataSetRequest: {
					excludedDataSources:  [ { dataSourceId : 29 }, { dataSourceId : 81 }, { dataSourceId : 781 } ],
					pageNumber: '1',
					resultsPerPage: '40',
					sortBy: 'BEST_MATCH',
				},
				searchCriteria: {
					facetCriteria: [
						{ facetName: 'LOCATION', facetValues: ['NL'] },
						{ facetName: 'EXPERIENCE', facetValues: ['A', 'B'] },
						{ facetName: 'POSITION_OFFERING', facetValues: ['apprenticeship','contracttohire','directhire','seasonal','selfemployed','temporary'] },
					],
				},
			},
		).reply(200, result);

		await testApiHandler<Array<ResultatRechercheEmploiEurope> | ErrorHttpResponse>({
			handler: (req, res) => rechercherEmploiEuropeHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aResultatRechercheEmploiEuropeList());
			},
			url: '/europe',
		});
	});
});
