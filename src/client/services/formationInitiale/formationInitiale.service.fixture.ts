import { createSuccess } from '~/server/errors/either';
import {
	FormationInitiale,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';

import { FormationInitialeInterface } from './formationInitiale.service';

export function aResultatFormationInitiale(override?: Partial<ResultatRechercheFormationsInitiales>): ResultatRechercheFormationsInitiales {
	return {
		formationsInitiales: [aFormationInitiale()],
		nombreDeResultat: 150,
		...override,
	};
}

export function aFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		libelle: 'Formation Boulanger Chez Pierre Hermé',
		tags: ['Certifiante', 'Bac + 2', '1 an'],
		url_formation: 'https://www.onisep.fr/formations/macarons',
		...override,
	};
}


export function aFormationInitialeService(
	resultatRechercherFormationsInitiales = aResultatFormationInitiale(),
): FormationInitialeInterface {
	return {
		rechercherFormationInitiale: jest.fn().mockResolvedValue(createSuccess(resultatRechercherFormationsInitiales)),
	};
}
