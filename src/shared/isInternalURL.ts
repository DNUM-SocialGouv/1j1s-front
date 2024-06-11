export default function isInternalURL(url: string, origin: string) {
	const urlObject = new URL(url, origin);
	return urlObject.origin === origin;
}
