import { Stage3emeQueryParams } from '~/client/hooks/useStage3emeQuery';
import { Either } from '~/server/errors/either';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';

export interface Stage3emeService {
	rechercherStage3eme(query: Stage3emeQueryParams): Promise<Either<ResultatRechercheStage3eme>>;
}
