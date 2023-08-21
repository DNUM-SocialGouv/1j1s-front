import { MétierService } from '~/client/services/métiers/métier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

export function aMétierService(
	rechercherMétierValue = aListeDeMetierLaBonneAlternance(),
): MétierService {
	return {
		rechercherMétier: jest.fn().mockResolvedValue(createSuccess(rechercherMétierValue)),
	} as unknown as MétierService;
}
