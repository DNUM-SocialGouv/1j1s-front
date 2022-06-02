import { Article } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/article.repository';
import { mapArticle } from '~/server/articles/infra/repositories/apiStrapiArticle.mapper';
import { ArticleResponse } from '~/server/articles/infra/repositories/apiStrapiArticle.response';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class ApiStrapiArticleRepository implements ArticleRepository {
  constructor(private strapiHttpClientService: StrapiHttpClientService) {}

  async getArticle(slug: string): Promise<Article> {
    const filters = `[slug][$eq]=${slug}`;
    const { data: response } = await this.strapiHttpClientService.get<ArticleResponse>(`articles?filters${filters}`);
    return mapArticle(response);
  }
}
