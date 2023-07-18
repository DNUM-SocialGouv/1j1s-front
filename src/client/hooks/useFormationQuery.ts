import { useMemo } from 'react';

import { useQueryParams } from '~/client/hooks/useQueryParams';
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
	const query = useQueryParams();

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
