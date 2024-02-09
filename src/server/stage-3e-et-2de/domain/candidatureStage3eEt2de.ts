export type CandidatureStage3eEt2de = CandidatureTelephoneStage3eEt2de | CandidatureEnPersonneStage3eEt2de | CandidatureEmailStage3eEt2de

export type CandidatureTelephoneStage3eEt2de = {
	prenom: string
	nom: string
	email: string
	appellationCode: string
	siret: string
	modeDeContact: ModeDeContact.PHONE
}

export type CandidatureEnPersonneStage3eEt2de = {
	prenom: string
	nom: string
	email: string
	appellationCode: string
	siret: string
	modeDeContact: ModeDeContact.IN_PERSON
}

export type CandidatureEmailStage3eEt2de = {
	prenom: string
	nom: string
	email: string
	appellationCode: string
	siret: string
	modeDeContact: ModeDeContact.EMAIL
	message: string
	telephone: string
	objectif: string
}

export enum ModeDeContact {
	EMAIL = 'EMAIL',
	IN_PERSON = 'IN_PERSON',
	PHONE = 'PHONE',
}
