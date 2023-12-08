import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '../utils/queryParams.utils';

export type Stage3emeQueryParams = {
	codeMetier?: string
	libelleMetier?: string
}

export function useStage3emeQuery(): Stage3emeQueryParams {
	const { query } = useRouter();

	return useMemo(() => ({
		codeMetier: getSingleQueryParam(query.codeMetier),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
	}), [query]);
}
