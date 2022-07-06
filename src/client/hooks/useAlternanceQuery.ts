import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface AlternanceQueryParams {
  metierSelectionne?: string
  codeRomes?: string
  codeCommune?: string
  libelleCommune?: string
  longitudeCommune?: string
  latitudeCommune?: string
  distanceCommune?: string
}

export function useAlternanceQuery(): AlternanceQueryParams {
  const [alternanceQueryParams, setAlternanceQueryParams] = useState<AlternanceQueryParams>({
    codeCommune: undefined,
    codeRomes: undefined,
    distanceCommune: undefined,
    latitudeCommune: undefined,
    libelleCommune: undefined,
    longitudeCommune: undefined,
    metierSelectionne: undefined,
  });

  const { query } = useRouter();

  useEffect(() => {
    setAlternanceQueryParams({
      codeCommune: getSingleQueryParam(query.codeCommune),
      codeRomes: getSingleQueryParam(query.codeRomes),
      distanceCommune: getSingleQueryParam(query.distanceCommune),
      latitudeCommune: getSingleQueryParam(query.latitudeCommune),
      libelleCommune: getSingleQueryParam(query.libelleCommune),
      longitudeCommune: getSingleQueryParam(query.longitudeCommune),
      metierSelectionne: getSingleQueryParam(query.metierSelectionne),
    });
  }, [query]);

  return alternanceQueryParams;
}
