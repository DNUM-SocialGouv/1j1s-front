const duree = (dureeEnJour: number) => {
	if (dureeEnJour % 365 === 0) {
		return `${dureeEnJour / 365} ans`;
	}
	if (dureeEnJour % 30 === 0) {
		return `${dureeEnJour / 30} mois`;
	}
	if (dureeEnJour % 7 === 0) {
		return `${dureeEnJour / 7} semaines`;
	}
	return `${dureeEnJour} jours`;
};

export const dureeCategorisee = (dureeEnJour: number) => {
	if (dureeEnJour === 0) {
		return '';
	}
	if (dureeEnJour < 30) {
		return '< 1 mois';
	}
	if (dureeEnJour === 30) {
		return '1 mois';
	}
	if (dureeEnJour === 60) {
		return '2 mois';
	}
	if (dureeEnJour === 90) {
		return '3 mois';
	}
	if (dureeEnJour === 120) {
		return '4 mois';
	}
	if (dureeEnJour === 150) {
		return '5 mois';
	}
	if (dureeEnJour === 180) {
		return '6 mois';
	}
	if (dureeEnJour > 180) {
		return '> 6 mois';
	}
	return duree(dureeEnJour);
};
