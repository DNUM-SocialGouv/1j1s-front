export default function isRelativeURL(url: string) {
	const isAbsolute = URL.canParse(url);
	if (isAbsolute) {
		return false;
	}

	const aValidOrigin = 'https://localhost:3000';
	if (!URL.canParse(`${aValidOrigin}${url}`)) {
		throw new TypeError('Invalid URL');
	}

	return true;
}
