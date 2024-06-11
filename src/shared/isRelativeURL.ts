export default function isRelativeURL(url: string) {
	const aValidOrigin = 'https://google.com';
	const urlObject = new URL(url, aValidOrigin);
	return urlObject.origin === aValidOrigin;
}
