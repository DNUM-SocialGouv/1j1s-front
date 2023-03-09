import { Alternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	aMatchaResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	mapAlternanceListe,
	mapMatcha,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';

describe('mapAlternance', () => {
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
				localisation: undefined,
				niveauRequis: 'CAP, BEP',
				source: Alternance.Source.MATCHA,
				tags: ['CDD', 'CAP, BEP'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
			},
			{
				entreprise: {
					nom: 'ECOLE DE TRAVAIL ORT',
				},
				id: 'id',
				localisation: 'PARIS 4',
				niveauRequis: undefined,
				source: Alternance.Source.POLE_EMPLOI,
				tags: ['PARIS 4', 'Contrat d‘alternance', 'CDD'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
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
});
