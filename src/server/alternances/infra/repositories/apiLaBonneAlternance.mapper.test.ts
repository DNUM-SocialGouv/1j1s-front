import { Alternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	aMatchaResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';
import {
	mapAlternance,
	mapAlternanceListe,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';

describe('mapAlternance', () => {
	it('converti une response en liste d’alternance', () => {
		const input: AlternanceApiJobsResponse = {
			matchas: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					diplomaLevel: 'CAP, BEP',
					job: {
						id: 'id',
					},
					contractType: ['CDD'],
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}],
			},
			peJobs: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					job: {
						id: 'id',
					},
					contractType: 'CDD',
					place: { city: 'PARIS 4' },
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}],
			},
		};

		const result = mapAlternanceListe(input);

		expect(result).toEqual([
			{
				localisation: undefined,
				id: 'id',
				niveauRequis: 'CAP, BEP',
				nomEntreprise: 'ECOLE DE TRAVAIL ORT',
				source: Alternance.Source.MATCHA,
				tags: ['CDD', 'CAP, BEP'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
			},
			{
				id: 'id',
				localisation: 'PARIS 4',
				niveauRequis: undefined,
				nomEntreprise: 'ECOLE DE TRAVAIL ORT',
				source: Alternance.Source.POLE_EMPLOI,
				tags: ['PARIS 4', 'Contrat d‘alternance', 'CDD'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
			},
		]);
	});
	it('sanitize tout le texte présent dans l’alternance', () => {
		const input: AlternanceApiJobsResponse.Matcha =
			aMatchaResponse({ job: { id: 'id', romeDetails: { definition: 'Avec des \\n' } } });

		const result = mapAlternance(input);

		expect(result).toEqual(expect.objectContaining({
			description: 'Avec des \n',
		}));

	});
});
