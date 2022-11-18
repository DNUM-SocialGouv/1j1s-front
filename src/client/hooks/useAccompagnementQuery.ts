import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface AccompagnementQueryParams {
  codeCommune?: string
  libelleCommune?: string
}

export function useAccompagnementQuery(): AccompagnementQueryParams {
  const [accompagnementQueryParams, setAccompagnementQueryParams] = useState<AccompagnementQueryParams>({
    codeCommune: undefined,
    libelleCommune: undefined,
  });

  const { query } = useRouter();

  useEffect(() => {
    setAccompagnementQueryParams({
      codeCommune: getSingleQueryParam(query.codeCommune),
      libelleCommune: getSingleQueryParam(query.libelleCommune),
    });
  }, [query]);

  return accompagnementQueryParams;
}
