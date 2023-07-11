import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type FormationInitialeQueryParams = {
	motCle?: string
	page?: string
}

export function useFormationInitialeQuery(): FormationInitialeQueryParams {

	const { query } = useRouter();
	return useMemo(() => ({
		motCle: getSingleQueryParam(query.motCle),
		page: getSingleQueryParam(query.page),
	}), [query]);
}
