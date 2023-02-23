import { MissionEngagementFiltre, NOMBRE_RÉSULTATS_MISSION_PAR_PAGE } from '~/server/engagement/domain/engagement';
import { ApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.response';
import { transformObjectToQueryString } from '~/server/services/utils/urlParams.util';

export function buildParamètresRechercheApiEngagement(
	missionEngagementFiltre: MissionEngagementFiltre,
	publisher: string,
): string {
	const { page, domaine, localisation, ouvertAuxMineurs } = missionEngagementFiltre;
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
