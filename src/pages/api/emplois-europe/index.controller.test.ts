import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherEmploiEuropeHandler } from '~/pages/api/emplois-europe/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import {
	anEmploiEurope,
	aResultatRechercheEmploiEuropeList,
} from '~/server/emplois-europe/domain/emploiEurope.fixture';
import {
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import {
	anApiEuresEmploiEuropeDetailItem,
	anApiEuresEmploiEuropeDetailJobVacancy, anApiEuresEmploiEuropeDetailResponse,
	anApiEuresEmploiEuropeDetailXMLResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';

describe('rechercher emplois en Europe', () => {
	it('retourne une liste d’emplois', async () => {
		const searchResult: ApiEuresEmploiEuropeRechercheResponse = {
			data: {
				dataSetInfo: {
					totalMatchingCount: 2,
				},
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
		};

		const detailResult: ApiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse();

		const expected: ResultatRechercheEmploiEurope = aResultatRechercheEmploiEuropeList();

		nock('https://webgate.acceptance.ec.europa.eu/eures-api/output/api/v1/jv/').post(
			'/search',
			{
				dataSetRequest: {
					excludedDataSources:  [ { dataSourceId : 29 }, { dataSourceId : 81 }, { dataSourceId : 781 } ],
					pageNumber: '1',
					resultsPerPage: '15',
					sortBy: 'BEST_MATCH',
				},
				searchCriteria: {
					facetCriteria: [],
				},
			},
		).reply(200, searchResult);

		nock('https://webgate.acceptance.ec.europa.eu/eures-api/output/api/v1/jv/').post(
			'/get',
			{
				handle: ['1', '2'],
				view: 'FULL_NO_ATTACHMENT',
			},
		).reply(200, detailResult);

		await testApiHandler<Array<ResultatRechercheEmploiEurope> | ErrorHttpResponse>({
			handler: (req, res) => rechercherEmploiEuropeHandler(req, res),
			params: {
				page: '1',
			},
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(expected);
			},
			url: '/emplois-europe',
		});
	});
});
