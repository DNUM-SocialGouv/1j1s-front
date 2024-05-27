import { useEffect, useMemo, useState } from 'react';

import isLocalURL from '~/shared/isLocalURL';

export function useIsInternalLink(href: string): boolean {
	const [origin, setOrigin] = useState<string>('');

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	return useMemo(function () {
		return Boolean(origin) && isLocalURL(href, origin);
	}, [href, origin]);
}
