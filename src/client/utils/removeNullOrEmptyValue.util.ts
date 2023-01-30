export function removeNullOrEmptyValue<T>(obj: T): Partial<T> {
	const result: Record<string, unknown> = {};
	Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
		if (value !== null && typeof value === 'object') {
			result[key] = removeNullOrEmptyValue(value);
		}
		else if (!(value === '' || value === null)) {
			result[key] = value;
		}
	});
	return result as Partial<T>;
}
