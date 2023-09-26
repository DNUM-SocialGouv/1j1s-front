import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

// FIXME (GAFI 20-03-2023): Les alternances n'utilisent que certains de ces champs, un utilisateur ne devrait pas
//  pouvoir utiliser les autres champs.
export type OffreQueryParams = {
  motCle?: string
  typeDeContrats?: string
  typeLocalisation?: string
  codeLocalisation?: string
  nomLocalisation?: string
  codePostalLocalisation?: string
  tempsDeTravail?: string
  experienceExigence?: string
  grandDomaine?: string
  page?: string
}

export function useOffreQuery(): OffreQueryParams {
	const { query } = useRouter();

	return useMemo(() => ({
		codeLocalisation: getSingleQueryParam(query.codeLocalisation),
		codePostalLocalisation: getSingleQueryParam(query.codePostalLocalisation),
		experienceExigence: getSingleQueryParam(query.experienceExigence),
		grandDomaine: getSingleQueryParam(query.grandDomaine),
		motCle: getSingleQueryParam(query.motCle),
		nomLocalisation: getSingleQueryParam(query.nomLocalisation),
		page: getSingleQueryParam(query.page),
		tempsDeTravail: getSingleQueryParam(query.tempsDeTravail),
		typeDeContrats: getSingleQueryParam(query.typeDeContrats),
		typeLocalisation: getSingleQueryParam(query.typeLocalisation),
	}), [
		query.codeLocalisation,
		query.codePostalLocalisation,
		query.experienceExigence,
		query.grandDomaine,
		query.motCle,
		query.nomLocalisation,
		query.page,
		query.tempsDeTravail,
		query.typeDeContrats,
		query.typeLocalisation,
	]);
}
