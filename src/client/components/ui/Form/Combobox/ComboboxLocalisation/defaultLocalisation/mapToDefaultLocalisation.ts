import {
	DefaultLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/defaultLocalisation/defaultLocalisation';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function mapToDefaultLocalisation(defaultCode?: string, defaultType?: string, defaultNom?: string, defaultCodePostal?: string): DefaultLocalisation | undefined {
	if (!defaultType) {
		return undefined;
	}
	switch (defaultType) {
		case TypeLocalisation.COMMUNE:
			return defaultCode && defaultNom && defaultCodePostal ? {
				codeInsee: defaultCode,
				codePostal: defaultCodePostal,
				nom: defaultNom,
				type: TypeLocalisation.COMMUNE,
			} : undefined;
		case TypeLocalisation.DEPARTEMENT:
			return defaultCode && defaultNom ? {
				code: defaultCode,
				nom: defaultNom,
				type: TypeLocalisation.DEPARTEMENT,
			} : undefined;
		case TypeLocalisation.REGION:
			return defaultCode && defaultNom ? {
				code: defaultCode,
				nom: defaultNom,
				type: TypeLocalisation.REGION,
			} : undefined;
		default:
			return undefined;
	}
}
