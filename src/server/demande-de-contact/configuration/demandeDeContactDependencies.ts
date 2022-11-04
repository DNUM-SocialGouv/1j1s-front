import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/DemandeDeContact.repository';
import {
  EnvoyerDemanderDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import {
  EnvoyerDemanderDeContactEntrepriseUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';
import { EnvoyerDemandeDeContactPOEUsecase } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactPOE.usecase';

export interface DemandeDeContactDependencies {
  envoyerDemandeDeContactCEJUseCase: EnvoyerDemanderDeContactCEJUseCase
  envoyerDemandeDeContactEntrepriseUseCase: EnvoyerDemanderDeContactEntrepriseUseCase
  envoyerDemandeDeContactPOEUsecase: EnvoyerDemandeDeContactPOEUsecase
}

export const demandeDeContactDependenciesContainer = (
  demandeDeContactRepository: DemandeDeContactRepository,
): DemandeDeContactDependencies => {
  return {
    envoyerDemandeDeContactCEJUseCase: new EnvoyerDemanderDeContactCEJUseCase(demandeDeContactRepository),
    envoyerDemandeDeContactEntrepriseUseCase: new EnvoyerDemanderDeContactEntrepriseUseCase(demandeDeContactRepository),
    envoyerDemandeDeContactPOEUsecase: new EnvoyerDemandeDeContactPOEUsecase(demandeDeContactRepository),
  };
};
