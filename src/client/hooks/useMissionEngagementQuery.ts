import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type MissionEngagementQueryParams = {
  domain?: string
  codeCommune?: string
  codeRomes?: string
  distanceCommune?: string
  latitudeCommune?: string
  libelleCommune?: string
  longitudeCommune?: string
  metierSelectionne?: string
  ouvertsAuxMineurs?: true
	page?: string
}

export function useMissionEngagementQuery(): MissionEngagementQueryParams {
	const { query } = useRouter();
	return useMemo(() => ({
		codeCommune: getSingleQueryParam(query.codeCommune),
		codeRomes: getSingleQueryParam(query.codeRomes),
		distanceCommune: getSingleQueryParam(query.distanceCommune),
		domain: getSingleQueryParam(query.domain),
		latitudeCommune: getSingleQueryParam(query.latitudeCommune),
		libelleCommune: getSingleQueryParam(query.libelleCommune),
		longitudeCommune: getSingleQueryParam(query.longitudeCommune),
		ouvertsAuxMineurs: query.ouvertsAuxMineurs === 'true' || undefined,
		page: getSingleQueryParam(query.page),
	}), [query]);
}
