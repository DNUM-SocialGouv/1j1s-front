import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { getArrayQueryParam, getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type FormationQueryParams = {
	codeRomes?: string[]
	libelleMetier?: string
	distanceCommune?: string
	niveauEtudes?: string
} & CommuneQueryParams

export function useFormationQuery(): FormationQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();

	return useMemo(() => ({
		codeRomes: getArrayQueryParam(query.codeRomes),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
		niveauEtudes: getSingleQueryParam(query.niveauEtudes),
		...communeQuery,
	}), [query, communeQuery]);
}
