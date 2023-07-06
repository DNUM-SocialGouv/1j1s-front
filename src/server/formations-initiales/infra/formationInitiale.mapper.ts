import { FormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeApiResponse } from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';

export function formationInitialeDetailMapper(formationInitialeApiResponse: FormationInitialeApiResponse): FormationInitialeDetail {
	return {
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		tags: [formationInitialeApiResponse.duree,
			formationInitialeApiResponse.niveau_de_sortie_indicatif,
			formationInitialeApiResponse.niveau_de_certification === '0' || formationInitialeApiResponse.niveau_de_certification === '' ? '' : 'Certifiante'],
	};
}
