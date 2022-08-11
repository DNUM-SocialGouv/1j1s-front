import { Either } from '~/server/errors/either';

import { DemandeDeContact } from './DemandeDeContact';

export interface DemandeDeContactRepository {
    save(demandeDeContact: DemandeDeContact): Promise<Either<void>>;
}
