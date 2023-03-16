export function removeUndefinedKeys<T>(payload: T): T {
	return JSON.parse(JSON.stringify(payload));
}
