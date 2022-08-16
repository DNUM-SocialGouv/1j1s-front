import { DemandeDeContactRepository } from '~/server/contrat-engagement-jeune/domain/DemandeDeContact.repository';
import {
  EnvoyerDemanderDeContactUseCase,
} from '~/server/contrat-engagement-jeune/usecase/envoyerDemandeDeContact.usecase';

export interface ContratEngagementJeuneDependencies {
  envoyerDemanderDeContactUseCase: EnvoyerDemanderDeContactUseCase
}

export const contratEngagementJeuneDependenciesContainer = (
  demandeDeContactRepository: DemandeDeContactRepository,
): ContratEngagementJeuneDependencies => {
  return {
    envoyerDemanderDeContactUseCase: new EnvoyerDemanderDeContactUseCase(demandeDeContactRepository),
  };
};
