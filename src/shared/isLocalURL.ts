export default function isLocalURL(url: string, origin: string) {
	const urlObject = new URL(url, origin);
	return urlObject.origin === origin;
}
