export function queryToArray(query: string | Array<string>, separator = ','): Array<string> {
	if (Array.isArray(query)) {
		return query;
	}
	return query.split(separator);
}
