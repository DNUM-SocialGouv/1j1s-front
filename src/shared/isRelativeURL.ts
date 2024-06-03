import { isValidURL } from '~/shared/isValidURL';

export default function isRelativeURL(url: string) {
	const isAbsolute = isValidURL(url);
	if (isAbsolute) {
		return false;
	}

	const aValidOrigin = 'https://localhost:3000';
	if (!isValidURL(`${aValidOrigin}${url}`)) {
		throw new TypeError(`Invalid URL "${url}"`);
	}

	return true;
}
