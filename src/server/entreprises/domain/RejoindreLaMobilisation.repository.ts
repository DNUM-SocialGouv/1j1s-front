import { Either } from '~/server/errors/either';

import { Entreprise } from './Entreprise';

export interface RejoindreLaMobilisationRepository {
    save(entreprise: Entreprise): Promise<Either<void>>;
}
