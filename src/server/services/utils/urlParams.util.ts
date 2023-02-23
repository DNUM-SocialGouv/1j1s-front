export function removeUndefinedValueInQueryParameterList(queryList: Record<string, string>): void {
	Object.keys(queryList).forEach((key: string) => {
		if (queryList[key.toString()] === '' && !queryList[key.toString()]) delete queryList[key];
	});
}

const ALLOWED_QUERY_PARAMS_TYPE_LIST = ['string', 'number', 'boolean'];

export function transformObjectToQueryString<T extends object>(source: T): string {
	const urlSearchParams = new URLSearchParams();

	Object.entries(source).forEach(([key, value]) => {
		if(ALLOWED_QUERY_PARAMS_TYPE_LIST.includes(typeof value)) {
			urlSearchParams.append(key, value.toString());
		}
	});

	return urlSearchParams.toString();
}
