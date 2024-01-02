import { Either } from '~/server/errors/either';
import { OffreDeStage, OffreStageDepot } from '~/server/stages/domain/stages';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;

export interface StagesRepository {
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>
	listAllOffreDeStageSlug(): Promise<Either<Array<string>>>
	saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>>
}
