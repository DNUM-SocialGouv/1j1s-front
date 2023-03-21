import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export interface AccompagnementQueryParams {
  codeCommune?: string
  libelleCommune?: string
  typeAccompagnement?: string
}

export function useAccompagnementQuery(): AccompagnementQueryParams {
	const { query } = useRouter();

	return useMemo(() => ({
		codeCommune: getSingleQueryParam(query.codeCommune),
		libelleCommune: getSingleQueryParam(query.libelleCommune),
		typeAccompagnement: getSingleQueryParam(query.typeAccompagnement),
	}), [query]);
}
