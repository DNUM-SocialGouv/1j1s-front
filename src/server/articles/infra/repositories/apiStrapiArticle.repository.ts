import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/article.repository';
import { mapArticle } from '~/server/articles/infra/repositories/apiStrapiArticle.mapper';
import { ArticleContentType } from '~/server/articles/infra/repositories/apiStrapiArticle.response';
import { Either } from '~/server/errors/either';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class ApiStrapiArticleRepository implements ArticleRepository {
  constructor(private strapiHttpClientService: StrapiHttpClientService) {}

  async getArticle(slug: ArticleSlug): Promise<Either<Article>> {
    const filters = `[slug][$eq]=${slug}&populate[0]=banniere`;
    return await this.strapiHttpClientService.get<ArticleContentType, Article>(`articles?filters${filters}`, mapArticle);
  }
}
