import { Either } from '~/server/errors/either';
import { CandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

import { ResultatRechercheStage3eEt2de, Stage3eEt2deFiltre } from './stage3eEt2de';

export interface Stage3eEt2deRepository {
	search(filtre: Stage3eEt2deFiltre): Promise<Either<ResultatRechercheStage3eEt2de>>
	sendCandidatureStage3eEt2de(candidature: CandidatureStage3eEt2de): Promise<Either<undefined>>
}
