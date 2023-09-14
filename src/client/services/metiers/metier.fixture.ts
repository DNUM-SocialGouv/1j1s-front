import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

export function aMetierService(
	rechercherMetierValue = aListeDeMetierLaBonneAlternance(),
): MetierService {
	return {
		rechercherMetier: jest.fn().mockResolvedValue(createSuccess(rechercherMetierValue)),
	};
}
