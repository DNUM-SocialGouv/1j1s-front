import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/articles.repository';
import { Either } from '~/server/errors/either';

export class ConsulterArticleUseCase {
	constructor(private articlesRepository: ArticleRepository) {}
	
	async handle(slug: ArticleSlug): Promise<Either<Article>> {
		return this.articlesRepository.getArticleBySlug(slug);
	}
}
