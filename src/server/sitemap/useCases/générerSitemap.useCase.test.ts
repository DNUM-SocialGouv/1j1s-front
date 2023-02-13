import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import { aFicheMetierNomMetierList, anArticlePathList, aSitemap } from '~/server/sitemap/domain/sitemap.fixture';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

describe('GénérerSitemapUseCase', () => {
	it('génère le xml contenant le sitemap',  async() => {
		const cmsRepository = aStrapiCmsRepository();
		cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
		cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
		const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
		const baseUrl = 'http://localhost:3000';

		const expected = aSitemap();

		const result = await générerSitemapUseCase.handle(baseUrl);

		expect(result).toEqual(expected);
	});
});
