import {
	FormationInitialeDetail, ResultatRechercheFormationsInitiales,
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

export function formationInitialeDetailMapper(formationInitialeApiResponse: FormationInitialeApiResponse): FormationInitialeDetail {
	return {
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: getTags(formationInitialeApiResponse),
	};
}

export function formationInitialeRechercheMapper(resultatRechercheFormationInitialeApiResponse: ResultatRechercheFormationInitialeApiResponse): ResultatRechercheFormationsInitiales {
	return {
		formationsInitiales: resultatRechercheFormationInitialeApiResponse.results.map((formationInitiale) => ({
			identifiant: getIdentifiant(formationInitiale.url_et_id_onisep),
			libelle: formationInitiale.libelle_formation_principal,
			tags: getTags(formationInitiale),
		})),
		nombreDeResultat: resultatRechercheFormationInitialeApiResponse.total,
	};
};

function getIdentifiant(url: string) {
	const regex = /slug\/([^/]+)/;
	const match = url.match(regex);
	if (match && match.length >= 2) {
		return match[1];
	}
	return undefined;
};
