import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

import {
	ApiImmersionFacileStage3eEt2deCandidatureEmail, ApiImmersionFacileStage3eEt2deCandidatureEnPersonne,
	ApiImmersionFacileStage3eEt2deCandidatureTelephone,
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
				appellationLabel: 'Boulangerie',
			},
			{
				appellationCode: '11574',
				appellationLabel: 'Pâtisserie',
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

export function anApiImmersionFacileStage3eEt2deCandidatureTelephone(override?: Partial<ApiImmersionFacileStage3eEt2deCandidatureTelephone>): ApiImmersionFacileStage3eEt2deCandidatureTelephone {
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

export function anApiImmersionFacileStage3eEt2deCandidatureEmail(override?: Partial<ApiImmersionFacileStage3eEt2deCandidatureEmail>): ApiImmersionFacileStage3eEt2deCandidatureEmail {
	return {
		appellationCode: '11573',
		contactMode: 'EMAIL',
		immersionObjective: 'Je veux apprendre à faire des croissants',
		message: 'Bonjour, je suis intéressé par une immersion dans votre boulangerie',
		potentialBeneficiaryEmail: 'email@example.com',
		potentialBeneficiaryFirstName: 'John',
		potentialBeneficiaryLastName: 'Doe',
		potentialBeneficiaryPhone: '0123456789',
		siret: '12345678912345',
		...override,
	};
}

export function anApiImmersionFacileStage3eEt2deCandidatureEnPersonne(override?: Partial<ApiImmersionFacileStage3eEt2deCandidatureEnPersonne>): ApiImmersionFacileStage3eEt2deCandidatureEnPersonne {
	return {
		appellationCode: '11573',
		contactMode: 'IN_PERSON',
		potentialBeneficiaryEmail: 'email@example.com',
		potentialBeneficiaryFirstName: 'John',
		potentialBeneficiaryLastName: 'Doe',
		siret: '12345678912345',
		...override,
	};
}
