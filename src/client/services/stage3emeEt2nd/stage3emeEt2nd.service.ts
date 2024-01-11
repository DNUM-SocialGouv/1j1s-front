import { Stage3emeEt2ndQueryParams } from '~/client/hooks/useStage3emeEt2ndQuery';
import { Either } from '~/server/errors/either';
import { ResultatRechercheStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';

export interface Stage3emeEt2ndService {
	rechercherStage3emeEt2nd(query: Stage3emeEt2ndQueryParams): Promise<Either<ResultatRechercheStage3emeEt2nd>>;
}
