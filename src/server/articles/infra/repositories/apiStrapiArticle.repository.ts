import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/article.repository';
import { mapArticle } from '~/server/articles/infra/repositories/apiStrapiArticle.mapper';
import { Strapi } from '~/server/articles/infra/repositories/apiStrapiArticle.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class ApiStrapiArticleRepository implements ArticleRepository {
  constructor(private strapiHttpClientService: StrapiHttpClientService) {}

  async getArticle(slug: ArticleSlug): Promise<Either<Article>> {
    const filters = `[slug][$eq]=${slug}&populate[0]=banniere`;
    const response = await this.strapiHttpClientService.get<Strapi.ArticleContentType>(`articles?filters${filters}`);
    switch (response.instance) {
      case 'success': {
        const article = mapArticle(response.result.data);
        if (!article) {
          return createFailure(ErrorType.RESSOURCE_INTROUVABLE);
        }
        return createSuccess(article);
      }
      case 'failure': return response;
    }
  }
}
