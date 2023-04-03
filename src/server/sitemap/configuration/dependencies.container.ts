import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

export interface SitemapDependencies {
	générerSitemapUseCase: GénérerSitemapUseCase
}

export function sitemapDependenciesContainer(cmsRepository: CmsRepository) {
	return {
		générerSitemapUseCase: new GénérerSitemapUseCase(cmsRepository),
	};
}
