import { AlternanceSource } from '~/server/alternances/domain/alternance';
import {
	aDetailMatchaAlternance,
	aDetailPEJobAlternance,
	aRechercheAlternance, aRechercheMatchaAlternance,
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

describe('mapRechercheAlternance', () => {
	process.env = {
		...process.env,
		NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL: 'http://lba.com/',
	};
	it('converti une response en liste d’alternance et d‘entreprises', () => {
		const input = aLaBonneAlternanceApiJobsResponse({
			lbaCompanies: {
				results: [{
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
				}],
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
					place: { city: 'Paris' },
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

		expect(result).toEqual(aRechercheAlternance({
			entrepriseList: [{
				adresse: '18 RUE EMILE LANDRIN, 75020 Paris',
				candidaturePossible: true,
				id: '52352551700026',
				nom: 'CLUB VET',
				nombreSalariés: { max: 9, min: 0 },
				secteurs: ['Autres intermédiaires du commerce en produits divers', 'Développement informatique'],
			}],
			offreList: [
				{
					entreprise: {
						nom: 'ECOLE DE TRAVAIL ORT',
					},
					id: 'id',
					localisation: 'Paris',
					niveauRequis: 'CAP, BEP',
					source: AlternanceSource.MATCHA,
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD', 'CDI'],
				},
				{
					entreprise: {
						nom: 'ECOLE DE TRAVAIL ORT',
					},
					id: 'id',
					localisation: 'PARIS 4',
					source: AlternanceSource.FRANCE_TRAVAIL,
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD'],
				}],
		}));
	});

	describe('Entreprise', () => {
		describe('Converti la taille d’une entreprise', () => {
			it('lorsque l‘entreprise ne fournis pas de nombre d‘employé, ne renvoie pas le nombre d‘employé', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [aLbaCompaniesResponse({ company: { name: 'CLUB VET', size: undefined } })],
					},
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].nombreSalariés).toEqual(undefined);
			});

			it('lorsque l‘entreprise fourni un nombre d‘employé invalide, ne renvoie pas le nombre d‘employé', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [
							aLbaCompaniesResponse({ company: { name: 'CLUB VET', size: 'je ne suis pas un nombre' } }),
							aLbaCompaniesResponse({
								company: {
									name: 'CLUB VET',
									size: 'je ne suis pas un nombre - avec un tiret',
								},
							}),
						],
					},
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].nombreSalariés).toEqual(undefined);
				expect(resultEntreprise[1].nombreSalariés).toEqual(undefined);
			});

			it('lorsque l‘entreprise fourni un nombre d‘employé valide sous la forme d‘une fourchette valant 0, renvoie une fourchette entre 0 et 9', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [aLbaCompaniesResponse({ company: { name: 'CLUB VET', size: '0-0' } })],
					},
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].nombreSalariés).toEqual({ max: 9, min: 0 });
			});

			it('lorsque l‘entreprise fourni un nombre d‘employé valide sous la forme d‘une fourchette, renvoie le nombre d‘employé min et max', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [aLbaCompaniesResponse({ company: { name: 'CLUB VET', size: '6-12' } })],
					},
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].nombreSalariés).toEqual({ max: 12, min: 6 });
			});

			it('lorsque l‘entreprise fourni un nombre d‘employé valide sous la forme d‘un nombre, renvoie le nombre d‘employé min et max', () => {
				const input = aLaBonneAlternanceApiJobsResponse({
					lbaCompanies: {
						results: [aLbaCompaniesResponse({ company: { name: 'CLUB VET', size: '15' } })],
					},
				});
				const resultEntreprise = mapRechercheAlternanceListe(input).entrepriseList;

				expect(resultEntreprise[0].nombreSalariés).toEqual({ max: 15, min: 15 });
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
						localisation: 'PARIS 4',
						niveauRequis: undefined,
						source: AlternanceSource.FRANCE_TRAVAIL,
						titre: 'Monteur / Monteuse en chauffage (H/F)',
						typeDeContrat: ['CDD'],
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
					aRechercheMatchaAlternance({
						entreprise: { nom: 'ECOLE DE TRAVAIL ORT' },
						id: 'id',
						localisation: 'PARIS 4',
						niveauRequis: 'CAP, BEP',
						source: AlternanceSource.MATCHA,
						titre: 'Monteur / Monteuse en chauffage (H/F)',
						typeDeContrat: ['CDD'],
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
				source: AlternanceSource.FRANCE_TRAVAIL,
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

				expect(result).toEqual(aDetailMatchaAlternance({
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
					source: AlternanceSource.MATCHA,
					status: AlternanceStatus.ACTIVE,
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD'],
				}));
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
					source: AlternanceSource.MATCHA,
					status: AlternanceStatus.ACTIVE,
					titre: 'Monteur / Monteuse en chauffage (H/F)',
					typeDeContrat: ['CDD'],
				}));
			});
		});
	});
});


