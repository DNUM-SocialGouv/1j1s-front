import { DemandeDeContactPOERepository } from '~/server/contact-poe/domain/DemandeDeContactPOERepository';
import { EnvoyerDemandeDeContactPOEUsecase } from '~/server/contact-poe/usecase/envoyerDemandeDeContactPOE.usecase';

export interface DemandeDeContactPOEDependency {
  demandeDeContactPOEUsecase: EnvoyerDemandeDeContactPOEUsecase
}

export const contactpoeDependenciesContainer = (
  demandeDeContactPOERepository: DemandeDeContactPOERepository,
): DemandeDeContactPOEDependency => {
  return {
    demandeDeContactPOEUsecase: new EnvoyerDemandeDeContactPOEUsecase(demandeDeContactPOERepository),
  };
};
