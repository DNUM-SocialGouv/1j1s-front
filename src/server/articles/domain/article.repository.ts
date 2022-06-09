import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { Either } from '~/server/errors/either';

export interface ArticleRepository {
	getArticle(slug: ArticleSlug): Promise<Either<Article>>
}
