import {
	CandidatureEmailStage3eEt2de,
	CandidatureEnPersonneStage3eEt2de,
	CandidatureTelephoneStage3eEt2de,
	ModeDeContact,
} from './candidatureStage3eEt2de';

export function aCandidatureTelephoneStage3eEt2de(overrides?: Partial<CandidatureTelephoneStage3eEt2de>): CandidatureTelephoneStage3eEt2de {
	return {
		appellationCode: '11573',
		email: 'email@example.com',
		modeDeContact: ModeDeContact.PHONE,
		nom: 'Doe',
		prenom: 'John',
		siret: '12345678912345',
		...overrides,
	};
}

export function aCandidatureEnPersonneStage3eEt2de(overrides?: Partial<CandidatureEnPersonneStage3eEt2de>): CandidatureEnPersonneStage3eEt2de {
	return {
		appellationCode: '11573',
		email: 'email@example.com',
		modeDeContact: ModeDeContact.IN_PERSON,
		nom: 'Doe',
		prenom: 'John',
		siret: '12345678912345',
		...overrides,
	};
}

export function aCandidatureEmailStage3eEt2de(overrides?: Partial<CandidatureEmailStage3eEt2de>): CandidatureEmailStage3eEt2de {
	return {
		appellationCode: '11573',
		email: 'email@example.com',
		message: 'Bonjour, je suis intéressé par une immersion dans votre boulangerie',
		modeDeContact: ModeDeContact.EMAIL,
		nom: 'Doe',
		objectif: 'Je veux apprendre à faire des croissants',
		prenom: 'John',
		siret: '12345678912345',
		telephone: '0123456789',
		...overrides,
	};
}
