import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

export interface CmsIndexRepository {
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>
	getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>
}
