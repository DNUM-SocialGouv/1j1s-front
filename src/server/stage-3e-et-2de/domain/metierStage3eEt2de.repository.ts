import { Either } from '~/server/errors/either';

import { MetierStage3eEt2de } from './metierStage3eEt2de';

export interface MetierStage3eEt2deRepository {
	search(motCle?: string): Promise<Either<MetierStage3eEt2de[]>>;
}
