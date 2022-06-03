import { Article } from '~/server/articles/domain/article';

export interface ArticleRepository {
	getArticle(slug: string): Promise<Article | undefined>
}
