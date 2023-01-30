import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

export interface CmsIndexRepository {
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>
	getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>
	saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>>
}
