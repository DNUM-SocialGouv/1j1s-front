export function removeParenthesis(query: string): string {
	return query.replace(/[()]/g, '');
}
