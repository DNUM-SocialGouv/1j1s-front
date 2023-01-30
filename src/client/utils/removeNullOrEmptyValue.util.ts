export function removeNullOrEmptyValue(obj: Record<string, unknown>) {
	const result: Record<string, unknown> = {};
	Object.entries(obj).forEach(([key, value]) => {
		if(!(value === '' || value === null)){
			result[key] = value;
		}
	});
	return result;
}
