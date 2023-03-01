import { NiveauRequis,RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { aFormation } from '~/server/formations/domain/formation.fixture';
import {
	ApiLaBonneAlternanceFormationRechercheResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';
import {
	aLaBonneAlternanceApiFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';
import {
	mapFormation,
	mapRésultatRechercheFormation,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.mapper';

describe('mapRésultatRechercheFormation', () => {
	it('converti une response en liste de formation', () => {
		const input: ApiLaBonneAlternanceFormationRechercheResponse = {
			results: [{
				company: {
					name: 'ECOLE DE TRAVAIL ORT',
				},
				diplomaLevel: '3 (CAP...)',
				idRco: '123',
				place: { fullAddress: '1 rue de la République', zipCode: '75001' },
				title: 'Monteur / Monteuse en chauffage (H/F)',
			},
			{
				company: { name: 'ECOLE DE TRAVAIL ORTY' },
				diplomaLevel: '7 (Master, titre ingénieur...)',
				idRco: '456',
				place: { city: 'PARIS 5' },
				title: 'Monteur / Monteuse en plomberie (H/F)',
			}],
		};

		const expected: RésultatRechercheFormation[] = [
			{
				adresse: '1 rue de la République',
				codePostal: '75001',
				idRco: '123',
				nomEntreprise: 'ECOLE DE TRAVAIL ORT',
				tags: [undefined, NiveauRequis['NIVEAU_3']],
				titre: 'Monteur / Monteuse en chauffage (H/F)',
			},
			{
				idRco: '456',
				nomEntreprise: 'ECOLE DE TRAVAIL ORTY',
				tags: ['PARIS 5', NiveauRequis['NIVEAU_7_8']],
				titre: 'Monteur / Monteuse en plomberie (H/F)',
			},
		];
		
		const result = mapRésultatRechercheFormation(input);

		expect(result).toEqual(expected);
	});
});

describe('mapFormation', () => {
	it('convertit une response en formation description', () => {
		const input = aLaBonneAlternanceApiFormationResponse();

		const expected = aFormation();
		
		const result = mapFormation(input);
		
		expect(result).toEqual(expected);
	});
});
