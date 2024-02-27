import { anArticle, anArticleSlugList } from '~/server/articles/domain/article.fixture';
import { ArticlesRepository } from '~/server/articles/domain/articles.repository';
import { createSuccess } from '~/server/errors/either';

export function anArticlesRepository(override?:Partial<ArticlesRepository>): ArticlesRepository {
	return {
		getArticleBySlug: jest.fn().mockResolvedValue(createSuccess(anArticle())),
		listAllArticleSlug: jest.fn().mockResolvedValue(createSuccess(anArticleSlugList())),
		...override,
	};
}
