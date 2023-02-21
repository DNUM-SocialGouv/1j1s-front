import {
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

import { AlternanceService } from './alternance.service';

export function anAlternanceService(
	rechercherAlternanceValue = aRésultatRechercherMultipleAlternance(),
): AlternanceService {
	return {
		rechercherAlternance: jest.fn().mockResolvedValue(createSuccess(rechercherAlternanceValue)),
	} as unknown as AlternanceService;
}
