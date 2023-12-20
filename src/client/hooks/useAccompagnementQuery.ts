import { useRouter } from 'next/router';

import { CommuneQueryParams, useCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export interface AccompagnementQueryParams extends CommuneQueryParams {
	typeAccompagnement?: string
}

export function useAccompagnementQuery(): AccompagnementQueryParams {
	const { query } = useRouter();
	const communeQuery = useCommuneQuery();

	return {
		typeAccompagnement: getSingleQueryParam(query.typeAccompagnement),
		...communeQuery,
	};
}
