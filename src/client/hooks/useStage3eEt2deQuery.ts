import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';

import { getSingleQueryParam } from '../utils/queryParams.utils';

export type Stage3eEt2deQueryParams = {
	codeMetier?: string
	libelleMetier?: string
	distanceCommune?: string
} & CommuneQueryParams

export function useStage3eEt2deQuery(): Stage3eEt2deQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();
	return useMemo(() => ({
		codeMetier: getSingleQueryParam(query.codeMetier),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
		...communeQuery,
	}), [communeQuery, query.codeMetier, query.distanceCommune, query.libelleMetier]);
}
