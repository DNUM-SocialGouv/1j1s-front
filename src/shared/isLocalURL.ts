import { URL } from 'url';

import isRelativeURL from '~/shared/isRelativeURL';

export default function isLocalURL(url: string, origin: string) {
	const isRelative = isRelativeURL(url);

	if (!URL.canParse(origin)) {
		throw new TypeError(`Invalid Origin "${origin}"`);
	}
	if (isRelative && !URL.canParse(`${origin}${url}`)) {
		throw new TypeError(`Invalid URL "${url}"`);
	}

	return isRelative || new URL(url).origin === origin;
}
