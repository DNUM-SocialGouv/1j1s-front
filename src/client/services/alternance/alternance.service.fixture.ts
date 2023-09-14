import {
	aResultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

import { AlternanceService } from './alternance.service';

export function anAlternanceService(
	rechercherAlternanceOffreListValue = aResultatRechercherMultipleAlternance().offreList,
	rechercherAlternanceEntrepriseListValue = aResultatRechercherMultipleAlternance().entrepriseList,
): AlternanceService {
	return {
		rechercherAlternance: jest.fn().mockResolvedValue(createSuccess({
			entrepriseList: rechercherAlternanceEntrepriseListValue,
			offreList: rechercherAlternanceOffreListValue,
		})),
	} as unknown as AlternanceService;
}
