import { anArticle, anArticleSlugList } from '~/server/articles/domain/article.fixture';
import { ArticleRepository } from '~/server/articles/domain/articles.repository';
import { createSuccess } from '~/server/errors/either';

export function anArticleRepository(override?:Partial<ArticleRepository>): ArticleRepository {
	return {
		getArticleBySlug: jest.fn().mockResolvedValue(createSuccess(anArticle())),
		listAllArticleSlug: jest.fn().mockResolvedValue(createSuccess(anArticleSlugList())),
		...override,
	};
}
