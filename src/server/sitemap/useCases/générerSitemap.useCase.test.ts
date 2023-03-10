import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import {
	aFAQPathList,
	aFicheMetierNomMetierList,
	anArticlePathList,
	aSitemap,
} from '~/server/sitemap/domain/sitemap.fixture';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

describe('GénérerSitemapUseCase', () => {
	describe('quand le feature flip de Formation et Apprentissage n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '0',
			};
		});
		it('génère le xml contenant le sitemap',  async() => {
			const cmsRepository = aStrapiCmsRepository();
			cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
			cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
			cmsRepository.listAllFoireAuxQuestionsSlug = jest.fn().mockResolvedValue(createSuccess(aFAQPathList()));
			const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
			const baseUrl = 'http://localhost:3000';

			const expected = aSitemap();

			const result = await générerSitemapUseCase.handle(baseUrl);

			expect(result).toEqual(expected);
		});
	});
	describe('quand le feature flip de Formation et Apprentissage est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '1',
			};
		});
		it('génère le xml contenant le sitemap',  async() => {
			const cmsRepository = aStrapiCmsRepository();
			cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
			cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
			cmsRepository.listAllFoireAuxQuestionsSlug = jest.fn().mockResolvedValue(createSuccess(aFAQPathList()));
			const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
			const baseUrl = 'http://localhost:3000';

			const result = await générerSitemapUseCase.handle(baseUrl);

			expect(result).toContain('<loc>http://localhost:3000/formations/apprentissage</loc>');
		});
	});
});
