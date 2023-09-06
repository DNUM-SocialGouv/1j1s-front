export function removeParenthesis(query: string): string { // FIXME: Meilleur nom de fichier ?
	return query.replace(/[()]/g, '');
}
