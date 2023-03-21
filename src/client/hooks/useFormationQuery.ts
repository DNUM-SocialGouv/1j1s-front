import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface FormationQueryParams {
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
	const [formationQueryParams, setFormationQueryParams] = useState<FormationQueryParams>({
		codeCommune: undefined,
		codeRomes: undefined,
		distanceCommune: undefined,
		latitudeCommune: undefined,
		libelleCommune: undefined,
		libelleMetier: undefined,
		longitudeCommune: undefined,
		niveauEtudes: undefined,
	});

	const { query } = useRouter();

	useEffect(() => {
		setFormationQueryParams({
			codeCommune: getSingleQueryParam(query.codeCommune),
			codeRomes: getSingleQueryParam(query.codeRomes),
			distanceCommune: getSingleQueryParam(query.distanceCommune),
			latitudeCommune: getSingleQueryParam(query.latitudeCommune),
			libelleCommune: getSingleQueryParam(query.libelleCommune),
			libelleMetier: getSingleQueryParam(query.libelleMetier),
			longitudeCommune: getSingleQueryParam(query.longitudeCommune),
			niveauEtudes: getSingleQueryParam(query.niveauEtudes),
		});
	}, [query]);

	return formationQueryParams;
}
