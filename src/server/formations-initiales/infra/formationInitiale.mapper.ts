import {
	FormationInitiale, ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import {
	FormationInitialeApiResponse, ResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';

function getTags(formationInitialeApiResponse: FormationInitialeApiResponse) {
	const tags = [];
	const isCertifiante = !(formationInitialeApiResponse.niveau_de_certification === '0' || formationInitialeApiResponse.niveau_de_certification === '');

	if (isCertifiante) tags.push('Certifiante');
	tags.push(formationInitialeApiResponse.niveau_de_sortie_indicatif);
	tags.push(formationInitialeApiResponse.duree);
	return tags;
}


export function formationInitialeMapper(formationInitialeApiResponse: FormationInitialeApiResponse): FormationInitiale {
	return {
		identifiant: getIdentifiant(formationInitialeApiResponse.url_et_id_onisep),
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: getTags(formationInitialeApiResponse),
		url_formation: formationInitialeApiResponse.url_et_id_onisep,
	};
}

export function formationInitialeRechercheMapper(resultatRechercheFormationInitialeApiResponse: ResultatRechercheFormationInitialeApiResponse): ResultatRechercheFormationsInitiales {
	return {
		formationsInitiales: resultatRechercheFormationInitialeApiResponse.results.map((formationInitiale) => formationInitialeMapper(formationInitiale)),
		nombreDeResultat: resultatRechercheFormationInitialeApiResponse.total,
	};
}

function getIdentifiant(url: string) {
	const regex = /slug\/([^/]+)/;
	const match = url.match(regex);
	if (match && match.length >= 2) {
		return match[1];
	}
	return undefined;
}
