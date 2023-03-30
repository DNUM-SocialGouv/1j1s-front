import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type FormationQueryParams = {
	codeRomes?: string
	libelleMetier?: string
	codeCommune?: string
	distanceCommune?: string
	libelleCommune?: string
	longitudeCommune?: string
	latitudeCommune?: string
	niveauEtudes?: string
}

export function useFormationQuery(): FormationQueryParams {
	const { query } = useRouter();
	return useMemo(() => ({
		codeCommune: getSingleQueryParam(query.codeCommune),
		codeRomes: getSingleQueryParam(query.codeRomes),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		latitudeCommune: getSingleQueryParam(query.latitudeCommune),
		libelleCommune: getSingleQueryParam(query.libelleCommune),
		libelleMetier: getSingleQueryParam(query.libelleMetier),
		longitudeCommune: getSingleQueryParam(query.longitudeCommune),
		niveauEtudes: getSingleQueryParam(query.niveauEtudes),
	}), [query]);
}
