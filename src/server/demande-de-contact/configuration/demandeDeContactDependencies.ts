import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/DemandeDeContact.repository';
import {
  EnvoyerDemandeDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import {
  EnvoyerDemandeDeContactEntrepriseUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';
import { EnvoyerDemandeDeContactPOEUsecase } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactPOE.usecase';

export interface DemandeDeContactDependencies {
  envoyerDemandeDeContactCEJUseCase: EnvoyerDemandeDeContactCEJUseCase
  envoyerDemandeDeContactEntrepriseUseCase: EnvoyerDemandeDeContactEntrepriseUseCase
  envoyerDemandeDeContactPOEUsecase: EnvoyerDemandeDeContactPOEUsecase
}

export const demandeDeContactDependenciesContainer = (
  demandeDeContactRepository: DemandeDeContactRepository,
): DemandeDeContactDependencies => {
  return {
    envoyerDemandeDeContactCEJUseCase: new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactRepository),
    envoyerDemandeDeContactEntrepriseUseCase: new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactRepository),
    envoyerDemandeDeContactPOEUsecase: new EnvoyerDemandeDeContactPOEUsecase(demandeDeContactRepository),
  };
};
