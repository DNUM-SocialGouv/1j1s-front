import { useRouter } from 'next/router';

export function useQueryParams(): Record<string, string | string[] | undefined> {
	const { query } = useRouter();	// asynchronous

	return query;
}
