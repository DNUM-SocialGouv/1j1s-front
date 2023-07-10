
import { FormationInitiale, FormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeApiResponse } from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';

function getTags(formationInitialeApiResponse: FormationInitialeApiResponse) {
	const tags = [formationInitialeApiResponse.duree,
		formationInitialeApiResponse.niveau_de_sortie_indicatif];
	const isCertifiante = !(formationInitialeApiResponse.niveau_de_certification === '0' || formationInitialeApiResponse.niveau_de_certification === '');
	if (isCertifiante) tags.push('Certifiante');
	return tags;
}

export function formationInitialeDetailMapper(formationInitialeApiResponse: FormationInitialeApiResponse): FormationInitialeDetail {
	return {
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: getTags(formationInitialeApiResponse),
	};
}

function getCertification(niveauDeCertification: string) {
	return niveauDeCertification === '0' || niveauDeCertification === '' ? '' : 'Certifiante';
}

export function formationsInitialesMapper(formationsInitialesApiResponse: Array<FormationInitialeApiResponse>): Array<FormationInitiale> {
	return formationsInitialesApiResponse.map((formationInitialeApiResponse) => ({
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: [getCertification(formationInitialeApiResponse.niveau_de_certification),
			formationInitialeApiResponse.niveau_de_sortie_indicatif,
			formationInitialeApiResponse.duree],
	}));
};
