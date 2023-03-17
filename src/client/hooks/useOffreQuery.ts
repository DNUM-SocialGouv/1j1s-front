import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface OffreQueryParams {
  motCle?: string
  typeDeContrats?: string
  typeLocalisation?: string
  codeLocalisation?: string
  libelleLocalisation?: string
  tempsDeTravail?: string
  experienceExigence?: string
  grandDomaine?: string
}

export function useOffreQuery(): OffreQueryParams {

	const { query } = useRouter();

	return useMemo(() => ({
		codeLocalisation: getSingleQueryParam(query.codeLocalisation),
		experienceExigence: getSingleQueryParam(query.experienceExigence),
		grandDomaine: getSingleQueryParam(query.grandDomaine),
		libelleLocalisation: getSingleQueryParam(query.libelleLocalisation),
		motCle: getSingleQueryParam(query.motCle),
		tempsDeTravail: getSingleQueryParam(query.tempsDeTravail),
		typeDeContrats: getSingleQueryParam(query.typeDeContrats),
		typeLocalisation: getSingleQueryParam(query.typeLocalisation),
	}), [query]);
}
