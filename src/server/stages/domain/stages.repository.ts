import { Either } from '~/server/errors/either';
import { OffreDeStage, OffreDeStageDepot } from '~/server/stages/domain/stages';

export interface StagesRepository {
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>
	listAllOffreDeStageSlug(): Promise<Either<Array<string>>>
	saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>>
}
