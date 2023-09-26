import {
	Localisations,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/localisations';
import {
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export function mapToLocalisations(localisationList: RechercheLocalisationApiResponse): Localisations {
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
