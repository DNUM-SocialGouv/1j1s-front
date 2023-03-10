import { createSuccess } from '~/server/errors/either';

import { DemandeDeContactService } from './demandeDeContact.service';

export function aDemandeDeContactService(): DemandeDeContactService {
	return {
		envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
		envoyerPourLePOE: jest.fn().mockResolvedValue(createSuccess(undefined)),
		envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as DemandeDeContactService;
}
