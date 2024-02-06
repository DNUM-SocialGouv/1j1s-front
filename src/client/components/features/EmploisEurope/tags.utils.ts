import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

export const LIBELLE_TAG_MULTI_LOCALISATIONS = 'Multi-localisation';

const getTagLocalisation = (emploiEurope: EmploiEurope): (string | undefined) => {
	if (emploiEurope.localisations.length > 1) {
		return LIBELLE_TAG_MULTI_LOCALISATIONS;
	} else if (emploiEurope.localisations.length === 1) {
		const localisation = emploiEurope.localisations[0];
		return localisation.pays && localisation.ville ? `${localisation.pays}/${localisation.ville}` : localisation.pays ?? localisation.ville;
	}
};

export const getTagsFromAnnonce = (emploiEurope: EmploiEurope): string[] => {

	const tags = [];

	const libelleLocalisation = getTagLocalisation(emploiEurope);
	if (libelleLocalisation) {
		tags.push(libelleLocalisation);
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
