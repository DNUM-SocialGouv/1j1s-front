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
		duree: '1 an',
		identifiant: 'FOR.1234',
		isCertifiante: true,
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		niveauDeSortie: 'Bac + 2',
		url_formation: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
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
