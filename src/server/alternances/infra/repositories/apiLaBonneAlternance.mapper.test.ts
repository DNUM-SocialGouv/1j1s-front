import { Alternance } from '~/server/alternances/domain/alternance';
import {
	aDetailMatchaAlternance,
	aDetailPEJobAlternance,
	aRechercheAlternance,
	aRecherchePEJobAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import {
	aLaBonneAlternanceApiJobsResponse,
	aLbaCompaniesResponse,
	aMatchaResponse,
	aPeJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	mapDetailMatcha,
	mapDetailPEJob,
	mapRechercheAlternanceListe,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { AlternanceStatus } from '~/server/alternances/infra/status';
import Source = Alternance.Source;

describe('mapRechercheAlternance', () => {
	process.env = {
		...process.env,
		NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL: 'http://lba.com/',
	};
	it('converti une response en liste d’alternance et d‘entreprises', () => {
		const input = aLaBonneAlternanceApiJobsResponse({
			lbaCompanies: {
				results: [
					{
						company: {
							name: 'CLUB VET',
							siret: '52352551700026',
							size: '0-0',
						},
						contact: {
							email: 'b3759ee20eff2e0a4cd369c4f2eb62238324fc',
							iv: '93f7bd08e956453cd8d0f8f75821a634',
						},
						nafs: [
							{
								label: 'Autres intermédiaires du commerce en produits divers',
							}, {
								label: 'Développement informatique',
							},
						],
						place: {
							city: 'Paris',
							fullAddress: '18 RUE EMILE LANDRIN, 75020 Paris',
						},
					},
				],
			},
			matchas: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					diplomaLevel: 'CAP, BEP',
					job: {
						contractType: 'CDD, CDI',
						id: 'id',
						romeDetails: {
							competencesDeBase: [],
							definition: 'description',
						},
					},
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}],
			},
			peJobs: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					job: {
						contractType: 'CDD',
						description: 'description',
						id: 'id',
					},
					place: { city: 'PARIS 4' },
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}],
			},
		});

		const result = mapRechercheAlternanceListe(input);

		expect(result).toEqual({
			entrepriseList: [{
				adresse: '18 RUE EMILE LANDRIN, 75020 Paris',
				candidaturePossible: true,
				id: '52352551700026',
				nom: 'CLUB VET',
				secteurs: ['Autres intermédiaires du commerce en produits divers', 'Développement informatique'],
				tags: ['Paris', '0 à 9 salariés', 'Candidature spontanée'],
				ville: 'Paris',
			}],
			offreList: [
				{
					entreprise: {
						nom: 'ECOLE DE TRAVAIL ORT',
					},
					id: 'id',
					source: Source.MATCHA,
					tags: ['CDD', 'CDI', 'CAP, BEP'],
					titre: 'Monteur / Monteuse en chauffage (H/F)',
				},
				{
					entreprise: {
						nom: 'ECOLE DE TRAVAIL ORT',
					},
					id: 'id',
					source: Source.FRANCE_TRAVAIL,
					tags: ['PARIS 4', 'Contrat d‘alternance', 'CDD'],
					titre: 'Monteur / Monteuse en chauffage (H/F)',
				}],
		});
	});

	describe('Entreprise', () => {
		describe('Converti la taille d’une entreprise', () => {
			it('renvoie la taille de l’entrerprise formatté', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [
							aLbaCompaniesResponse({
								company: {
									name: 'CLUB VET',
									size: '0-0',
								},
							}),
							aLbaCompaniesResponse({
								company: {
									name: 'Entreprise2',
									size: '55',
								},
							}),
							aLbaCompaniesResponse({
								company: {
									name: 'Entreprise3',
									size: '20-30',
								},
							}),
						],
					},
					matchas: {
						results: [],
					},
					peJobs: {
						results: [],
					},
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].tags[1]).toEqual('0 à 9 salariés');
				expect(resultEntreprise[1].tags[1]).toEqual('55 salariés');
				expect(resultEntreprise[2].tags[1]).toEqual('20 à 30 salariés');
			});
		});

		describe('Quand l’email d’une entreprise n’est pas rempli', () => {
			it('la candidature est impossible', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [{
							company: { name: 'CLUB VET' },
							contact: { iv: '93f7bd08e956453cd8d0f8f75821a634' },
						}],
					},
					matchas: { results: [] },
					peJobs: { results: [] },
				});

				const result = mapRechercheAlternanceListe(input);

				expect(result).toEqual(aRechercheAlternance({
					entrepriseList: [{
						candidaturePossible: false,
						nom: 'CLUB VET',
						tags: ['Rencontre au sein de l’entreprise', 'Candidature sur le site de l’entreprise'],
					}],
					offreList: [],
				}));
			});
		});

		describe('lorsqu‘il n‘y a pas d‘entreprise', () => {
			it('retourne une liste vide', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: [],
					matchas: { results: [] },
					peJobs: { results: [] },
				});

				const result = mapRechercheAlternanceListe(input);

				expect(result).toEqual(aRechercheAlternance({ entrepriseList: [], offreList: [] }));
			});
		});
	});

	describe('lorsque le champ matchas n’est pas présent', () => {
		it('retourne seulement les offres PEJobs', () => {
			const input = aLaBonneAlternanceApiJobsResponse({
				lbaCompanies: [],
				matchas: undefined,
				peJobs: {
					results: [
						{
							company: { name: 'ECOLE DE TRAVAIL ORT' },
							job: {
								contractDescription: 'CDD de 6 mois',
								contractType: 'CDD',
								description: 'description',
								duration: '6 mois',
								id: 'id',
							},
							place: {
								city: 'PARIS 4',
								fullAddress: 'full address',
							},
							title: 'Monteur / Monteuse en chauffage (H/F)',
							url: 'url',
						},
					],
				},
			});

			const result = mapRechercheAlternanceListe(input);

			expect(result).toEqual(aRechercheAlternance({
				entrepriseList: [],
				offreList: [
					aRecherchePEJobAlternance({
						entreprise: {
							nom: 'ECOLE DE TRAVAIL ORT',
						},
						id: 'id',
						source: Source.FRANCE_TRAVAIL,
						tags: [
							'PARIS 4',
							'Contrat d‘alternance',
							'CDD',
						],
						titre: 'Monteur / Monteuse en chauffage (H/F)',
					}),
				],
			}));
		});
	});

	describe('lorsque le champ peJobs n’est pas présent', () => {
		it('retourne seulement les offres Matcha', () => {
			// Given
			const input = aLaBonneAlternanceApiJobsResponse({
				lbaCompanies: [],
				matchas: {
					results: [
						{
							company: {
								name: 'ECOLE DE TRAVAIL ORT',
								place: {
									city: 'PARIS 4',
								},
							},
							contact: {
								phone: 'phone',
							},
							diplomaLevel: 'CAP, BEP',
							job: {
								contractType: 'CDD',
								dureeContrat: 1,
								id: 'id',
								jobStartDate: '2020-01-01',
								romeDetails: {
									competencesDeBase: [{ libelle: 'un libelle' }],
									definition: 'Avec des \\n',
								},
								rythmeAlternance: 'alternance',
							},
							place: {
								city: 'PARIS 4',
								fullAddress: 'full address',
							},
							title: 'Monteur / Monteuse en chauffage (H/F)',
						},
					],
				},
				peJobs: undefined,
			});

			// When
			const result = mapRechercheAlternanceListe(input);

			// Then
			expect(result).toEqual(aRechercheAlternance({
				entrepriseList: [],
				offreList: [
					aRecherchePEJobAlternance({
						entreprise: {
							nom: 'ECOLE DE TRAVAIL ORT',
						},
						id: 'id',
						source: Source.MATCHA,
						tags: [
							'PARIS 4',
							'CDD',
							'CAP, BEP',
						],
						titre: 'Monteur / Monteuse en chauffage (H/F)',
					}),
				],
			}));
		});
	});

	describe('lorsqu‘il n‘y a pas résultat pour les offres matchas', () => {
		it('retourne les autres offres', () => {
			const input = aLaBonneAlternanceApiJobsResponse({
				lbaCompanies: { results: [] },
				matchas: {},
				peJobs: {
					results: [aPeJobsResponse()],
				},
			});

			const result = mapRechercheAlternanceListe(input);

			expect(result).toEqual(aRechercheAlternance({
				entrepriseList: [],
				offreList: [aRecherchePEJobAlternance()],
			}));
		});
	});

	describe('lorsqu‘il n‘y a pas résultat pour les offres Pejobs', () => {
		it('retourne les autres offres', () => {
			const input = aLaBonneAlternanceApiJobsResponse({
				lbaCompanies: {
					results: [],
				},
				matchas: {
					results: [],
				},
				peJobs: {},
			});

			const result = mapRechercheAlternanceListe(input);

			expect(result).toEqual(aRechercheAlternance({
				entrepriseList: [],
				offreList: [],
			}));
		});
	});
});

describe('mapDetail', () => {
	describe('mapDetailPeJobs', () => {
		it('converti une response PEJobs en alternance', () => {
			const input = aPeJobsResponse({
				company: { name: 'ECOLE DE TRAVAIL ORT' },
				job: {
					contractDescription: 'CDD de 6 mois',
					contractType: 'CDD',
					description: 'description',
					duration: '6 mois',
					id: 'id',
				},
				place: {
					city: 'PARIS 4',
					fullAddress: 'full address',
				},
				title: 'Monteur / Monteuse en chauffage (H/F)',
				url: 'url',
			});

			const result = mapDetailPEJob(input);

			expect(result).toEqual(aDetailPEJobAlternance({
				description: 'description',
				durée: 'CDD de 6 mois',
				entreprise: {
					adresse: 'full address',
					nom: 'ECOLE DE TRAVAIL ORT',
				},
				id: 'id',
				lienPostuler: 'url',
				localisation: 'PARIS 4',
				natureDuContrat: 'Contrat d‘alternance',
				niveauRequis: undefined,
				rythmeAlternance: '6 mois',
				source: Source.FRANCE_TRAVAIL,
				tags: ['PARIS 4', 'Contrat d‘alternance', 'CDD'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
			}));
		});
	});

	describe('mapDetailMatcha', () => {
		it('sanitize tout le texte présent dans l’alternance', () => {
			const input = aMatchaResponse({
				job: {
					contractType: 'CDD, CDI',
					id: 'id',
					romeDetails: {
						competencesDeBase: [{ libelle: 'un libelle' }],
						definition: 'Avec des \\n',
					},
				},
			});

			const result = mapDetailMatcha(input);

			expect(result).toEqual(expect.objectContaining({
				description: 'Avec des \n',
			}));

		});

		it('lorsque le type de contrat est vide, renvoie l‘offre sans type de contrat', () => {
			const input = aMatchaResponse({
				job: {
					contractType: '',
					id: 'id',
				},
			});

			const result = mapDetailMatcha(input);

			expect(result).toEqual(expect.objectContaining({
				typeDeContrat: [],
			}));
		});

		describe('quand la response Matcha n’est pas une offre PASS', () => {
			it('converti une response Matcha en alternance en utilisant les champs definition et competencesDeBase de romeDetails', () => {
				const input = aMatchaResponse({
					company: {
						name: 'ECOLE DE TRAVAIL ORT',
						place: {
							city: 'PARIS 4',
						},
					},
					contact: {
						phone: 'phone',
					},
					diplomaLevel: 'CAP, BEP',
					job: {
						contractType: 'CDD',
						dureeContrat: 1,
						id: 'id',
						jobStartDate: '2020-01-01',
						romeDetails: {
							competencesDeBase: [{ libelle: 'un libelle' }],
							definition: 'Avec des \\n',
						},
						rythmeAlternance: 'alternance',
						status: AlternanceStatus.ACTIVE,
					},
					place: {
						city: 'PARIS 4',
						fullAddress: 'full address',
					},
					title: 'Monteur / Monteuse en chauffage (H/F)',
				});

				const result = mapDetailMatcha(input);

				expect(result).toEqual({
					compétences: ['un libelle'],
					dateDébut: new Date('2020-01-01'),
					description: 'Avec des \n',
					durée: '1 mois',
					entreprise: {
						adresse: 'full address',
						nom: 'ECOLE DE TRAVAIL ORT',
						téléphone: 'phone',
					},
					id: 'id',
					lienPostuler: 'http://lba.com/postuler?caller=1jeune1solution&itemId=id&type=matcha',
					localisation: 'PARIS 4',
					niveauRequis: 'CAP, BEP',
					rythmeAlternance: 'alternance',
					source: Source.MATCHA,
					status: AlternanceStatus.ACTIVE,
					tags: ['PARIS 4', 'CDD', 'CAP, BEP'],
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD'],
				});
			});
		});

		describe('quand la response Matcha est une offre PASS', () => {
			it('converti une response Matcha en alternance en utilisant les champs description et employeurDescription de job', () => {
				const input = aMatchaResponse({
					company: {
						name: 'ECOLE DE TRAVAIL ORT',
						place: {
							city: 'PARIS 4',
						},
					},
					contact: {
						phone: 'phone',
					},
					diplomaLevel: 'CAP, BEP',
					job: {
						contractType: 'CDD',
						description: 'description de l’offre',
						dureeContrat: 1,
						employeurDescription: 'description de l’employeur avec des <p>p</p>',
						id: 'id',
						jobStartDate: '2020-01-01',
						romeDetails: undefined,
						rythmeAlternance: 'alternance',
						status: AlternanceStatus.ACTIVE,
					},
					place: {
						city: 'PARIS 4',
						fullAddress: 'full address',
					},
					title: 'Monteur / Monteuse en chauffage (H/F)',
				});

				const result = mapDetailMatcha(input);

				expect(result).toEqual(aDetailMatchaAlternance({
					compétences: undefined,
					dateDébut: new Date('2020-01-01'),
					description: 'description de l’offre',
					descriptionEmployeur: 'description de l’employeur avec des <p>p</p>',
					durée: '1 mois',
					entreprise: {
						adresse: 'full address',
						nom: 'ECOLE DE TRAVAIL ORT',
						téléphone: 'phone',
					},
					id: 'id',
					lienPostuler: 'http://lba.com/postuler?caller=1jeune1solution&itemId=id&type=matcha',
					localisation: 'PARIS 4',
					niveauRequis: 'CAP, BEP',
					rythmeAlternance: 'alternance',
					source: Source.MATCHA,
					status: AlternanceStatus.ACTIVE,
					tags: ['PARIS 4', 'CDD', 'CAP, BEP'],
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD'],
				}));
			});
		});
	});
});


