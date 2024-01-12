import { Either } from '~/server/errors/either';

import { ResultatRechercheStage3eEt2de, Stage3eEt2deFiltre } from './stage3eEt2de';

export interface Stage3eEt2deRepository {
	search(filtre: Stage3eEt2deFiltre): Promise<Either<ResultatRechercheStage3eEt2de>>
}
