import { Article } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/article.repository';

export class ConsulterArticleUseCase {
  constructor(private articleRepository: ArticleRepository) {}
	
  async handle(slug: string): Promise<Article> {
    return this.articleRepository.getArticle(slug);
  }
}
