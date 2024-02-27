import { StrapiArticlesRepository } from '../infra/strapiArticles.repository';
import { ConsulterArticleUseCase } from '../useCases/consulterArticle.useCase';

export interface ArticlesDependencies {
	consulterArticle: ConsulterArticleUseCase
}

export function articlesDependenciesContainer(articlesRepository: StrapiArticlesRepository): ArticlesDependencies {
	return {
		consulterArticle: new ConsulterArticleUseCase(articlesRepository),
	};
}
