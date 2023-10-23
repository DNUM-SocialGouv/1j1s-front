import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import {
	anApiEuresEmploiEuropeRechercheDetailResponse,
} from '~/server/emplois-europe/infra/repositories/fixtureEmploiEurope.repository';
import { FastXmlParserService } from '~/server/services/xml/fastXmlParser.service';

describe('apiEuresEmploiEuropeMapper', () => {
	it('retourne un ResultatRechercheEmploiEurope', () => {
		// Given
		const apiEuresEmploiEuropeRechercheResponse = {
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

		const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeRechercheDetailResponse();
		
		const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

		// When
		const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

		// Then
		expect(resultatRechercheEmploiEurope).toEqual({
			nombreResultats: 2,
			offreList: [
				{
					id: '1',
					nomEntreprise: 'La Boulangerie',
					tags: ['Paris'],
					titre: 'Boulanger (H/F)',
				},
				{
					id: '2',
					nomEntreprise: undefined,
					tags: [],
					titre: undefined,
				},
			],
		});
	});
});
