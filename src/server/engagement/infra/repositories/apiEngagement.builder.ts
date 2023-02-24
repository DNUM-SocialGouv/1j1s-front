import {
	MissionEngagement,
	NOMBRE_RÉSULTATS_MISSION_PAR_PAGE,
} from '~/server/engagement/domain/engagement';
import { ApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.response';
import { transformObjectToQueryString } from '~/server/services/utils/urlParams.util';

export function buildParamètresRechercheApiEngagement(
	rechercheMissionEngagement: MissionEngagement.Recherche.Benevolat | MissionEngagement.Recherche.ServiceCivique,
	publisher: string,
): string {
	const { page, domaine, localisation, ouvertAuxMineurs } = rechercheMissionEngagement;
	const computedFrom = (page - 1) * NOMBRE_RÉSULTATS_MISSION_PAR_PAGE;
	let queryParams: ApiEngagement.RechercherMission = {
		domain: domaine,
		from: computedFrom,
		publisher,
		size: NOMBRE_RÉSULTATS_MISSION_PAR_PAGE,
	};
	if(ouvertAuxMineurs) {
		queryParams.openToMinors = 'yes';
	}
	if(localisation) {
		queryParams = {
			...queryParams,
			distance: `${localisation.distance}km`,
			lat: localisation.latitude,
			lon: localisation.longitude,
		};
	}

	return transformObjectToQueryString(queryParams);
}
