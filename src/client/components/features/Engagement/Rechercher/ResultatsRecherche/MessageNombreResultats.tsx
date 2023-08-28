export function MessageNombreResultats({ nombreResultats, isServiceCivique, domaine }: {
	nombreResultats: number,
	isServiceCivique: boolean,
	domaine?: string
}) {
	const motMission = (nombreResultats > 1) ? 'missions' : 'mission';
	const categorie = isServiceCivique ? 'service civique' : 'bénévolat';

	const messageNbResultats = [
		nombreResultats.toString(),
		motMission,
		`de ${categorie}`,
		domaine && `pour ${domaine}`,
	].filter(Boolean)
		.join(' ');

	return messageNbResultats;
}
