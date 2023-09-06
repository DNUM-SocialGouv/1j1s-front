import { DefaultValue } from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function createLocalisationDefaultValueFromQuery(defaultCode?: string, defaultType?: string, defaultNom?: string, defaultCodePostal?: string): DefaultValue | undefined {
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
