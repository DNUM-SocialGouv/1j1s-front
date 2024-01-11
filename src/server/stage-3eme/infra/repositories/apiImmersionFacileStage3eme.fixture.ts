import { ApiImmersionFacileStage3emeRechercheResponse } from './apiImmersionFacileStage3eme';

export function anApiImmersionFacileStage3eme(override?: Partial<ApiImmersionFacileStage3emeRechercheResponse>): ApiImmersionFacileStage3emeRechercheResponse {
	return {
		address: {
			city: 'Paris',
			departmentCode: '75',
			postcode: '75001',
			streetNumberAndAddress: '1 Rue de la Lune',
		},
		contactMode: 'IN_PERSON',
		fitForDisabledWorkers: true,
		name: 'La Boulangerie',
		numberOfEmployeeRange: '1-9',
		romeLabel: 'Boulangerie',
		voluntaryToImmersion: true,
		...override,
	};
}
