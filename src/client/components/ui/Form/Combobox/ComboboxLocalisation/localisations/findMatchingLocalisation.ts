import {
	formatLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/formatLibelleLocalisation';
import {
	Localisations,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/localisations';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export function findMatchingLocalisation(localisationList: Localisations, userInput: string) {
	const communeFound = localisationList.communeList.find((commune) => userInput === formatLibelleLocalisation(commune.nom, commune.codePostal));
	if (communeFound) {
		return {
			code: communeFound.codeInsee,
			codePostal: communeFound.codePostal,
			nom: communeFound.nom,
			type: TypeLocalisation.COMMUNE,
		};
	}

	const departementFound = localisationList.departementList.find((departement) => userInput === formatLibelleLocalisation(departement.nom, departement.code));
	if (departementFound) {
		return {
			code: departementFound.code,
			nom: departementFound.nom,
			type: TypeLocalisation.DEPARTEMENT,
		};
	}

	const regionFound = localisationList.regionList.find((region) => userInput === formatLibelleLocalisation(region.nom, region.code));
	if (regionFound) {
		return {
			code: regionFound.code,
			nom: regionFound.nom,
			type: TypeLocalisation.REGION,
		};
	}
	return null;
}
