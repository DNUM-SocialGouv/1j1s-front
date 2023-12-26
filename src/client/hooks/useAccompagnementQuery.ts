import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type AccompagnementQueryParams = {
	typeAccompagnement: string | undefined;
} & CommuneQueryParams

export function useAccompagnementQuery(): AccompagnementQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();

	return useMemo(() => ({
		typeAccompagnement: getSingleQueryParam(query.typeAccompagnement),
		...communeQuery,
	}), [communeQuery, query]);
}
