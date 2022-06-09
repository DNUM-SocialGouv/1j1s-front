import { ApiStrapiArticleRepository } from '~/server/articles/infra/repositories/apiStrapiArticle.repository';
import { ConsulterArticleUseCase } from '~/server/articles/useCases/consulterArticle.useCase';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export interface ConsulterArticleDependenciesContainer {
  readonly consulterArticle: ConsulterArticleUseCase
}

export const articleDependenciesContainer = (strapiHttpClientService: StrapiHttpClientService) => {
  const articleRepository = new ApiStrapiArticleRepository(strapiHttpClientService);

  return {
    consulterArticle: new ConsulterArticleUseCase(articleRepository),
  };
};
