export default function isLocalURL(url: string, origin: string) {
	const isRelative = !URL.canParse(url);
	return isRelative || new URL(url).origin === origin;
}
