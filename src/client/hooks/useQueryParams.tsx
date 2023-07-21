import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useQueryParams(): Record<string, string | string[] | undefined> {
	const queryFromLocation = useMemo(() => (
		Object.fromEntries(new URLSearchParams(location?.search))			// synchronous
	), []);
	const { query: queryFromRouter } = useRouter();	// asynchronous

	return queryFromLocation ?? queryFromRouter;
}
