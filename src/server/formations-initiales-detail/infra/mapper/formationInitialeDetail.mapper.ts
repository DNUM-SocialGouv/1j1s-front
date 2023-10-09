import { FormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.type';
import {
	StrapiFormationInitialeDetail,
} from '~/server/formations-initiales-detail/infra/strapiFormationInitialeDetail';


export function mapFormationInitiale(strapiFormationInitiale: StrapiFormationInitialeDetail): FormationInitialeDetailCMS {
	return {
		attendusParcoursup: strapiFormationInitiale.attendusParcoursup,
		conditionsAcces: strapiFormationInitiale.conditionsAcces,
		dateDeMiseAJour: strapiFormationInitiale.updatedAt,
		description: strapiFormationInitiale.description,
		poursuiteEtudes: strapiFormationInitiale.poursuiteEtudes,
	};
}
