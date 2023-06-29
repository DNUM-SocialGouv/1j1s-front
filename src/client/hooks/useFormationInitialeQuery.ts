import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '../utils/queryParams.utils';

export type FormationInitialeQueryParams = {
	domaine?: string
}

export function useFormationInitialeQuery(): FormationInitialeQueryParams {

	const { query } = useRouter();

	return useMemo(() => ({
		domaine: getSingleQueryParam(query.domaine),
	}), [query]);
}
