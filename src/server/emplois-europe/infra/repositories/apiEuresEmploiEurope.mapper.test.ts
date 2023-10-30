import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import {
	anApiEuresEmploiEuropeRechercheDetailResponse, aResultatRechercheDetailXMLApiEuresEmploiEurope,
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
					tags: [],
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

	describe('lorsqu’un pays et une ville sont renseignés', () => {
		it('retourne un ResultatRechercheEmploiEurope avec un tag contenant la ville et le pays', () => {
			// Given
			const apiEuresEmploiEuropeRechercheResponse = {
				data: {
					dataSetInfo: {
						totalMatchingCount: 1,
					},
					items: [
						{
							header: {
								handle: '1',
							},
						},
					],
				},
			};

			const apiEuresEmploiEuropeDetailResponse = {
				data: {
					items: [
						{
							jobVacancy: {
								header: {
									handle: '1',
								},
								hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope(
									'Boulanger (H/F)',
									'La Boulangerie',
									'FR',
									'Paris',
								),
							},
						},
					],
				},
			};

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual({
				nombreResultats: 1,
				offreList: [
					{
						id: '1',
						nomEntreprise: 'La Boulangerie',
						tags: ['France/Paris'],
						titre: 'Boulanger (H/F)',
					},
				],
			});
		});
	});

	describe('lorsque seulement un  pays est renseigné', () => {
		it('retourne un ResultatRechercheEmploiEurope avec un tag contenant le pays', () => {
			// Given
			const apiEuresEmploiEuropeRechercheResponse = {
				data: {
					dataSetInfo: {
						totalMatchingCount: 1,
					},
					items: [
						{
							header: {
								handle: '1',
							},
						},
					],
				},
			};

			const apiEuresEmploiEuropeDetailResponse = {
				data: {
					items: [
						{
							jobVacancy: {
								header: {
									handle: '1',
								},
								hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope(
									'Boulanger (H/F)',
									'La Boulangerie',
									'FR',
								),
							},
						},
					],
				},
			};

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual({
				nombreResultats: 1,
				offreList: [
					{
						id: '1',
						nomEntreprise: 'La Boulangerie',
						tags: ['France'],
						titre: 'Boulanger (H/F)',
					},
				],
			});
		});
	});

	describe('lorsque seulement une ville est renseignée', () => {
		it('retourne un ResultatRechercheEmploiEurope avec un tag contenant la ville', () => {
			// Given
			const apiEuresEmploiEuropeRechercheResponse = {
				data: {
					dataSetInfo: {
						totalMatchingCount: 1,
					},
					items: [
						{
							header: {
								handle: '1',
							},
						},
					],
				},
			};

			const apiEuresEmploiEuropeDetailResponse = {
				data: {
					items: [
						{
							jobVacancy: {
								header: {
									handle: '1',
								},
								hrxml: aResultatRechercheDetailXMLApiEuresEmploiEurope(
									'Boulanger (H/F)',
									'La Boulangerie',
									undefined,
									'Paris',
								),
							},
						},
					],
				},
			};

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual({
				nombreResultats: 1,
				offreList: [
					{
						id: '1',
						nomEntreprise: 'La Boulangerie',
						tags: ['Paris'],
						titre: 'Boulanger (H/F)',
					},
				],
			});
		});
	});
});
