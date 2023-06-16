import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import {
	aFAQPathList,
	aFicheMetierNomMetierList,
	anAnnonceDeLogementPathList,
	anArticlePathList,
	anOffreDeStagePathList,
	aSitemap,
} from '~/server/sitemap/domain/sitemap.fixture';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

describe('GénérerSitemapUseCase', () => {
	describe('feature flip Formation en apprentissage', () => {
		describe('quand la feature Formation en apprentissage n‘est pas activée', () => {
			it('génère le xml contenant le sitemap',  async() => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '0';
				const cmsRepository = aStrapiCmsRepository();
				cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
				cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
				cmsRepository.listAllFAQSlug = jest.fn().mockResolvedValue(createSuccess(aFAQPathList()));
				cmsRepository.listAllOffreDeStageSlug = jest.fn().mockResolvedValue(createSuccess(anOffreDeStagePathList()));
				cmsRepository.listAllAnnonceDeLogementSlug = jest.fn().mockResolvedValue(createSuccess(anAnnonceDeLogementPathList()));
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
				const baseUrl = 'http://localhost:3000';

				const expected = aSitemap();

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).toEqual(expected);
			});
		});

		describe('quand la feature Formation en apprentissage est activée', () => {
			it('génère le sitamp avec la Formation en apprentissage',  async() => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '1';
				const cmsRepository = aStrapiCmsRepository();
				cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
				cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
				cmsRepository.listAllFAQSlug = jest.fn().mockResolvedValue(createSuccess(aFAQPathList()));
				cmsRepository.listAllOffreDeStageSlug = jest.fn().mockResolvedValue(createSuccess(anOffreDeStagePathList()));
				cmsRepository.listAllAnnonceDeLogementSlug = jest.fn().mockResolvedValue(createSuccess(anAnnonceDeLogementPathList()));
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).toContain('<loc>http://localhost:3000/formations/apprentissage</loc>');
			});
		});
	});
	describe('feature flip Formations initiales', () => {
		describe('quand la feature Formations initiales n‘est pas activée', () => {
			it('génère le sitmap sans la formations initiales',  async() => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
				const cmsRepository = aStrapiCmsRepository();
				cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
				cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
				cmsRepository.listAllFAQSlug = jest.fn().mockResolvedValue(createSuccess(aFAQPathList()));
				cmsRepository.listAllOffreDeStageSlug = jest.fn().mockResolvedValue(createSuccess(anOffreDeStagePathList()));
				cmsRepository.listAllAnnonceDeLogementSlug = jest.fn().mockResolvedValue(createSuccess(anAnnonceDeLogementPathList()));
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).not.toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});

		describe('quand la feature de Formations initiales est activée', () => {
			it('génère le sitmap avec la formations initiales',  async() => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
				const cmsRepository = aStrapiCmsRepository();
				cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
				cmsRepository.listAllFicheMetierNomMetier = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
				cmsRepository.listAllFAQSlug = jest.fn().mockResolvedValue(createSuccess(aFAQPathList()));
				cmsRepository.listAllOffreDeStageSlug = jest.fn().mockResolvedValue(createSuccess(anOffreDeStagePathList()));
				cmsRepository.listAllAnnonceDeLogementSlug = jest.fn().mockResolvedValue(createSuccess(anAnnonceDeLogementPathList()));
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});
	});
});
