import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useQueryParams(): Record<string, string | string[] | undefined> {
	const { query: queryFromRouter } = useRouter();

	return useMemo(() => (
		location != null
			? Object.fromEntries(new URLSearchParams(location.search))
			: queryFromRouter
	), [queryFromRouter]);
}
