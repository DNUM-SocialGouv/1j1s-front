export function getSingleQueryParam(queryParam: string | string[] | undefined): string | undefined {
	return typeof queryParam === 'string' ? queryParam : undefined;
}

export function getArrayQueryParam(queryParam: string | string[] | undefined): string[] | undefined {
	if (!queryParam) { return undefined; }
	if (Array.isArray(queryParam)) { return queryParam; }
	return queryParam.split(',');
}
