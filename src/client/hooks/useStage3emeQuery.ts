import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';

import { getSingleQueryParam } from '../utils/queryParams.utils';

export type Stage3emeQueryParams = {
	codeMetier?: string
	libelleMetier?: string
	distanceCommune?: string
} & CommuneQueryParams

export function useStage3emeQuery(): Stage3emeQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();
	return useMemo(() => ({
		codeMetier: getSingleQueryParam(query.codeMetier),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
		...communeQuery,
	}), [communeQuery, query.codeMetier, query.distanceCommune, query.libelleMetier]);
}
