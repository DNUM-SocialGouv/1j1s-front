import { mapRechercheEmploiEurope } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';

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

		// When
		const resultatRechercheEmploiEurope = mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse);

		// Then
		expect(resultatRechercheEmploiEurope).toEqual({
			nombreResultats: 2,
			offreList: [
				{
					id: '1',
				},
				{
					id: '2',
				},
			],
		});
	});
});
