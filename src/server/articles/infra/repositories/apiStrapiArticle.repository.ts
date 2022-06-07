import { Article } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/article.repository';
import { mapArticle } from '~/server/articles/infra/repositories/apiStrapiArticle.mapper';
import { ArticleResponse } from '~/server/articles/infra/repositories/apiStrapiArticle.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class ApiStrapiArticleRepository implements ArticleRepository {
  constructor(private strapiHttpClientService: StrapiHttpClientService) {}

  async getArticle(slug: string): Promise<Either<Article>> {
    const filters = `[slug][$eq]=${slug}`;
    try {
      const { data: response } = await this.strapiHttpClientService.get<ArticleResponse>(`articles?filters${filters}`);
      const article = mapArticle(response);
      if (!article) {
        return createFailure(ErrorType.RESSOURCE_INTROUVABLE);
      }
      return createSuccess(article);
    } catch (e) {
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
