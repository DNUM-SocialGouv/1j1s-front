import { useEffect, useMemo, useState } from 'react';

const PATHNAME_PREFIX = '/';
const ANCHOR_PREFIX = '#';

export function useIsInternalLink(href: string) {
	const [origin, setOrigin] = useState<string>('');

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	return useMemo(function () {
		return href?.startsWith(origin)
			|| href?.startsWith(PATHNAME_PREFIX)
			|| href?.startsWith(ANCHOR_PREFIX);
	}, [href, origin]);
}
