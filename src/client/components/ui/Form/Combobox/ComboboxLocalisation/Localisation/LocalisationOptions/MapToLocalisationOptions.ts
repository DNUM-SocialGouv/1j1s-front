import {
	LocalisationOptions,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/Localisation/LocalisationOptions/LocalisationOptions';
import {
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export function mapToLocalisationOptions(localisationList: RechercheLocalisationApiResponse): LocalisationOptions {
	return {
		communeList: localisationList.communeList.map((commune) => ({
			codeInsee: commune.code,
			codePostal: commune.codePostal,
			nom: commune.nom,
		})),
		departementList: localisationList.departementList,
		regionList: localisationList.regionList,
	};
}
