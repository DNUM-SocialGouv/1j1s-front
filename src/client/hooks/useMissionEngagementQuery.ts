import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type MissionEngagementQueryParams = {
	domain: string | undefined
	distanceCommune: string | undefined
	ouvertsAuxMineurs: true | undefined
	page: string | undefined
} & CommuneQueryParams

export function useMissionEngagementQuery(): MissionEngagementQueryParams {
	const { query } = useRouter();
	const communeQueryParams = useCommuneQuery();
	return useMemo(() => ({
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		domain: getSingleQueryParam(query.domain),
		ouvertsAuxMineurs: query.ouvertsAuxMineurs === 'true' || undefined,
		page: getSingleQueryParam(query.page),
		...communeQueryParams,
	}), [communeQueryParams, query]);
}
