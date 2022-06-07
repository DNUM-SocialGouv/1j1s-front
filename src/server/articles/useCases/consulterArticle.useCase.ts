import { Article } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/article.repository';
import { Either } from '~/server/errors/either';

export class ConsulterArticleUseCase {
  constructor(private articleRepository: ArticleRepository) {}
	
  async handle(slug: string): Promise<Either<Article>> {
    return this.articleRepository.getArticle(slug);
  }
}
