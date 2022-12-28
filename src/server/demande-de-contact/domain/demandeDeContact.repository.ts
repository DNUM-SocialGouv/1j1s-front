import { Either } from '~/server/errors/either';

import { DemandeDeContactCEJ, DemandeDeContactEntreprise, DemandeDeContactPOE } from './demandeDeContact';

export interface DemandeDeContactRepository {
  saveCEJ(demandeDeContactCEJ: DemandeDeContactCEJ): Promise<Either<void>>;

  saveEntreprise(demandeDeContactEntreprise: DemandeDeContactEntreprise): Promise<Either<void>>;

  savePOE(contactPOE: DemandeDeContactPOE, annotation?: string): Promise<Either<void>>;
}
