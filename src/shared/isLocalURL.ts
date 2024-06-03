import isRelativeURL from '~/shared/isRelativeURL';
import { isValidURL } from '~/shared/isValidURL';

export default function isLocalURL(url: string, origin: string) {
	const isRelative = isRelativeURL(url);

	if (!isValidURL(origin)) {
		throw new TypeError(`Invalid Origin "${origin}"`);
	}
	if (isRelative && !isValidURL(`${origin}${url}`)) {
		throw new TypeError(`Invalid URL "${url}"`);
	}

	return isRelative || new URL(url).origin === origin;
}
