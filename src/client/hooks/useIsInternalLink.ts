import { useEffect, useMemo, useState } from 'react';

import isInternalURL from '~/shared/isInternalURL';

export function useIsInternalLink(href: string): boolean {
	const [origin, setOrigin] = useState<string>('');

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	return useMemo(function () {
		return Boolean(origin) && isInternalURL(href, origin);
	}, [href, origin]);
}
