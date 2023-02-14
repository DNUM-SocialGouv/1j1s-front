
import {
	AlternanceListApiResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { mapAlternance, mapMétier } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { aMetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';

describe('mapAlternance', () => {
	it('converti une response en liste d’alternance', () => {
		const input: AlternanceListApiResponse = {
			matchas: {
				results: [
					{
						company: {
							name: 'ECOLE DE TRAVAIL ORT',
						},
						diplomaLevel: 'CAP, BEP',
						job: {
							contractType: 'CDD',
						},
						place: {
							city: 'PARIS 4',
						},
						title: 'Monteur / Monteuse en chauffage (H/F)',
					},
				],
			},
		};

		const result = mapAlternance(input);

		expect(result).toEqual([{
			localisation: 'PARIS 4',
			niveauRequis: 'CAP, BEP',
			nomEntreprise: 'ECOLE DE TRAVAIL ORT',
			titre: 'Monteur / Monteuse en chauffage (H/F)',
			typeDeContrat: 'CDD',
		}]);
	});
});

describe('mapMétier', () => {
	it('converti une response en liste de métier', () => {
		const responseAPI: MetierLaBonneAlternanceApiResponse = aMetierLaBonneAlternanceApiResponse();

		const result = mapMétier(responseAPI);

		expect(result).toEqual([{
			label: 'Vente, transaction, gestion immobilière',
			romes: ['C1504', 'C1501', 'C1502', 'C1503'],
		},
		{ label: 'Transport aérien', romes: ['N2101', 'N2102', 'N2203', 'N2204'] },
		{ label: 'Transport ferroviaire', romes: ['N4301', 'N4401', 'N4403'] }]);
	});
});
