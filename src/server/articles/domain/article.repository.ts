import { Article } from '~/server/articles/domain/article';
import { Either } from '~/server/errors/either';

export interface ArticleRepository {
	getArticle(slug: string): Promise<Either<Article>>
}
