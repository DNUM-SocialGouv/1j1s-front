import { Either } from '~/server/errors/either';

import { MetierStage3eme } from './metierStage3eme';

export interface MetierStage3emeRepository {
	search(motCle?: string): Promise<Either<MetierStage3eme[]>>;
}
