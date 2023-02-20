import {
	aListeDeMetierLaBonneAlternance,
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

import { AlternanceService } from './alternance.service';

export function anAlternanceServiceWithEmptyResultat(): AlternanceService {
	return {
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess([])),
	} as unknown as AlternanceService;
}

export function anAlternanceService(
	rechercherAlternanceValue = aRésultatRechercherMultipleAlternance(),
	rechercherMétierValue = aListeDeMetierLaBonneAlternance(),
): AlternanceService {
	return {
		rechercherAlternance: jest.fn().mockResolvedValue(createSuccess(rechercherAlternanceValue)),
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess(rechercherMétierValue)),
	} as unknown as AlternanceService;
}
