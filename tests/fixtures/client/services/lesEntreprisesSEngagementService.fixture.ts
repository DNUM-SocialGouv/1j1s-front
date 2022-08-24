import {
  DemandeDeContactService,
} from '~/client/services/demande-de-contact/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

export function aLesEntreprisesSEngagementService(): DemandeDeContactService {
  return {
    envoyerFormulaireEngagement: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as DemandeDeContactService;
}
