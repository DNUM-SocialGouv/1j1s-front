import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

import {
	ApiImmersionFacileStage3eEt2deCandidature,
	ApiImmersionFacileStage3eEt2deRechercheResponse,
} from './apiImmersionFacileStage3eEt2de';

export function anApiImmersionFacileStage3eEt2de(override?: Partial<ApiImmersionFacileStage3eEt2deRechercheResponse>): ApiImmersionFacileStage3eEt2deRechercheResponse {
	return {
		address: {
			city: 'Paris',
			departmentCode: '75',
			postcode: '75001',
			streetNumberAndAddress: '1 Rue de la Lune',
		},
		appellations: [
			{
				appellationCode: '11573',
			},
			{
				appellationCode: '11574',
			},
		],
		contactMode: ModeDeContact.IN_PERSON,
		fitForDisabledWorkers: true,
		name: 'La Boulangerie',
		numberOfEmployeeRange: '1-9',
		romeLabel: 'Boulangerie',
		siret: '12345678912345',
		voluntaryToImmersion: true,
		...override,
	};
}

export function anApiImmersionFacileStage3eEt2deCandidature(override?: Partial<ApiImmersionFacileStage3eEt2deCandidature>): ApiImmersionFacileStage3eEt2deCandidature {
	return {
		appellationCode: '11573',
		contactMode: 'PHONE',
		potentialBeneficiaryEmail: 'email@example.com',
		potentialBeneficiaryFirstName: 'John',
		potentialBeneficiaryLastName: 'Doe',
		siret: '12345678912345',
		...override,
	};
}
