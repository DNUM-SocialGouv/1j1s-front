import { MissionEngagementFiltre } from '~/server/engagement/domain/engagement';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export function buildParamètresRechercheApiEngagement(missionEngagementFiltre: MissionEngagementFiltre): string {
  const { from, domain, publisher, size, lon, lat, distance, openToMinors } = missionEngagementFiltre;
  // eslint-disable-next-line
  const queryList: Record<string, any> = {
    distance : distance ? `${distance}km`: distance,
    domain,
    from,
    lat,
    lon,
    openToMinors : openToMinors ? 'yes': undefined,
    publisher,
    size,
  };
  removeUndefinedValueInQueryParameterList(queryList);

  const params = new URLSearchParams(queryList);

  return params.toString();
}
