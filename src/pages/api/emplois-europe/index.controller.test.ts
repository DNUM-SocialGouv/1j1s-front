import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherEmploiEuropeHandler } from '~/pages/api/emplois-europe/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import {
	aResultatRechercheApiEuresEmploiEurope,
	aResultatRechercheDetailApiEuresEmploiEurope,
	aResultatRechercheDetailXMLApiEuresEmploiEurope,
} from '~/server/emplois-europe/infra/repositories/fixtureEmploiEurope.repository';

describe('rechercher emplois en Europe', () => {
	it('retourne une liste d’emplois', async () => {
		const searchResult = aResultatRechercheApiEuresEmploiEurope({
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
		});

		const detailResult = aResultatRechercheDetailApiEuresEmploiEurope({
			data: {
				items: [
					{
						jobVacancy: {
							header: {
								handle: '1',
							},
							hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Boulanger (H/F)', 'La Boulangerie'),
						},
					},
					{
						jobVacancy: {
							header: {
								handle: '2',
							},
							hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope('Pâtissier (H/F)', 'La Pâtisserie'),
						},
					},
				],
			},
		});

		const expected: ResultatRechercheEmploiEurope = {
			nombreResultats: 2,
			offreList: [
				{
					id: '1',
					nomEntreprise: 'La Boulangerie',
					titre: 'Boulanger (H/F)',
				},
				{
					id: '2',
					nomEntreprise: 'La Pâtisserie',
					titre: 'Pâtissier (H/F)',
				},
			],
		};

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
			url: '/europe',
		});
	});
});
