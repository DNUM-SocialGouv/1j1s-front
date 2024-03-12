import { StrapiArticleRepository } from '../infra/strapiArticle.repository';
import { ConsulterArticleUseCase } from '../useCases/consulterArticle.useCase';

export interface ArticleDependencies {
	consulterArticle: ConsulterArticleUseCase
}

export function articleDependenciesContainer(articleRepository: StrapiArticleRepository): ArticleDependencies {
	return {
		consulterArticle: new ConsulterArticleUseCase(articleRepository),
	};
}
