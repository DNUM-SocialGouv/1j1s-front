import { ApiImmersionFacileStage3emeEt2ndRechercheResponse } from './apiImmersionFacileStage3emeEt2nd';

export function anApiImmersionFacileStage3emeEt2nd(override?: Partial<ApiImmersionFacileStage3emeEt2ndRechercheResponse>): ApiImmersionFacileStage3emeEt2ndRechercheResponse {
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
