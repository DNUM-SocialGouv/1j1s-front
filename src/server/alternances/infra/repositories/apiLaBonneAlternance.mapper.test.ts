import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceApiJobsResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { aMatchaResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
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
			matchas: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					diplomaLevel: 'CAP, BEP',
					job: {
						contractType: ['CDD'],
						description: 'description',
						id: 'id',
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

		expect(result).toEqual([
			{
				entreprise: {
					nom: 'ECOLE DE TRAVAIL ORT',
				},
				id: 'id',
				source: Alternance.Source.MATCHA,
				tags: ['CDD', 'CAP, BEP'],
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
			},
		]);
	});

	it('sanitize tout le texte présent dans l’alternance', () => {
		const input: AlternanceApiJobsResponse.Matcha =
			aMatchaResponse({
				job: {
					contractType: ['CDD'],
					description: 'la description',
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
					contractType: ['CDD'],
					description: 'description',
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
				durée: '1 an',
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

		it('accorde la durée au singulier quand nécessaire', () => {
			const input = aMatchaResponse({
				company: undefined,
				contact: undefined,
				diplomaLevel: '',
				job: {
					description: '',
					dureeContrat: 1,
					id: 'id',
				},
				place: undefined,
				title: '',
			});

			const result = mapMatcha(input);

			expect(result.durée).toEqual('1 an');
		});

		it('accorde la durée au pluriel quand nécessaire', () => {
			const input = aMatchaResponse({
				company: undefined,
				contact: undefined,
				diplomaLevel: '',
				job: {
					description: '',
					dureeContrat: 5,
					id: 'id',
				},
				place: undefined,
				title: '',
			});

			const result = mapMatcha(input);

			expect(result.durée).toEqual('5 ans');
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
});
