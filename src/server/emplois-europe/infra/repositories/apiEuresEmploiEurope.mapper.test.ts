import {
	anEmploiEurope,
	aResultatRechercheEmploiEuropeList,
} from '~/server/emplois-europe/domain/emploiEurope.fixture';
import {
	anApiEuresEmploiEuropeDetailItem,
	anApiEuresEmploiEuropeDetailJobVacancy,
	anApiEuresEmploiEuropeDetailRelated,
	anApiEuresEmploiEuropeDetailResponse,
	anApiEuresEmploiEuropeDetailXMLResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { FastXmlParserService } from '~/server/services/xml/fastXmlParser.service';

describe('apiEuresEmploiEuropeMapper', () => {
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

			const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse();

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual(aResultatRechercheEmploiEuropeList({
				nombreResultats: 2,
				offreList: [
					anEmploiEurope({
						id: '1',
						nomEntreprise: 'La Boulangerie',
						pays: 'France',
						titre: 'Boulanger (H/F)',
						ville: 'Paris',
					}),
					anEmploiEurope({
						id: '2',
						nomEntreprise: undefined,
						pays: undefined,
						titre: undefined,
						urlCandidature: 'https://urlDeCandidature2.com',
						ville: undefined,
					}),
				],
			}));
		});

		describe('lorsqu’un pays et une ville sont renseignés', () => {
			it('retourne un ResultatRechercheEmploiEurope contenant la ville et le pays', () => {
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

				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([
					anApiEuresEmploiEuropeDetailItem({
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
								'Boulanger (H/F)',
								'La Boulangerie',
								'FR',
								'Paris',
							),
						}),
					}),
				]);

				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// When
				const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

				// Then
				expect(resultatRechercheEmploiEurope).toEqual(aResultatRechercheEmploiEuropeList({
					nombreResultats: 1,
					offreList: [
						anEmploiEurope({
							id: '1',
							nomEntreprise: 'La Boulangerie',
							pays: 'France',
							titre: 'Boulanger (H/F)',
							ville: 'Paris',
						}),
					],
				}));
			});
		});

		describe('lorsque seulement un pays est renseigné', () => {
			it('retourne un ResultatRechercheEmploiEurope contenant le pays', () => {
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

				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse(
					[
						anApiEuresEmploiEuropeDetailItem({
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
									'Boulanger (H/F)',
									'La Boulangerie',
									'FR',
								),
							}),
						}),
					]);

				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// When
				const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

				// Then
				expect(resultatRechercheEmploiEurope).toEqual(aResultatRechercheEmploiEuropeList({
					nombreResultats: 1,
					offreList: [
						anEmploiEurope({
							id: '1',
							nomEntreprise: 'La Boulangerie',
							pays: 'France',
							titre: 'Boulanger (H/F)',
						}),
					],
				}));
			});
		});

		describe('lorsque seulement une ville est renseignée', () => {
			it('retourne un ResultatRechercheEmploiEurope contenant la ville', () => {
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

				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse(
					[
						anApiEuresEmploiEuropeDetailItem({
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
									'Boulanger (H/F)',
									'La Boulangerie',
									undefined,
									'Paris',
								),
							}),
						}),
					]);

				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// When
				const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

				// Then
				expect(resultatRechercheEmploiEurope).toEqual(aResultatRechercheEmploiEuropeList({
					nombreResultats: 1,
					offreList: [
						anEmploiEurope({
							id: '1',
							nomEntreprise: 'La Boulangerie',
							titre: 'Boulanger (H/F)',
							ville: 'Paris',
						}),
					],
				}));
			});
		});
	});
	describe('mapDetailOffre', () => {
		it('retourne un EmploiEurope', () => {
			// Given
			const handle = '1';
			const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse(
				[
					anApiEuresEmploiEuropeDetailItem({
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse('Boulanger (H/F)', 'La Boulangerie', 'FR', 'Paris'),
						}),
						related: anApiEuresEmploiEuropeDetailRelated({
							urls: [{
								urlValue: 'https://urlDeCandidature.com',
							}],
						}),
					}),
				]);

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual(anEmploiEurope({
				id: '1',
				nomEntreprise: 'La Boulangerie',
				pays: 'France',
				titre: 'Boulanger (H/F)',
				urlCandidature: 'https://urlDeCandidature.com',
				ville: 'Paris',
			}));
		});
	});
});
