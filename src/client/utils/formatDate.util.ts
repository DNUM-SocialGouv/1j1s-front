export function formatToFRLongDate(date: string): string {
	console.log(date);
	return new Date(date).toLocaleDateString('fr-FR', { dateStyle: 'long' });
}
