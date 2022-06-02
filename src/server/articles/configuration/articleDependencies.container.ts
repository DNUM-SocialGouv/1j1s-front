import {
  ConsulterArticleDependenciesContainer,
} from '~/server/articles/infra/configuration/consulterArticleDependencies.container';
import { ApiStrapiArticleRepository } from '~/server/articles/infra/repositories/apiStrapiArticle.repository';
import { ConsulterArticleUseCase } from '~/server/articles/useCases/consulterArticle.useCase';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export type ArticleDependencies = ConsulterArticleDependenciesContainer

export const articleDependenciesContainer = (strapiHttpClientService: StrapiHttpClientService): ArticleDependencies => {
  const articleRepository = new ApiStrapiArticleRepository(strapiHttpClientService);
	
  return {
    consulterArticle: new ConsulterArticleUseCase(articleRepository),
  };
};
