import { Actualité } from '~/server/cms/domain/actualité';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import { Either } from '~/server/errors/either';

export interface CmsRepository {
	getActualitéList(): Promise<Either<Actualité[]>>

	// getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>>

	getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>

	getServiceJeuneList(): Promise<Either<Array<ServiceJeune>>>

	getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>

	getMesuresEmployeurs(): Promise<Either<MesureEmployeur[]>>

	getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>>

	getAllVideosCampagneApprentissage(): Promise<Either<Array<VideoCampagneApprentissage>>>

	// listAllAnnonceDeLogementSlug(): Promise<Either<Array<string>>>

	listAllArticleSlug(): Promise<Either<Array<string>>>

	listAllOffreDeStageSlug(): Promise<Either<Array<string>>>

	saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>>

	save<Body, Response>(resource: string, body: Body): Promise<Either<Response>>

	getFirstFromCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection>>

	getCollectionTypeDeprecated<Collection, Response>(resource: string, query: string, mapper: (data: Collection) => Response): Promise<Either<Response[]>>

	getCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection[]>>
}
