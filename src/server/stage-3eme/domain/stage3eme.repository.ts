import { Either } from '~/server/errors/either';

import { ResultatRechercheStage3eme } from './stage3eme';

export interface Stage3emeRepository {
	search(): Promise<Either<ResultatRechercheStage3eme>>
}
