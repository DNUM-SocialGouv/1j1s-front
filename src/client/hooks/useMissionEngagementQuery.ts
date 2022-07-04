import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface MissionEngagementQueryParams {
  domain?: string
  distance?: string
}

export function useMissionEngagementQuery(): MissionEngagementQueryParams {
  const [missionEngagementQueryParams, setMissionEngagementQueryParams] = useState<MissionEngagementQueryParams>({
    distance: undefined,
    domain: undefined,
  });

  const { query } = useRouter();

  useEffect(() => {
    setMissionEngagementQueryParams({
      distance: getSingleQueryParam(query.distance),
      domain: getSingleQueryParam(query.domain),
    });
  }, [query]);

  return missionEngagementQueryParams;
}
