import { Localisation } from '~/server/logements/infra/strapiAnnonceDeLogement';

function doitSuffixerAdresse(localisation: Localisation) {
	return localisation.ville != null
		&& localisation.adresse != null;
}

function doitWrapperCodePostal(localisation: Localisation) {
	return localisation.codePostal != null && (localisation.ville != null || localisation.adresse != null);
}

export default function formatLocalisation(localisation: Localisation) {
	const ville = localisation.ville ?? '';
	let adresse = localisation.adresse ?? '';
	let codePostal = localisation.codePostal ?? '';
	if (doitSuffixerAdresse(localisation))
		adresse += ', ';
	if (doitWrapperCodePostal(localisation))
		codePostal = ` (${codePostal})`;
	return `${adresse}${ville}${codePostal}`;
}
