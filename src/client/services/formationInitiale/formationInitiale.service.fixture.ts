import { createSuccess } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

import { FormationInitialeInterface } from './formationInitiale.service';

export function aResultatListFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		libelle: 'Formation Boulanger Chez Pierre Hermé',
		...override,
	};
}

export function aFormationInitialeService(
	rechercherFormationInitialeValue = aResultatListFormationInitiale(),
): FormationInitialeInterface {
	return {
		rechercherFormationInitiale: jest.fn().mockResolvedValue(createSuccess([rechercherFormationInitialeValue])),
	};
}
