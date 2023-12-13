export function formatNumberWithSpace(numberToFormat: number){
	return numberToFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
