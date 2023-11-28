import { EURES_POSITION_SCHEDULE_TYPE } from '~/client/domain/codesTempsTravailEures';
import { EURES_EDUCATION_LEVEL_CODES_TYPE } from '~/client/domain/niveauEtudesEures';
import { EURES_CONTRACT_TYPE } from '~/client/domain/typesContratEures';
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
						nomEntreprise: 'La Pâtisserie',
						pays: 'France',
						titre: 'Pâtissier (H/F)',
						urlCandidature: 'https://urlDeCandidature2.com',
						ville: 'Paris',
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
		describe('type de contrat', () => {
			describe('si le type de contrat EURES est fourni', () => {
				it('retourne un emploi avec le type de contrat en français selon le référentiel', () => {
					// GIVEN
					const apprenticeshipContractType = EURES_CONTRACT_TYPE.Apprenticeship;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, apprenticeshipContractType);
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithContractTypeApprenticeship]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.typeContrat).toBe('Apprentissage');
				});
				it('retourne un emploi avec le type de contrat à undefined quand le type de contrat EURES est "NS" (non spécifié)', () => {
					// GIVEN
					const nsEuresContractType = 'NS';
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, nsEuresContractType);
					const aDetailItemWithNsContractType = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithNsContractType]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.typeContrat).toBe(undefined);
				});
				it('retourne un emploi avec le type de contrat à undefined quand le type de contrat EURES n’est pas connu du référentiel', () => {
					// GIVEN
					const unknownEuresContractType = 'does not exist';
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, unknownEuresContractType);
					const aDetailItemWithUnknownContractType = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithUnknownContractType]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.typeContrat).toBe(undefined);
				});

			});
			it('retourne un emploi avec le type de contrat à undefined si le type de contrat EURES n’est pas fourni', () => {
				// GIVEN
				const handle = 'eures-offer-id';
				const hrxmlWithoutPositionOfferingTypeCode = anApiEuresEmploiEuropeDetailXMLResponse();
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle,
						},
						hrxml: hrxmlWithoutPositionOfferingTypeCode,
					}) },
				);
				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

				// THEN
				expect(result.typeContrat).toBe(undefined);
			});
		});
		describe('temps de travail', () => {
			describe('si le temps de travail est fourni', () => {
				it('retourne un emploi avec le temps de travail en français selon le référentiel', () => {
					// GIVEN
					const positionScheduleType = EURES_POSITION_SCHEDULE_TYPE.FlexTime;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, undefined, positionScheduleType);
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithContractTypeApprenticeship]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.tempsDeTravail).toBe('Temps flexible');
				});
				it('retourne un emploi avec le temps de travail à undefined quand le type de temps de travail n’est pas connu du référentiel', () => {
					// GIVEN
					const positionScheduleType = 'does not exist';
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, undefined, positionScheduleType);
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithContractTypeApprenticeship]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.tempsDeTravail).toBeUndefined();
				});
			});
			it('retourne un emploi avec le temps de travail à undefined si le type de contrat EURES n’est pas fourni', () => {
				// GIVEN
				const handle = 'eures-offer-id';
				const hrxmlWithoutPositionOfferingTypeCode = anApiEuresEmploiEuropeDetailXMLResponse();
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle,
						},
						hrxml: hrxmlWithoutPositionOfferingTypeCode,
					}) },
				);
				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

				// THEN
				expect(result.tempsDeTravail).toBe(undefined);
			});
		});
		describe('niveau d’études', () => {
			describe('si le niveau d’études est fourni', () => {
				it('retourne un emploi avec le niveau d’études en français selon le référentiel', () => {
					// GIVEN
					const educationLevelCode = EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_PRESCOLAIRE;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, undefined, undefined, educationLevelCode);
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithContractTypeApprenticeship]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.niveauEtudes).toBe('Enseignement préscolaire');
				});
				it('retourne un emploi avec le niveau d’études à undefined quand le type de niveau d’études n’est pas connu du référentiel', () => {
					// GIVEN
					const educationLevelCode = 9999999999;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(undefined, undefined, undefined, undefined, undefined, undefined, educationLevelCode);
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml,
						}) },
					);
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithContractTypeApprenticeship]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

					// THEN
					expect(result.niveauEtudes).toBeUndefined();
				});
			});
			it('retourne un emploi avec le niveau d’études à undefined si le type de contrat EURES n’est pas fourni', () => {
				// GIVEN
				const handle = 'eures-offer-id';
				const hrxmlWithoutPositionOfferingTypeCode = anApiEuresEmploiEuropeDetailXMLResponse();
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{ jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle,
						},
						hrxml: hrxmlWithoutPositionOfferingTypeCode,
					}) },
				);
				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

				// THEN
				expect(result.niveauEtudes).toBe(undefined);
			});
		});
	});
});
