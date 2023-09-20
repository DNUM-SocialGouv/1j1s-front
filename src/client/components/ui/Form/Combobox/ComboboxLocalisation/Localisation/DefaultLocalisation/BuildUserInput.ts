import {
	formatLocalisationLibelle,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	DefaultLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/Localisation/DefaultLocalisation/DefaultLocalisation';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function buildUserInput(defaultLocalisation?: DefaultLocalisation) {
	if (!defaultLocalisation) return '';

	if (defaultLocalisation.type === TypeLocalisation.DEPARTEMENT || defaultLocalisation.type === TypeLocalisation.REGION) {
		return formatLocalisationLibelle(defaultLocalisation.nom, defaultLocalisation.code);
	} else if (defaultLocalisation.type === TypeLocalisation.COMMUNE) {
		return formatLocalisationLibelle(defaultLocalisation.nom, defaultLocalisation.codePostal);
	}
	return '';
}
