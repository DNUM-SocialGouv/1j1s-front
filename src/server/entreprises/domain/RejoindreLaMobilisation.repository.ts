import { Either } from '~/server/errors/either';

import { EntrepriseSouhaitantSEngager } from './EntrepriseSouhaitantSEngager';

export interface RejoindreLaMobilisationRepository {
    save(entreprise: EntrepriseSouhaitantSEngager, annotation?: string): Promise<Either<void>>;
}
