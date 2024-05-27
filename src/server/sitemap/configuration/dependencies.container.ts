import { ArticleRepository } from '~/server/articles/domain/articles.repository';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { AnnonceDeLogementRepository } from '~/server/logements/domain/annonceDeLogement.repository';
import { GenererSitemapUseCase } from '~/server/sitemap/useCases/genererSitemap.useCase';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export interface SitemapDependencies {
	générerSitemapUseCase: GenererSitemapUseCase
}

export function sitemapDependenciesContainer(ficheMetierRepository: FicheMetierRepository,
																						 faqRepository: FAQRepository,
																						 annonceDeLogementRepository: AnnonceDeLogementRepository,
																						 stageRepository: StagesRepository,
																						 articlesRepository: ArticleRepository,
																						 baseUrl: string) {
	return {
		générerSitemapUseCase: new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stageRepository, articlesRepository, baseUrl),
	};
}
