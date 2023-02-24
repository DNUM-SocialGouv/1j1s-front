import { Formation, NiveauRequis } from '~/server/formations/domain/formation';
import {
	ApiLaBonneAlternanceFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';
import { mapFormation } from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.mapper';

describe('mapFormation', () => {
	it('converti une response en liste de formation', () => {
		const input: ApiLaBonneAlternanceFormationResponse = {
			results: [{
				company: { name: 'ECOLE DE TRAVAIL ORT' },
				diplomaLevel: '3 (CAP...)',
				place: { fullAddress: '1 rue de la République' },
				title: 'Monteur / Monteuse en chauffage (H/F)',
			},
			{
				company: { name: 'ECOLE DE TRAVAIL ORTY' },
				diplomaLevel: '7 (Master, titre ingénieur...)',
				place: { city: 'PARIS 5' },
				title: 'Monteur / Monteuse en plomberie (H/F)',
			}],
		};

		const expected: Formation[] = [
			{
				adresse: '1 rue de la République',
				nomEntreprise: 'ECOLE DE TRAVAIL ORT',
				tags: [undefined, NiveauRequis['NIVEAU_3']],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
			},
			{
				nomEntreprise: 'ECOLE DE TRAVAIL ORTY',
				tags: ['PARIS 5', NiveauRequis['NIVEAU_7_8']],
				titre: 'Monteur / Monteuse en plomberie (H/F)',

			},
		];
		
		const result = mapFormation(input);

		expect(result).toEqual(expected);
	});
});
