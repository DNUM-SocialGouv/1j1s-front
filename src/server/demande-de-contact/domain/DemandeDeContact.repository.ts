import { Either } from '~/server/errors/either';

import { DemandeDeContactCEJ, DemandeDeContactEntreprise } from './DemandeDeContact';

export interface DemandeDeContactRepository {
    saveCEJ(demandeDeContactCEJ: DemandeDeContactCEJ): Promise<Either<void>>;
    saveEntreprise(demandeDeContactEntreprise: DemandeDeContactEntreprise): Promise<Either<void>>;
}
