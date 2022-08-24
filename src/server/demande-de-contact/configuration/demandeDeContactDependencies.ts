import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/DemandeDeContact.repository';
import {
  EnvoyerDemanderDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import {
  EnvoyerDemanderDeContactEntrepriseUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';

export interface DemandeDeContactDependencies {
  envoyerDemanderDeContactCEJUseCase: EnvoyerDemanderDeContactCEJUseCase
  envoyerDemanderDeContactEntrepriseUseCase: EnvoyerDemanderDeContactEntrepriseUseCase
}

export const demandeDeContactDependenciesContainer = (
  demandeDeContactRepository: DemandeDeContactRepository,
): DemandeDeContactDependencies => {
  return {
    envoyerDemanderDeContactCEJUseCase: new EnvoyerDemanderDeContactCEJUseCase(demandeDeContactRepository),
    envoyerDemanderDeContactEntrepriseUseCase: new EnvoyerDemanderDeContactEntrepriseUseCase(demandeDeContactRepository),
  };
};
