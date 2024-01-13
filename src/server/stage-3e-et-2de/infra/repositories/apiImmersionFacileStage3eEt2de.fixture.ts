import { ApiImmersionFacileStage3eEt2deRechercheResponse } from './apiImmersionFacileStage3eEt2de';

export function anApiImmersionFacileStage3eEt2de(override?: Partial<ApiImmersionFacileStage3eEt2deRechercheResponse>): ApiImmersionFacileStage3eEt2deRechercheResponse {
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