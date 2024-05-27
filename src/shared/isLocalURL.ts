export default function isLocalURL(url: string, origin: string) {
	const isRelative = !URL.canParse(url);

	if (!URL.canParse(origin)) {
		throw new TypeError('Invalid Origin');
	}
	if (isRelative && !URL.canParse(`${origin}${url}`)) {
		throw new TypeError('Invalid URL');
	}

	return isRelative || new URL(url).origin === origin;
}
