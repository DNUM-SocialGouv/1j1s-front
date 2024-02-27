
import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { Either } from '~/server/errors/either';

export interface ArticlesRepository {
	getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>>
	listAllArticleSlug(): Promise<Either<Array<string>>>
}
