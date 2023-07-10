import { createSuccess } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

import { FormationInitialeInterface } from './formationInitiale.service';

export function aResultatFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		libelle: 'Formation Boulanger Chez Pierre Hermé',
		tags: ['Certifiante', 'Bac + 2', '1 an'],
		...override,
	};
}

export function aFormationInitialeService(
	rechercherFormationInitialeValue = aResultatFormationInitiale(),
): FormationInitialeInterface {
	return {
		rechercherFormationInitiale: jest.fn().mockResolvedValue(createSuccess([rechercherFormationInitialeValue])),
	};
}
