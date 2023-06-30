import { useRouter } from 'next/router';
import { useMemo } from 'react';

export type FormationInitialeQueryParams = {
	motCle?: string
}

export function useFormationInitialeQuery(): FormationInitialeQueryParams {

	const { query } = useRouter();
	return useMemo(() => ({
		motCle: typeof query.motCle === 'string' ? query.motCle : '',
	}), [query]);
}
