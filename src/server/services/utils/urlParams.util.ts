export function removeUndefinedValueInQueryParameterList(queryList: Record<string, string>): void {
	Object.keys(queryList).forEach((key: string) => {
		if (queryList[key.toString()] === '' && !queryList[key.toString()]) delete queryList[key];
	});
}

const ALLOWED_QUERY_PARAMS_TYPE_LIST = ['string', 'number', 'boolean'];

export function transformObjectToQueryString<T extends object>(source: T): string {
	const filteredParams = Object.entries(source).filter(([, value]) => (
		ALLOWED_QUERY_PARAMS_TYPE_LIST.includes(typeof value)
	));
	const urlSearchParams = new URLSearchParams(filteredParams);
	return urlSearchParams.toString();
}
