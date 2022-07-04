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
  radius?: string
}

export function useAlternanceQuery(): AlternanceQueryParams {
  const [alternanceQueryParams, setAlternanceQueryParams] = useState<AlternanceQueryParams>({
    codeCommune: undefined,
    codeRomes: undefined,
    latitudeCommune: undefined,
    libelleCommune: undefined,
    longitudeCommune: undefined,
    metierSelectionne: undefined,
    radius: undefined,
  });

  const { query } = useRouter();

  useEffect(() => {
    setAlternanceQueryParams({
      codeCommune: getSingleQueryParam(query.codeCommune),
      codeRomes: getSingleQueryParam(query.codeRomes),
      latitudeCommune: getSingleQueryParam(query.latitudeCommune),
      libelleCommune: getSingleQueryParam(query.libelleCommune),
      longitudeCommune: getSingleQueryParam(query.longitudeCommune),
      metierSelectionne: getSingleQueryParam(query.metierSelectionne),
      radius: getSingleQueryParam(query.radius),
    });
  }, [query]);

  return alternanceQueryParams;
}
