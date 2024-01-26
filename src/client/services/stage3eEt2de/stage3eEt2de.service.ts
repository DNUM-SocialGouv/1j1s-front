import { Stage3eEt2deQueryParams } from '~/client/hooks/useStage3eEt2deQuery';
import { Either } from '~/server/errors/either';
import { CandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';

export interface Stage3eEt2deService {
	rechercherStage3eEt2de(query: Stage3eEt2deQueryParams): Promise<Either<ResultatRechercheStage3eEt2de>>;
	candidaterStage3eEt2de(candidatureStage3eEt2de: CandidatureStage3eEt2de): Promise<Either<undefined>>;
}
