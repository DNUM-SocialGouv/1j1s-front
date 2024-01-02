import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { AnnonceDeLogementRepository } from '~/server/logements/domain/annonceDeLogement.repository';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export interface SitemapDependencies {
	générerSitemapUseCase: GénérerSitemapUseCase
}

export function sitemapDependenciesContainer(cmsRepository: CmsRepository,
																						 ficheMetierRepository: FicheMetierRepository,
																						 faqRepository: FAQRepository,
																						 annonceDeLogementRepository: AnnonceDeLogementRepository,
																						 stageRepository: StagesRepository) {
	return {
		générerSitemapUseCase: new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository, annonceDeLogementRepository, stageRepository),
	};
}
