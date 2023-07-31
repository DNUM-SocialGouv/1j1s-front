export function formatToFRLongDate(date: string): string {
	return new Date(date).toLocaleDateString('fr-FR', { dateStyle: 'long' });
}
