import { useMemo } from 'react';

import { useQueryParams } from '~/client/hooks/useQueryParams';
import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type AlternanceQueryParams = {
	codeRomes?: string
	libelleMetier?: string
	codeCommune?: string
	distanceCommune?: string
	libelleCommune?: string
	longitudeCommune?: string
	latitudeCommune?: string
}

export function useAlternanceQuery(): AlternanceQueryParams {
	const query = useQueryParams();

	return useMemo(() => ({
		codeCommune: getSingleQueryParam(query.codeCommune),
		codeRomes: getSingleQueryParam(query.codeRomes),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		latitudeCommune: getSingleQueryParam(query.latitudeCommune),
		libelleCommune: getSingleQueryParam(query.libelleCommune),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
		longitudeCommune: getSingleQueryParam(query.longitudeCommune),
	}), [query]);
}
