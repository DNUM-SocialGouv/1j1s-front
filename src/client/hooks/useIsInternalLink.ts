import { useMemo } from 'react';

import isInternalURL from '~/shared/isInternalURL';

const RESERVED_ORIGIN = 'https://www.example.com';

export function useIsInternalLink(href: string): boolean {
	return useMemo(() => {
		const origin = typeof window !== 'undefined' ? window.location.origin : RESERVED_ORIGIN;
		return isInternalURL(href, origin);
	}, [href]);
}
