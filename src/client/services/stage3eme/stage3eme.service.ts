import { Either } from '~/server/errors/either';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';

export interface Stage3emeService {
	rechercherStage3eme(): Promise<Either<ResultatRechercheStage3eme>>;
}
