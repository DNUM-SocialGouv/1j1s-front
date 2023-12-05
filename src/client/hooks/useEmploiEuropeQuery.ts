import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export type EmploiEuropeQueryParams = {
	codePays?: string
	libellePays?: string
	motCle?: string
	page?: string
	typeContrat?: string
	niveauEtude?: string
}

export function useEmploiEuropeQuery(): EmploiEuropeQueryParams {
	const { query } = useRouter();

	return useMemo(() => ({
		codePays: getSingleQueryParam(query.codePays),
		libellePays: getSingleQueryParam(query.libellePays),
		motCle: getSingleQueryParam(query.motCle),
		niveauEtude: getSingleQueryParam(query.niveauEtude),
		page: getSingleQueryParam(query.page),
		typeContrat: getSingleQueryParam(query.typeContrat),
	}), [query]);
}
