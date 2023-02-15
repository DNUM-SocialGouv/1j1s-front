import { Alternance } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { mapAlternance, mapMétier } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { aMetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';

describe('mapAlternance', () => {
	it('converti une response en liste d’alternance', () => {
		const input: AlternanceApiJobsResponse = {
			matchas: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					diplomaLevel: 'CAP, BEP',
					job: { contractType: ['CDD'] },
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}],
			},
			peJobs: {
				results: [{
					company: { name: 'ECOLE DE TRAVAIL ORT' },
					job: { contractType: ['CDD'] },
					place: { city: 'PARIS 4' },
					title: 'Monteur / Monteuse en chauffage (H/F)',
				}],
			},
		};

		const result = mapAlternance(input);

		expect(result).toEqual([
			{
				localisation: undefined,
				niveauRequis: 'CAP, BEP',
				nomEntreprise: 'ECOLE DE TRAVAIL ORT',
				source: Alternance.Source.MATCHA,
				tags: ['CDD', 'CAP, BEP'],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
				typeDeContrat: ['CDD'],
			},
			{
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
});

describe('mapMétier', () => {
	it('converti une response en liste de métier', () => {
		const responseAPI: MetierLaBonneAlternanceApiResponse = aMetierLaBonneAlternanceApiResponse();

		const result = mapMétier(responseAPI);

		expect(result).toEqual(responseAPI.labelsAndRomes);
	});
});
