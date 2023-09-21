import { TypeLocalisation } from '~/server/localisations/domain/localisation';

import {
	formatLocalisationLibelle,
} from '../ComboboxLocalisation';
import {
	DefaultLocalisation,
} from './defaultLocalisation';

export function buildUserInput(defaultLocalisation?: DefaultLocalisation) {
	if (!defaultLocalisation) return '';

	if (defaultLocalisation.type === TypeLocalisation.DEPARTEMENT || defaultLocalisation.type === TypeLocalisation.REGION) {
		return formatLocalisationLibelle(defaultLocalisation.nom, defaultLocalisation.code);
	} else if (defaultLocalisation.type === TypeLocalisation.COMMUNE) {
		return formatLocalisationLibelle(defaultLocalisation.nom, defaultLocalisation.codePostal);
	}
	return '';
}
