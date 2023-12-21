import { EURES_POSITION_SCHEDULE_TYPE } from '~/client/domain/codesTempsTravailEures';
import { EURES_EDUCATION_LEVEL_CODES_TYPE } from '~/client/domain/niveauEtudesEures';
import {
	anEmploiEurope,
	aResultatRechercheEmploiEuropeList,
} from '~/server/emplois-europe/domain/emploiEurope.fixture';
import { LEVEL_CODE, LEVEL_NAME } from '~/server/emplois-europe/infra/langageEures';
import {
	anApiEuresEmploiEuropeDetailItem,
	anApiEuresEmploiEuropeDetailJobVacancy,
	anApiEuresEmploiEuropeDetailRelated,
	anApiEuresEmploiEuropeDetailResponse,
	anApiEuresEmploiEuropeDetailXMLResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.fixture';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { EURES_CONTRACT_TYPE } from '~/server/emplois-europe/infra/typesContratEures';
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
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse({
								pays: 'FR',
								ville: 'Paris',
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
									{
										nomEntreprise: 'La Boulangerie',
										pays: 'FR',
										titre: 'Boulanger (H/F)',
										ville: undefined,
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
									{
										nomEntreprise: 'La Boulangerie',
										pays: undefined,
										titre: 'Boulanger (H/F)',
										ville: 'Paris',
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
			const handle = '3';
			const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse(
				[
					anApiEuresEmploiEuropeDetailItem({
						jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
							header: {
								handle: handle,
							},
							hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
								{
									anneesDExperience: 3,
									codeLangueDeLOffre: 'fr',
									description: 'Je suis la description',
									educationLevelCode: EURES_EDUCATION_LEVEL_CODES_TYPE.NIVEAU_LICENCE_OU_EQUIVALENT,
									listeLangueDeTravail: ['FR', 'EN'],
									listePermis: ['B', 'C'],
									nomEntreprise: 'La Boulangerie',
									pays: 'FR',
									tempsDeTravail: EURES_POSITION_SCHEDULE_TYPE.FullTime,
									titre: 'Boulanger (H/F)',
									ville: 'Paris',
								},
							),
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
				anneesDExperience: 3,
				codeLangueDeLOffre: 'fr',
				description: 'Je suis la description',
				id: '3',
				langueDeTravail: ['français', 'anglais'],
				listePermis: ['B', 'C'],
				niveauEtudes: 'Niveau licence (Bachelor) ou équivalent',
				nomEntreprise: 'La Boulangerie',
				pays: 'France',
				tempsDeTravail: 'Temps plein',
				titre: 'Boulanger (H/F)',
				typeContrat: undefined,
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
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse({
						nomEntreprise: undefined,
						pays: undefined,
						titre: undefined,
						typeContrat: apprenticeshipContractType,
						ville: undefined,
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
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithNsContractType]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithUnknownContractType]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItemWithContractTypeApprenticeship]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

				// THEN
				expect(result.tempsDeTravail).toBeUndefined();
			});
		});

		describe('niveau d’études', () => {
			describe('si le niveau d’études est fourni', () => {
				it('retourne un emploi avec le niveau d’études en français selon le référentiel', () => {
					// GIVEN
					const educationLevelCode = EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_PRESCOLAIRE;
					const handle = 'eures-offer-id';
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse({
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
					const hrxml = anApiEuresEmploiEuropeDetailXMLResponse(
						{
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
				const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
				const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

				// WHEN
				const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
								const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
								const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

								// WHEN
								const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
									const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
									const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

									// WHEN
									const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
									const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
									const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

									// WHEN
									const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
								const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
								const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

								// WHEN
								const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
							const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
							const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

							// WHEN
							const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
						const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
						const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

						// WHEN
						const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
					const apiEuresEmploiEuropeDetailResponse = anApiEuresEmploiEuropeDetailResponse([aDetailItem]);
					const mapper = new ApiEuresEmploiEuropeMapper(new FastXmlParserService());

					// WHEN
					const result = mapper.mapDetailOffre(handle, apiEuresEmploiEuropeDetailResponse);

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
	});
});
