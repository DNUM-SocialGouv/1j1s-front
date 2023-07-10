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

export function formationsInitialesMapper(formationsInitialesApiResponse: Array<FormationInitialeApiResponse>): Array<FormationInitiale> {
	return formationsInitialesApiResponse.map((formationInitialeApiResponse) => ({
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: getTags(formationInitialeApiResponse),
	}));
};
