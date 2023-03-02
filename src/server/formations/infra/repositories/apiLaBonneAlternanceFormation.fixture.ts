import { FormationFiltre } from '~/server/formations/domain/formation';
import {
	ApiLaBonneAlternanceFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';

export function aFormationQuery(): FormationFiltre {
	return {
		codeCommune: '13180',
		codeRomes: ['F1603', 'I1308'],
		distanceCommune: '30',
		latitudeCommune: '48.2',
		longitudeCommune: '29.10',
	};
}

export const aLaBonneAlternanceApiFormationResponse = (): ApiLaBonneAlternanceFormationResponse => ({
	results: [
		{
			company: {
				name: 'La Bonne Alternance',
			},
			diplomaLevel: '4 (BAC...)',
			place: {
				city: 'Paris',
				fullAddress: '1 rue de la République',
			},
			title: 'Développeur web',
		},
		{
			company: {
				name: 'La Bonne Alternance',
			},
			diplomaLevel: 'Un autre type de diplôme',
			place: {
				city: 'Paris',
			},
			title: 'Développeur web',
		},
	],
});
