import { Either } from '~/server/errors/either';

import { Entreprise } from './Entreprise';

export interface RejoindreLaMobilisationRepository {
    save(entreprise: Entreprise, annotation?: string): Promise<Either<void>>;
}
