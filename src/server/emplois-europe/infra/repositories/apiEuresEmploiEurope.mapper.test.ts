import { EURES_POSITION_SCHEDULE_TYPE } from '~/client/domain/codesTempsTravailEures';
import {
	anEmploiEurope,
	aResultatRechercheEmploiEuropeList,
} from '~/server/emplois-europe/domain/emploiEurope.fixture';
import { NiveauDEtudesLibelle } from '~/server/emplois-europe/domain/niveauDEtudes';
import { LEVEL_CODE, LEVEL_NAME } from '~/server/emplois-europe/infra/langageEures';
import {
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeDetailXML,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import {
	anApiEuresEmploiEuropeDetailItem,
	anApiEuresEmploiEuropeDetailJobVacancy,
	anApiEuresEmploiEuropeDetailRelated,
	anApiEuresEmploiEuropeDetailResponse,
	anApiEuresEmploiEuropeDetailXMLResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { EURES_CONTRACT_TYPE } from '~/server/emplois-europe/infra/typesContratEures';
import { UNITE_EXPERIENCE_NECESSAIRE } from '~/server/emplois-europe/infra/uniteExperienceNecessaire';
import { FastXmlParserService } from '~/server/services/xml/fastXmlParser.service';
import NiveauEtudeAPIEures = ApiEuresEmploiEuropeDetailXML.NiveauEtudeAPIEures;

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

			const apiEuresEmploiEuropeDetailResponse: ApiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse();

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapRechercheEmploiEurope(apiEuresEmploiEuropeRechercheResponse, apiEuresEmploiEuropeDetailResponse);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual(aResultatRechercheEmploiEuropeList());
		});

		describe('lorsque des pays et une ville sont renseignés', () => {
			it('retourne un ResultatRechercheEmploiEurope contenant les localisations avec ville et pays', () => {
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
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
								localisations: [{
									pays: 'FR',
									ville: 'Paris',
								}],
							},
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
							localisations: [{
								pays: 'France',
								ville: 'Paris',
							}],
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
									{
										localisations: [{ pays: 'FR', ville: undefined }],
										nomEntreprise: 'La Boulangerie',
										titre: 'Boulanger (H/F)',
									},
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
							localisations: [{
								pays: 'France',
							}],
							nomEntreprise: 'La Boulangerie',
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
									{
										localisations: [{ pays: undefined, ville: 'Paris' }],
										nomEntreprise: 'La Boulangerie',
										titre: 'Boulanger (H/F)',
									},
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
							localisations: [{
								ville: 'Paris',
							}],
							nomEntreprise: 'La Boulangerie',
							titre: 'Boulanger (H/F)',
						}),
					],
				}));
			});
		});

		describe('lorsque plusieurs pays et/ou villes sont renseignées', () => {
			it('liste les différents pays / villes', () => {
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
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
								localisations: [{
									pays: 'BE',
									ville: 'Bruxelles',
								},
								{
									pays: 'FR',
									ville: 'Paris',
								},
								],
							},
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
							localisations: [{
								pays: 'Belgique',
								ville: 'Bruxelles',
							},
							{
								pays: 'France',
								ville: 'Paris',
							}],
						}),
					],
				}));
			});
		});
	});

	describe('mapDetailOffre', () => {
		it('retourne un EmploiEurope', () => {
			// Given
			const handle = '3';
			const item = anApiEuresEmploiEuropeDetailItem({
				jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
					header: {
						handle: handle,
					},
					hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
						{
							codeLangueDeLOffre: 'fr',
							description: 'Je suis la description',
							educationLevelCode: NiveauEtudeAPIEures.NIVEAU_LICENCE_OU_EQUIVALENT,
							experiencesNecessaires: [{ duree: 3, unite: UNITE_EXPERIENCE_NECESSAIRE.YEAR }],
							listeLangueDeTravail: ['FR', 'EN'],
							listePermis: ['B', 'C'],
							localisations: [{ pays: 'FR', ville: 'Paris' }],
							nomEntreprise: 'La Boulangerie',
							tempsDeTravail: EURES_POSITION_SCHEDULE_TYPE.FullTime,
							titre: 'Boulanger (H/F)',
						},
					),
				}),
				related: anApiEuresEmploiEuropeDetailRelated({
					urls: [{
						urlValue: 'https://urlDeCandidature.com',
					}],
				}),
			});

			const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

			// When
			const resultatRechercheEmploiEurope = mapper.mapDetailOffre(handle, item);

			// Then
			expect(resultatRechercheEmploiEurope).toEqual(anEmploiEurope({
				codeLangueDeLOffre: 'fr',
				description: 'Je suis la description',
				id: '3',
				laPlusLongueExperienceNecessaire: { duree: 3, unite: UNITE_EXPERIENCE_NECESSAIRE.YEAR },
				langueDeTravail: ['français', 'anglais'],
				listePermis: ['B', 'C'],
				localisations: [{
					pays: 'France',
					ville: 'Paris',
				}],
				niveauEtudes: NiveauDEtudesLibelle.LICENCE,
				nomEntreprise: 'La Boulangerie',
				tempsDeTravail: 'Temps plein',
				titre: 'Boulanger (H/F)',
				typeContrat: undefined,
				urlCandidature: 'https://urlDeCandidature.com',
			}));
		});

		describe('type de contrat', () => {
			describe('si le type de contrat EURES est fourni', () => {
				it('retourne un emploi avec le type de contrat en français selon le référentiel', () => {
					// GIVEN
					const apprenticeshipContractType = EURES_CONTRACT_TYPE.Apprenticeship;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse({
						localisations: [],
						nomEntreprise: undefined,
						titre: undefined,
						typeContrat: apprenticeshipContractType,
					});
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithContractTypeApprenticeship);

					// THEN
					expect(result.typeContrat).toBe('Apprentissage');
				});
				it('retourne un emploi avec le type de contrat à undefined quand le type de contrat EURES est "NS" (non spécifié)', () => {
					// GIVEN
					const nsEuresContractType = 'NS';
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(
						{
							typeContrat: nsEuresContractType,
						});
					const aDetailItemWithNsContractType = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithNsContractType);

					// THEN
					expect(result.typeContrat).toBeUndefined();
				});
				it('retourne un emploi avec le type de contrat à undefined quand le type de contrat EURES n’est pas connu du référentiel', () => {
					// GIVEN
					const unknownEuresContractType = 'does not exist';
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(
						{ typeContrat: unknownEuresContractType });
					const aDetailItemWithUnknownContractType = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithUnknownContractType);

					// THEN
					expect(result.typeContrat).toBeUndefined();
				});

			});
			it('retourne un emploi avec le type de contrat à undefined si le type de contrat EURES n’est pas fourni', () => {
				// GIVEN
				const handle = 'eures-offer-id';
				const hrxmlWithoutPositionOfferingTypeCode = anApiEuresEmploiEuropeDetailXMLResponse({
					typeContrat: undefined,
				});
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml: hrxmlWithoutPositionOfferingTypeCode,
						}),
					},
				);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, aDetailItem);

				// THEN
				expect(result.typeContrat).toBeUndefined();
			});
		});

		describe('temps de travail', () => {
			describe('si le temps de travail est fourni', () => {
				it('retourne un emploi avec le temps de travail en français selon le référentiel', () => {
					// GIVEN
					const positionScheduleType = EURES_POSITION_SCHEDULE_TYPE.FlexTime;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse({
						tempsDeTravail: positionScheduleType,
					});
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithContractTypeApprenticeship);

					// THEN
					expect(result.tempsDeTravail).toBe('Temps flexible');
				});
				it('retourne un emploi avec le temps de travail à undefined quand le type de temps de travail n’est pas connu du référentiel', () => {
					// GIVEN
					const positionScheduleType = 'does not exist';
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse({
						typeContrat: positionScheduleType,
					});
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithContractTypeApprenticeship);

					// THEN
					expect(result.tempsDeTravail).toBeUndefined();
				});
			});
			it('retourne un emploi avec le temps de travail à undefined si le temps de travail n’est pas fourni', () => {
				// GIVEN
				const handle = 'eures-offer-id';
				const hrxmlWithoutPositionScheduleTypeCode = anApiEuresEmploiEuropeDetailXMLResponse(
					{
						tempsDeTravail: undefined,
					});
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml: hrxmlWithoutPositionScheduleTypeCode,
						}),
					},
				);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, aDetailItem);

				// THEN
				expect(result.tempsDeTravail).toBeUndefined();
			});
		});

		describe('niveau d’études', () => {
			describe('si le niveau d’études est fourni', () => {
				it.each([
					[NiveauEtudeAPIEures.ENSEIGNEMENT_PRESCOLAIRE, NiveauDEtudesLibelle.SANS_DIPLOME_OU_BREVET],
					[NiveauEtudeAPIEures.ENSEIGNEMENT_PRIMAIRE, NiveauDEtudesLibelle.SANS_DIPLOME_OU_BREVET],
					[NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_INFERIEUR, NiveauDEtudesLibelle.SANS_DIPLOME_OU_BREVET],
					[NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_SUPERIEUR, NiveauDEtudesLibelle.LYCEE_FORMATION_PRO],
					[NiveauEtudeAPIEures.ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR, NiveauDEtudesLibelle.LYCEE_FORMATION_PRO],
					[NiveauEtudeAPIEures.ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT, NiveauDEtudesLibelle.SUPERIEUR_COURT],
					[NiveauEtudeAPIEures.NIVEAU_LICENCE_OU_EQUIVALENT, NiveauDEtudesLibelle.LICENCE],
					[NiveauEtudeAPIEures.NIVEAU_MAITRISE_OU_EQUIVALENT, NiveauDEtudesLibelle.MASTER],
					[NiveauEtudeAPIEures.NIVEAU_DOCTORAT_OU_EQUIVALENT, NiveauDEtudesLibelle.DOCTORAT],
					[NiveauEtudeAPIEures.NON_SPECIFIE, NiveauDEtudesLibelle.NON_SPECIFIE],
				])('retourne un emploi avec le niveau d’études en français selon le référentiel', (niveauEtudesEures, expectedNiveauEtudes) => {
					// GIVEN
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse({
						educationLevelCode: niveauEtudesEures,
					});
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithContractTypeApprenticeship);

					// THEN
					expect(result.niveauEtudes).toBe(expectedNiveauEtudes);
				});


				it('retourne un emploi avec le niveau d’études à undefined quand le type de niveau d’études n’est pas connu du référentiel', () => {
					// GIVEN
					const educationLevelCode = 9999999999;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(
						{
							// @ts-expect-error
							educationLevelCode: educationLevelCode,
						});
					const aDetailItemWithContractTypeApprenticeship = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml,
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItemWithContractTypeApprenticeship);

					// THEN
					expect(result.niveauEtudes).toBeUndefined();
				});
			});
			it('retourne un emploi avec le niveau d’études à undefined si le type de contrat EURES n’est pas fourni', () => {
				// GIVEN
				const handle = 'eures-offer-id';
				const hrxmlWithoutPositionOfferingTypeCode = anApiEuresEmploiEuropeDetailXMLResponse(
					{
						educationLevelCode: undefined,
					},
				);
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml: hrxmlWithoutPositionOfferingTypeCode,
						}),
					},
				);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, aDetailItem);

				// THEN
				expect(result.niveauEtudes).toBeUndefined();
			});
		});

		describe('compétences linguistiques', () => {
			describe('si une seule compétence est fourni', () => {
				describe('si la compétence demandée est une compétence linguistique', () => {
					describe('si le code de la langue fait parti du référentiel', () => {
						describe('si le niveau attendu fait parti du référentiel', () => {
							it('renvoie le niveau attendu et la langue', () => {
								const handle = 'eures-offer-id';
								const language = 'fr';
								const aDetailItem = anApiEuresEmploiEuropeDetailItem(
									{
										jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
											header: {
												handle,
											},
											hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
												listeCompetencesLinguistiques: [{
													language: language,
													levelCode: LEVEL_CODE.C2,
												}],
											}),
										}),
									},
								);
								const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

								// WHEN
								const result = mapper.mapDetailOffre(handle, aDetailItem);

								// THEN
								expect(result.competencesLinguistiques).toEqual(anEmploiEurope({
									competencesLinguistiques: [{
										codeDuNiveauDeLangue: LEVEL_CODE.C2,
										detailCompetenceLanguistique: [],
										langage: 'français',
										nomDuNiveauDeLangue: LEVEL_NAME.MAITRISE,
									}],
								}).competencesLinguistiques);
							});

							describe('si des compétences plus précises sont fournies', () => {
								it('renvoie les compétences supplémentaires avec le nom de la compétence selon le référentiel', () => {
									const handle = 'eures-offer-id';
									const language = 'fr';
									const aDetailItem = anApiEuresEmploiEuropeDetailItem(
										{
											jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
												header: {
													handle,
												},
												hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
													listeCompetencesLinguistiques: [{
														competenciesDimensions: [
															{ competencyDimensionName: 'CEF-Speaking-Interaction', levelCode: LEVEL_CODE.A2 },
															{ competencyDimensionName: 'CEF-Writing-Interaction', levelCode: LEVEL_CODE.C1 },
														],
														language: language,
														levelCode: LEVEL_CODE.C2,
													}],
												}),
											}),
										},
									);
									const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

									// WHEN
									const result = mapper.mapDetailOffre(handle, aDetailItem);

									// THEN
									expect(result.competencesLinguistiques).toStrictEqual(anEmploiEurope({
										competencesLinguistiques: [{
											codeDuNiveauDeLangue: LEVEL_CODE.C2,
											detailCompetenceLanguistique: [{
												codeDuNiveauDeLaCompetence: LEVEL_CODE.A2,
												nomCompetence: 'Interaction orale',
												nomDuNiveauDeLaCompetence: LEVEL_NAME.INTERMEDIAIRE,
											}, {
												codeDuNiveauDeLaCompetence: LEVEL_CODE.C1,
												nomCompetence: 'Interaction écrite',
												nomDuNiveauDeLaCompetence: LEVEL_NAME.AUTONOME,
											}],
											langage: 'français',
											nomDuNiveauDeLangue: LEVEL_NAME.MAITRISE,
										}],
									}).competencesLinguistiques);
								});

								it('ne renvoie pas les informations complémentaires des compétences avec un niveau inconnu du reférentiel', () => {
									const handle = 'eures-offer-id';
									const language = 'fr';
									const aDetailItem = anApiEuresEmploiEuropeDetailItem(
										{
											jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
												header: {
													handle,
												},
												hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
													listeCompetencesLinguistiques: [{
														competenciesDimensions: [
															{ competencyDimensionName: 'CEF-Speaking-Interaction', levelCode: 'toto' as LEVEL_CODE },
															{ competencyDimensionName: 'CEF-Writing-Interaction', levelCode: LEVEL_CODE.C1 },
															{ competencyDimensionName: 'pas une interaction qui existe', levelCode: LEVEL_CODE.C1 },
														],
														language: language,
														levelCode: LEVEL_CODE.C2,
													}],
												}),
											}),
										},
									);
									const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

									// WHEN
									const result = mapper.mapDetailOffre(handle, aDetailItem);

									// THEN
									expect(result.competencesLinguistiques).toStrictEqual(anEmploiEurope({
										competencesLinguistiques: [{
											codeDuNiveauDeLangue: LEVEL_CODE.C2,
											detailCompetenceLanguistique: [{
												codeDuNiveauDeLaCompetence: LEVEL_CODE.C1,
												nomCompetence: 'Interaction écrite',
												nomDuNiveauDeLaCompetence: LEVEL_NAME.AUTONOME,
											}],
											langage: 'français',
											nomDuNiveauDeLangue: LEVEL_NAME.MAITRISE,
										}],
									}).competencesLinguistiques);
								});
							});
						});

						describe('si le niveau attendu ne fait pas parti du référentiel', () => {
							it('ne renvoi pas la compétence linguistique', () => {
								const handle = 'eures-offer-id';
								const language = 'fr';
								const aDetailItem = anApiEuresEmploiEuropeDetailItem(
									{
										jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
											header: {
												handle,
											},
											hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
												listeCompetencesLinguistiques: [{
													language: language,
													levelCode: 'toto' as LEVEL_CODE,
												}],
											}),
										}),
									},
								);
								const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

								// WHEN
								const result = mapper.mapDetailOffre(handle, aDetailItem);

								// THEN
								expect(result.competencesLinguistiques).toStrictEqual([]);
							});
						});
					});

					describe('si le code de la langue ne fait pas parti du référentiel', () => {
						it('ne renvoi pas la compétence linguistique', () => {
							const handle = 'eures-offer-id';
							const language = 'pas un langage';
							const aDetailItem = anApiEuresEmploiEuropeDetailItem(
								{
									jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
										header: {
											handle,
										},
										hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
											listeCompetencesLinguistiques: [{
												language: language,
												levelCode: LEVEL_CODE.B2,
											}],
										}),
									}),
								},
							);
							const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

							// WHEN
							const result = mapper.mapDetailOffre(handle, aDetailItem);

							// THEN
							expect(result.competencesLinguistiques).toStrictEqual([]);
						});
					});
				});
				describe('si la compétence demandée n‘est pas une compétence linguistique', () => {
					it('ne renvoie pas la compétence linguistique', () => {
						const handle = 'eures-offer-id';
						const language = 'fr';
						const aDetailItem = anApiEuresEmploiEuropeDetailItem(
							{
								jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
									header: {
										handle,
									},
									hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
										listeCompetencesLinguistiques: [{
											competenceType: 'other',
											language: language,
											levelCode: LEVEL_CODE.B2,
										}],
									}),
								}),
							},
						);
						const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

						// WHEN
						const result = mapper.mapDetailOffre(handle, aDetailItem);

						// THEN
						expect(result.competencesLinguistiques).toStrictEqual([]);
					});
				});
			});

			describe('si plusieurs compétences sont fournies', () => {
				it('renvoie les données associés', () => {
					const handle = 'eures-offer-id';
					const aDetailItem = anApiEuresEmploiEuropeDetailItem(
						{
							jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
								header: {
									handle,
								},
								hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
									listeCompetencesLinguistiques: [{
										competenceType: 'language',
										competenciesDimensions: [{
											competencyDimensionName: 'cef-understanding-listening',
											levelCode: LEVEL_CODE.A2,
										}],
										language: 'fr',
										levelCode: LEVEL_CODE.C2,
									},
									{
										competenceType: 'language',
										language: 'nl',
										levelCode: LEVEL_CODE.C1,
									}],
								}),
							}),
						},
					);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, aDetailItem);

					// THEN
					expect(result.competencesLinguistiques).toStrictEqual(anEmploiEurope({
						competencesLinguistiques: [{
							codeDuNiveauDeLangue: LEVEL_CODE.C2,
							detailCompetenceLanguistique: [{
								codeDuNiveauDeLaCompetence: LEVEL_CODE.A2,
								nomCompetence: 'Compréhension à l’audition',
								nomDuNiveauDeLaCompetence: LEVEL_NAME.INTERMEDIAIRE,
							}],
							langage: 'français',
							nomDuNiveauDeLangue: LEVEL_NAME.MAITRISE,
						},
						{
							codeDuNiveauDeLangue: LEVEL_CODE.C1,
							detailCompetenceLanguistique: [],
							langage: 'néerlandais',
							nomDuNiveauDeLangue: LEVEL_NAME.AUTONOME,
						}],
					}).competencesLinguistiques,
					);
				});
			});
		});

		describe('expérience exigée', () => {
			it('lorsque la durée et l‘unité sont fournies', () => {
				const handle = 'eures-offer-id';
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
								experiencesNecessaires: [{
									duree: 6,
									unite: UNITE_EXPERIENCE_NECESSAIRE.YEAR,
								}],
							}),
						}),
					},
				);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, aDetailItem);

				// THEN
				expect(result.laPlusLongueExperienceNecessaire?.duree).toBe(6);
				expect(result.laPlusLongueExperienceNecessaire?.unite).toBe(UNITE_EXPERIENCE_NECESSAIRE.YEAR);
			});

			it('lorsque l‘unité n‘est pas fournie, renvoie uniquement la durée', () => {
				const handle = 'eures-offer-id';
				const aDetailItem = anApiEuresEmploiEuropeDetailItem(
					{
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle,
							},
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
								experiencesNecessaires: [{
									duree: 6,
									unite: undefined,
								}],
							}),
						}),
					},
				);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, aDetailItem);

				// THEN
				expect(result.laPlusLongueExperienceNecessaire?.duree).toBe(6);
				expect(result.laPlusLongueExperienceNecessaire?.unite).toBe(undefined);
			});

			describe('lorsque plusieurs expériences sont mentionnées', () => {
				describe('et que la durée requise est différente d’une expérience à l’autre', function () {
					it('renvoie la durée la plus longue de toutes les expériences', () => {
						const handle = 'eures-offer-id';
						const aDetailItem = anApiEuresEmploiEuropeDetailItem(
							{
								jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
									header: {
										handle,
									},
									hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
										experiencesNecessaires: [{
											duree: 12,
											unite: UNITE_EXPERIENCE_NECESSAIRE.MONTH,
										}, {
											duree: 5,
											unite: UNITE_EXPERIENCE_NECESSAIRE.DAY,
										}, {
											duree: 2,
											unite: UNITE_EXPERIENCE_NECESSAIRE.YEAR,
										}, {
											duree: 2,
											unite: UNITE_EXPERIENCE_NECESSAIRE.WEEK,
										}],
									}),
								}),
							},
						);
						const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

						// WHEN
						const result = mapper.mapDetailOffre(handle, aDetailItem);

						// THEN
						expect(result.laPlusLongueExperienceNecessaire?.duree).toBe(2);
						expect(result.laPlusLongueExperienceNecessaire?.unite).toBe(UNITE_EXPERIENCE_NECESSAIRE.YEAR);
					});
				});
				describe('et que la durée requise est identique d’une expérience à l’autre', function () {
					it('renvoie cette durée', () => {
						// WHEN
						const handle = 'eures-offer-id';
						const aDetailItem = anApiEuresEmploiEuropeDetailItem(
							{
								jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
									header: {
										handle,
									},
									hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
										experiencesNecessaires: [{
											duree: 1,
											unite: UNITE_EXPERIENCE_NECESSAIRE.MONTH,
										}, {
											duree: 1,
											unite: UNITE_EXPERIENCE_NECESSAIRE.MONTH,
										}],
									}),
								}),
							},
						);
						const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

						// WHEN
						const result = mapper.mapDetailOffre(handle, aDetailItem);

						// THEN
						expect(result.laPlusLongueExperienceNecessaire?.duree).toBe(1);
						expect(result.laPlusLongueExperienceNecessaire?.unite).toBe(UNITE_EXPERIENCE_NECESSAIRE.MONTH);
					});
				});
				describe('et que la durée requise est inconnue sur toutes les expériences', function () {
					it('renvoie une experience requise undefined', () => {
						// WHEN
						const handle = 'eures-offer-id';
						const aDetailItem = anApiEuresEmploiEuropeDetailItem(
							{
								jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
									header: {
										handle,
									},
									hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
										experiencesNecessaires: [undefined, undefined],
									}),
								}),
							},
						);
						const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

						// WHEN
						const result = mapper.mapDetailOffre(handle, aDetailItem);

						// THEN
						expect(result.laPlusLongueExperienceNecessaire).toBe(undefined);
					});
				});
				describe('et que l‘unité d’une durée n’est pas une unité du référentiel connue', function () {
					it('cette durée est réduite à 0', () => {
						// WHEN
						const handle = 'eures-offer-id';
						const aDetailItem = anApiEuresEmploiEuropeDetailItem(
							{
								jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
									header: {
										handle,
									},
									hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
										experiencesNecessaires: [{
											duree: 4,
											// @ts-expect-error
											unite: 'hour',
										}, {
											duree: 2,
											unite: UNITE_EXPERIENCE_NECESSAIRE.DAY,
										}],
									}),
								}),
							},
						);
						const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

						// WHEN
						const result = mapper.mapDetailOffre(handle, aDetailItem);

						// THEN
						expect(result.laPlusLongueExperienceNecessaire?.duree).toBe(2);
						expect(result.laPlusLongueExperienceNecessaire?.unite).toBe(UNITE_EXPERIENCE_NECESSAIRE.DAY);
					});
				});
			});
		});
	});
});
