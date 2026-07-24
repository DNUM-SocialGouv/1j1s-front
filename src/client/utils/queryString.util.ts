function normaliser(queryString: string): string {
	const params = new URLSearchParams(queryString);
	params.sort();
	return params.toString();
}

export function estQueryIdentiqueAAsPath(asPath: string, query: string): boolean {
	const [, queryCourante = ''] = asPath.split('?');
	return normaliser(query) === normaliser(queryCourante);
}
