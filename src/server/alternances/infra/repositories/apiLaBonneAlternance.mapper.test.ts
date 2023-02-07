import { AlternanceListApiResponse } from '~/server/alternances/domain/alternance';
import { mapAlternance } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';

describe('mapAlternance', () => {
	it("converti une response en liste d'alternance", () => {
		const input: AlternanceListApiResponse = {
			matchas: { results: [
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
			] },
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
