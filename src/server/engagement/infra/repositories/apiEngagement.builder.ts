import { MissionEngagementFiltre, NOMBRE_RÉSULTATS_MISSION_PAR_PAGE } from '~/server/engagement/domain/engagement';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export function buildParamètresRechercheApiEngagement(
	missionEngagementFiltre: MissionEngagementFiltre,
): string {
	const { from, domain, publisher, size, lon, lat, distance, openToMinors } = missionEngagementFiltre;
	const computedFrom = (from - 1) * NOMBRE_RÉSULTATS_MISSION_PAR_PAGE;
	const queryList: Record<string, string> = {
		distance : distance ? `${distance}km`: '',
		domain,
		from: computedFrom.toString(),
		lat: lat ? lat.toString() : '',
		lon: lon ? lon.toString() : '',
		openToMinors : openToMinors ? 'yes': '',
		publisher,
		size: size ? size.toString() : '',
	};
	removeUndefinedValueInQueryParameterList(queryList);

	const params = new URLSearchParams(queryList);

	return params.toString();
}
