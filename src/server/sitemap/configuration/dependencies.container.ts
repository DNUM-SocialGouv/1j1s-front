import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

export interface SitemapDependencies {
	générerSitemapUseCase: GénérerSitemapUseCase
}

export function sitemapDependenciesContainer(cmsRepository: CmsRepository, ficheMetierRepository: FicheMetierRepository, faqRepository: FAQRepository) {
	return {
		générerSitemapUseCase: new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository),
	};
}
