import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

export function aDemandeDeContactService(override?: Partial<DemandeDeContactService>): DemandeDeContactService {
	return {
		envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
		...override,
	};
}
