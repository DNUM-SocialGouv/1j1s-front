import { Actualité } from '~/server/cms/domain/actualité';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { Either } from '~/server/errors/either';

export interface CmsRepository {
	getActualitéList(): Promise<Either<Actualité[]>>

	getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>

	getMentionObligatoire(mentionsObligatoires: MentionsObligatoires): Promise<Either<Article>>

	getMesuresEmployeurs(): Promise<Either<MesureEmployeur[]>>

	listAllArticleSlug(): Promise<Either<Array<string>>>

	save<Body, Response>(resource: string, body: Body): Promise<Either<Response>>

	getFirstFromCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection>>

	getCollectionTypeDeprecated<Collection, Response>(resource: string, query: string, mapper: (data: Collection) => Response): Promise<Either<Response[]>>

	getCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection[]>>

	getSingleType<Response>(resource: string, query: string): Promise<Either<Response>>
}
