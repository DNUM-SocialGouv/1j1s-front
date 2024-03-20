import { ArticleRepository } from '~/server/articles/domain/articles.repository';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { AnnonceDeLogementRepository } from '~/server/logements/domain/annonceDeLogement.repository';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export interface SitemapDependencies {
	générerSitemapUseCase: GénérerSitemapUseCase
}

export function sitemapDependenciesContainer(ficheMetierRepository: FicheMetierRepository,
																						 faqRepository: FAQRepository,
																						 annonceDeLogementRepository: AnnonceDeLogementRepository,
																						 stageRepository: StagesRepository,
																						 articlesRepository: ArticleRepository,
																						 baseUrl: string) {
	return {
		générerSitemapUseCase: new GénérerSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stageRepository, articlesRepository, baseUrl),
	};
}
