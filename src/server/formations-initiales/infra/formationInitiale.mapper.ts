import { FormationInitiale, FormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeApiResponse } from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';

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

export function formationInitialeRechercheMapper(formationsInitialesApiResponse: Array<FormationInitialeApiResponse>): Array<FormationInitiale> {
	return formationsInitialesApiResponse.map((formationInitialeApiResponse) => ({
		identifiant: getIdentifiant(formationInitialeApiResponse.url_et_id_onisep),
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: getTags(formationInitialeApiResponse),
	}));
}

function getIdentifiant(url: string) {
	const regex = /slug\/([^/]+)/;
	const match = url.match(regex);
	if (match && match.length >= 2) {
		return match[1];
	}
	return undefined;
};
