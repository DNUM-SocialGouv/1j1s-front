import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceApiJobsResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	aLbaCompaniesResponse,
	aMatchaResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	mapAlternanceListe,
	mapMatcha,
	mapPEJob,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';

describe('mapAlternance', () => {
	process.env = {
		...process.env,
		NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL: 'http://lba.com/',
	};
	it('converti une response en liste d’alternance', () => {
		const input: AlternanceApiJobsResponse = {
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
		};

		const result = mapAlternanceListe(input);

		expect(result).toEqual({
			entrepriseList: [{
				adresse: '18 RUE EMILE LANDRIN, 75020 Paris',
				candidaturePossible: true,
				id: '52352551700026',
				nom: 'CLUB VET',
				secteurs: ['Autres intermédiaires du commerce en produits divers', 'Développement informatique'],
				tags: ['Paris', '0 à 9 salariés','Candidature spontanée'],
				ville: 'Paris',
			}],
			offreList: [
				{
					entreprise: {
						nom: 'ECOLE DE TRAVAIL ORT',
					},
					id: 'id',
					source: Alternance.Source.MATCHA,
					tags: ['CDD', 'CDI', 'CAP, BEP'],
					titre: 'Monteur / Monteuse en chauffage (H/F)',
				},
				{
					entreprise: {
						nom: 'ECOLE DE TRAVAIL ORT',
					},
					id: 'id',
					source: Alternance.Source.POLE_EMPLOI,
					tags: ['PARIS 4', 'Contrat d‘alternance', 'CDD'],
					titre: 'Monteur / Monteuse en chauffage (H/F)',
				}],
		});
	});
	describe('Converti la taille d’une entreprise', () => {
		it('renvoie la taille de l’entrerprise formatté', () => {
			const input: AlternanceApiJobsResponse = {
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
			};
			const resultEntreprise = mapAlternanceListe(input).entrepriseList;

			expect(resultEntreprise[0].tags[1]).toEqual('0 à 9 salariés');
			expect(resultEntreprise[1].tags[1]).toEqual('55 salariés');
			expect(resultEntreprise[2].tags[1]).toEqual('20 à 30 salariés');
		});
	});

	describe('Quand l’email d’une entreprise n’est pas rempli', () => {
		it('la candidature est impossible', () => {
			const input: AlternanceApiJobsResponse = {
				lbaCompanies: {
					results: [
						{
							company: {
								name: 'CLUB VET',
							},
							contact: {
								iv: '93f7bd08e956453cd8d0f8f75821a634',
							},
						},
					],
				},
				matchas: {
					results: [],
				},
				peJobs: {
					results: [],
				},
			};

			const result = mapAlternanceListe(input);

			expect(result).toEqual({
				entrepriseList: [{
					candidaturePossible: false,
					nom: 'CLUB VET',
					tags: ['Rencontre au sein de l’entreprise', 'Candidature sur le site de l’entreprise'],
				}],
				offreList: [],
			});
		});
	});

	it('sanitize tout le texte présent dans l’alternance', () => {
		const input: AlternanceApiJobsResponse.Matcha =
			aMatchaResponse({
				job: {
					contractType: 'CDD, CDI',
					id: 'id',
					romeDetails: {
						competencesDeBase: [{ libelle: 'un libelle' }],
						definition: 'Avec des \\n',
					},
				},
			});

		const result = mapMatcha(input);

		expect(result).toEqual(expect.objectContaining({
			description: 'Avec des \n',
		}));

	});

	describe('mapMatcha', () => {
		it('converti une response Matcha en alternance', () => {
			const input: AlternanceApiJobsResponse.Matcha = {
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
			};

			const result = mapMatcha(input);

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
				source: Alternance.Source.MATCHA,
				tags: ['PARIS 4', 'CDD', 'CAP, BEP'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
			});
		});
	});

	it('converti une response PEJobs en alternance', () => {
		const input: AlternanceApiJobsResponse.PEJobs = {
			company: { name: 'ECOLE DE TRAVAIL ORT' },
			contact: {
				phone: 'phone',
			},
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
		};

		const result = mapPEJob(input);

		expect(result).toEqual({
			description: 'description',
			durée: 'CDD de 6 mois',
			entreprise: {
				adresse: 'full address',
				nom: 'ECOLE DE TRAVAIL ORT',
				téléphone: 'phone',
			},
			id: 'id',
			lienPostuler: 'url',
			localisation: 'PARIS 4',
			natureDuContrat: 'Contrat d‘alternance',
			niveauRequis: undefined,
			rythmeAlternance: '6 mois',
			source: Alternance.Source.POLE_EMPLOI,
			tags: ['PARIS 4', 'Contrat d‘alternance', 'CDD'],
			titre: 'Monteur / Monteuse en chauffage (H/F)',
			typeDeContrat: ['CDD'],
		});
	});

	describe('lorsque le champ lbaCompanies est une liste vide', () => {
		it('retourne une liste vide', () => {
			// Given
			const input: AlternanceApiJobsResponse = {
				lbaCompanies: [],
				matchas: { results: [] },
				peJobs: { results: [] },
			};

			// When
			const result = mapAlternanceListe(input);

			// Then
			expect(result).toEqual({
				entrepriseList: [],
				offreList: [],
			});
		});
	});
})
;
