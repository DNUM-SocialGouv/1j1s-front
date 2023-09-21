import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function getCodeLibelleLocalisation(code?: string, codePostal?: string, type?: string) {
	switch (type) {
		case TypeLocalisation.COMMUNE:
			return codePostal;
		case TypeLocalisation.DEPARTEMENT:
		case TypeLocalisation.REGION:
			return code;
		default:
			return undefined;
	}
}
