import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

export interface SitemapDependencies {
	générerSitemapUseCase: GénérerSitemapUseCase
}

export function sitemapDependenciesContainer(cmsRepository: CmsRepository, ficheMetierRepository: FicheMetierRepository) {
	return {
		générerSitemapUseCase: new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository),
	};
}
