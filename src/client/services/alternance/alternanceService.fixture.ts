import { aListeDeMetierLaBonneAlternance } from '~/server/alternances/infra/repositories/laBonneAlternance.fixture';
import { createSuccess } from '~/server/errors/either';

import { AlternanceService } from './alternance.service';

export function aAlternancServiceWithEmptyResultat(): AlternanceService {
	return {
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess([])),
	} as unknown as AlternanceService;
}

export function aAlternancService(): AlternanceService {
	return {
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess(aListeDeMetierLaBonneAlternance())),
	} as unknown as AlternanceService;
}
