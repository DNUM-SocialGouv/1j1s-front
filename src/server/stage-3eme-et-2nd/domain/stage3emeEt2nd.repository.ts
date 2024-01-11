import { Either } from '~/server/errors/either';

import { ResultatRechercheStage3emeEt2nd, Stage3emeEt2ndFiltre } from './stage3emeEt2nd';

export interface Stage3emeEt2ndRepository {
	search(filtre: Stage3emeEt2ndFiltre): Promise<Either<ResultatRechercheStage3emeEt2nd>>
}
