import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface AlternanceQueryParams {
  codeRomes?: string
  libelle?: string
}

export function useAlternanceQuery(): AlternanceQueryParams {
	const [alternanceQueryParams, setAlternanceQueryParams] = useState<AlternanceQueryParams>({
		codeRomes: undefined,
		libelle: undefined,
	});

	const { query } = useRouter();

	useEffect(() => {
		setAlternanceQueryParams({
			codeRomes: getSingleQueryParam(query.codeRomes),
			libelle: getSingleQueryParam(query.libelle),
		});
	}, [query]);

	return alternanceQueryParams;
}
