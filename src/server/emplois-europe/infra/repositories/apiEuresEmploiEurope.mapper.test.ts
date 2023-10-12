import { mapRechercheEmploiEurope } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import {
	anApiEuresEmploiEuropeRechercheDetailResponse,
} from '~/server/emplois-europe/infra/repositories/fixtureEmploiEurope.repository';

describe('mapRechercheEmploiEurope', () => {
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

		// When
		const resultatRechercheEmploiEurope = mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

		// Then
		expect(resultatRechercheEmploiEurope).toEqual({
			nombreResultats: 2,
			offreList: [
				{
					id: '1',
					nomEntreprise: 'La Boulangerie',
					titre: 'Boulanger (H/F)',
				},
				{
					id: '2',
					nomEntreprise: undefined,
					titre: undefined,
				},
			],
		});
	});
});
