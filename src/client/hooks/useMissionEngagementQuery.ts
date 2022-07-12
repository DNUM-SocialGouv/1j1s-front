import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface MissionEngagementQueryParams {
  domain?: string
  codeCommune?: string
  codeRomes?: string
  distanceCommune?: string
  latitudeCommune?: string
  libelleCommune?: string
  longitudeCommune?: string
  metierSelectionne?: string
}

export function useMissionEngagementQuery(): MissionEngagementQueryParams {
  const [missionEngagementQueryParams, setMissionEngagementQueryParams] = useState<MissionEngagementQueryParams>({
    codeCommune: undefined,
    codeRomes: undefined,
    distanceCommune: undefined,
    domain: undefined,
    latitudeCommune: undefined,
    libelleCommune: undefined,
    longitudeCommune: undefined,
    metierSelectionne: undefined,
  });

  const { query } = useRouter();

  useEffect(() => {
    setMissionEngagementQueryParams({
      codeCommune: getSingleQueryParam(query.codeCommune),
      codeRomes: getSingleQueryParam(query.codeRomes),
      distanceCommune: getSingleQueryParam(query.distanceCommune),
      domain: getSingleQueryParam(query.domain),
      latitudeCommune: getSingleQueryParam(query.latitudeCommune),
      libelleCommune: getSingleQueryParam(query.libelleCommune),
      longitudeCommune: getSingleQueryParam(query.longitudeCommune),
    });
  }, [query]);

  return missionEngagementQueryParams;
}
