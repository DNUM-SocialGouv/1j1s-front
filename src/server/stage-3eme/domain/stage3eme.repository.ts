import { Either } from '~/server/errors/either';

import { ResultatRechercheStage3eme, Stage3emeFiltre } from './stage3eme';

export interface Stage3emeRepository {
	search(filtre: Stage3emeFiltre): Promise<Either<ResultatRechercheStage3eme>>
}
