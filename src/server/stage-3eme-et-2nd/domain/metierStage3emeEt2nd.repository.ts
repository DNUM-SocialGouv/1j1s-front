import { Either } from '~/server/errors/either';

import { MetierStage3emeEt2nd } from './metierStage3emeEt2nd';

export interface MetierStage3emeEt2ndRepository {
	search(motCle?: string): Promise<Either<MetierStage3emeEt2nd[]>>;
}
