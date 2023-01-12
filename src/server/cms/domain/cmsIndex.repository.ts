import {
	AnnonceDeLogement,
} from '~/client/components/features/Logement/AnnonceDeLogement.type';
import {
	OffreDeStageAttributesFromCMS,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { Either } from '~/server/errors/either';

export interface CmsIndexRepository {
	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStageAttributesFromCMS>>
	getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>
}
