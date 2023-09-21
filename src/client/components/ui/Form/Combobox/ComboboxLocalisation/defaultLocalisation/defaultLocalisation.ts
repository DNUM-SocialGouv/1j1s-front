import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export type DefaultLocalisation = {
	code: string
	nom: string
	type: TypeLocalisation.DEPARTEMENT | TypeLocalisation.REGION
} | {
	codeInsee: string
	codePostal: string
	nom: string
	type: TypeLocalisation.COMMUNE
}
