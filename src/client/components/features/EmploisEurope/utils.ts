import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';


const getTagLocalisation = (emploiEurope: EmploiEurope): (string | undefined) => {
	if (emploiEurope.localisations.length > 1) {
		return 'Multi-localisations';
	} else if (emploiEurope.localisations.length === 1) {
		const localisation = emploiEurope.localisations[0];
		return localisation.pays && localisation.ville ? `${localisation.pays}/${localisation.ville}` : localisation.pays ?? localisation.ville;
	}
};

export const getTagsFromAnnonce = (emploiEurope: EmploiEurope): string[] => {

	const tags = [];

	const libelléLocalisation = getTagLocalisation(emploiEurope);
	if (libelléLocalisation) {
		tags.push(libelléLocalisation);
	}

	const typeContract = emploiEurope.typeContrat;
	if (typeContract) {
		tags.push(typeContract);
	}

	if (emploiEurope.tempsDeTravail) {
		tags.push(emploiEurope.tempsDeTravail);
	}
	
	if (emploiEurope.niveauEtudes && emploiEurope.niveauEtudes !== 'Autre') {
		tags.push(emploiEurope.niveauEtudes);
	}

	return tags;
};
