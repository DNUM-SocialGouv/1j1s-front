import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

import { FormationInitialeDetailCMS } from '../../cms/domain/formationInitiale.type';

export function mapFormationInitiale(formationInitiale: Strapi.CollectionType.FormationInitialeDetail): FormationInitialeDetailCMS {
	return {
		attendusParcoursup: formationInitiale.attendusParcoursup,
		conditionsAcces: formationInitiale.conditionsAcces,
		dateDeMiseAJour: formationInitiale.updatedAt,
		description: formationInitiale.description,
		poursuiteEtudes: formationInitiale.poursuiteEtudes,
	};
}
