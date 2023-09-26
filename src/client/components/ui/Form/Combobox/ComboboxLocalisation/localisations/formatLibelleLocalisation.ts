export function formatLibelleLocalisation(nom: string, code?: string) {
	return code ? `${nom} (${code})` : nom;
}
