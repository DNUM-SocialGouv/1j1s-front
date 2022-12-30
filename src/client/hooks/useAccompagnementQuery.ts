import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export interface AccompagnementQueryParams {
  codeCommune?: string
  libelleCommune?: string
  typeAccompagnement?: string
}

export function useAccompagnementQuery(): AccompagnementQueryParams {
	const [accompagnementQueryParams, setAccompagnementQueryParams] = useState<AccompagnementQueryParams>({
		codeCommune: undefined,
		libelleCommune: undefined,
		typeAccompagnement: undefined,
	});

	const { query } = useRouter();

	useEffect(() => {
		setAccompagnementQueryParams({
			codeCommune: getSingleQueryParam(query.codeCommune),
			libelleCommune: getSingleQueryParam(query.libelleCommune),
			typeAccompagnement: getSingleQueryParam(query.typeAccompagnement),
		});
	}, [query]);

	return accompagnementQueryParams;
}
