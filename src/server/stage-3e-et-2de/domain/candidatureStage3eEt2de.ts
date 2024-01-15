export interface CandidatureStage3eEt2de {
	prenom: string
	nom: string
	email: string
	appellationCode: string
	siret: string
	modeDeContact: string
}

export enum ModeDeContact {
	EMAIL = 'EMAIL',
	IN_PERSON = 'IN_PERSON',
	PHONE = 'PHONE',
}
