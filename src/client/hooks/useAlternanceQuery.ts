import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface AlternanceQueryParams {
	codeRomes?: string
	libelleMetier?: string
	codeCommune?: string
	distanceCommune?: string
	libelleCommune?: string
	longitudeCommune?: string
	latitudeCommune?: string
}

export function useAlternanceQuery(): AlternanceQueryParams {
	const { query } = useRouter();

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
