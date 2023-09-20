import {
	formatLocalisationLibelle,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	LocalisationOptions,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/Localisation/LocalisationOptions/LocalisationOptions';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function findMatchingOption(localisationList: LocalisationOptions, userInput: string) {
	const communeFound = localisationList.communeList.find((commune) => userInput === formatLocalisationLibelle(commune.nom, commune.codePostal));
	if (communeFound) {
		return {
			code: communeFound.codeInsee,
			codePostal: communeFound.codePostal,
			nom: communeFound.nom,
			type: TypeLocalisation.COMMUNE,
		};
	}

	const departementFound = localisationList.departementList.find((departement) => userInput === formatLocalisationLibelle(departement.nom, departement.code));
	if (departementFound) {
		return {
			code: departementFound.code,
			nom: departementFound.nom,
			type: TypeLocalisation.DEPARTEMENT,
		};
	}

	const regionFound = localisationList.regionList.find((region) => userInput === formatLocalisationLibelle(region.nom, region.code));
	if (regionFound) {
		return {
			code: regionFound.code,
			nom: regionFound.nom,
			type: TypeLocalisation.REGION,
		};
	}
	return null;
}
