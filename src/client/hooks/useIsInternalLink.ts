import { useEffect, useMemo, useState } from 'react';

import isInternalURL from '~/shared/isInternalURL';

const RESERVED_ORIGIN = 'https://www.example.com';

export function useIsInternalLink(href: string): boolean {
	const [origin, setOrigin] = useState<string | undefined>(undefined);

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	return useMemo(function () {
		return origin ? isInternalURL(href, origin) : isInternalURL(href, RESERVED_ORIGIN);
	}, [href, origin]);
}
