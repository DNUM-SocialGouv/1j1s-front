import { FormationFiltre } from '~/server/formations/domain/formation';
import {
	ApiLaBonneAlternanceFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';

export function aFormationQuery(): FormationFiltre {
	return {
		codeRomes: ['D1406', 'D1407'],
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
