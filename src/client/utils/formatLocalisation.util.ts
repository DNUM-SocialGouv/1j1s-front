import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import Localisation = AnnonceDeLogement.Localisation;

function doitSuffixerAdresse(localisation: AnnonceDeLogement.Localisation) {
	return localisation.ville != null
		&& localisation.adresse != null;
}

function doitWrapperCodePostal(localisation: AnnonceDeLogement.Localisation) {
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
