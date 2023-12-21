import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export interface AccompagnementQueryParams extends CommuneQueryParams {
	typeAccompagnement: string | undefined;
}

export function useAccompagnementQuery(): AccompagnementQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();

	return useMemo(() => ({
		typeAccompagnement: getSingleQueryParam(query.typeAccompagnement),
		...communeQuery,
	}), [communeQuery, query]);
}
