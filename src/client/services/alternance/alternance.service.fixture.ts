import {
	aListeDeMetierLaBonneAlternance,
	aRésultatRechercheAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

import { AlternanceService } from './alternance.service';

export function anAlternanceServiceWithEmptyResultat(): AlternanceService {
	return {
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess([])),
	} as unknown as AlternanceService;
}

export function anAlternanceService(): AlternanceService {
	return {
		rechercherAlternance: jest.fn().mockResolvedValue(createSuccess(aRésultatRechercheAlternance())),
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess(aListeDeMetierLaBonneAlternance())),
	} as unknown as AlternanceService;
}
