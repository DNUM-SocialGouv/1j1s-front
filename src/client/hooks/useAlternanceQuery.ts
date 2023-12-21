import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { getArrayQueryParam, getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type AlternanceQueryParams = {
	codeRomes: string[] | undefined
	libelleMetier: string | undefined
	distanceCommune: string | undefined
} & CommuneQueryParams

export function useAlternanceQuery(): AlternanceQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();

	return useMemo(() => ({
		codeRomes: getArrayQueryParam(query.codeRomes),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
		...communeQuery,
	}), [query, communeQuery]);
}
