import {
	DefaultLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/defaultLocalisation/defaultLocalisation';
import {
	formatLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/formatLibelleLocalisation';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function buildUserInput(defaultLocalisation?: DefaultLocalisation) {
	if (!defaultLocalisation) return '';

	if (defaultLocalisation.type === TypeLocalisation.DEPARTEMENT || defaultLocalisation.type === TypeLocalisation.REGION) {
		return formatLibelleLocalisation(defaultLocalisation.nom, defaultLocalisation.code);
	} else if (defaultLocalisation.type === TypeLocalisation.COMMUNE) {
		return formatLibelleLocalisation(defaultLocalisation.nom, defaultLocalisation.codePostal);
	}
	return '';
}
