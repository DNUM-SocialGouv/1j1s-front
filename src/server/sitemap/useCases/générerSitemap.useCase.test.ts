import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import { aListeFAQSlug } from '~/server/faq/domain/FAQ.fixture';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { aFAQRepository } from '~/server/faq/infra/strapiFAQ.repository.fixture';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { aFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository.fixture';
import {
	aFicheMetierNomMetierList,
	anAnnonceDeLogementPathList,
	anArticlePathList,
	anOffreDeStagePathList,
	aSitemap,
} from '~/server/sitemap/domain/sitemap.fixture';
import { GénérerSitemapUseCase } from '~/server/sitemap/useCases/générerSitemap.useCase';

describe('GénérerSitemapUseCase', () => {
	let ficheMetierRepository: FicheMetierRepository;
	let faqRepository: FAQRepository;
	let cmsRepository: CmsRepository;
	beforeEach(() => {
		ficheMetierRepository= aFicheMetierRepository();
		ficheMetierRepository.getAllNomsMetiers = jest.fn().mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
		faqRepository = aFAQRepository();
		cmsRepository = aStrapiCmsRepository();
		cmsRepository.listAllArticleSlug = jest.fn().mockResolvedValue(createSuccess(anArticlePathList()));
		faqRepository.listAllFAQSlug = jest.fn().mockResolvedValue(createSuccess(aListeFAQSlug()));
		cmsRepository.listAllOffreDeStageSlug = jest.fn().mockResolvedValue(createSuccess(anOffreDeStagePathList()));
		cmsRepository.listAllAnnonceDeLogementSlug = jest.fn().mockResolvedValue(createSuccess(anAnnonceDeLogementPathList()));
	});
	describe('feature flip Formation en apprentissage', () => {
		describe('quand la feature Formation en apprentissage n‘est pas activée', () => {
			it('génère le xml contenant le sitemap',  async() => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '0';
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository);
				const baseUrl = 'http://localhost:3000';

				const expected = aSitemap();

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).toEqual(expected);
			});
		});

		describe('quand la feature Formation en apprentissage est activée', () => {
			it('génère le sitamp avec la Formation en apprentissage',  async() => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '1';
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository);
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
				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).not.toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});

		describe('quand la feature de Formations initiales est activée', () => {
			it('génère le sitmap avec la formations initiales',  async() => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';

				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});
	});
	describe('feature flip Emplois en Europe', () => {
		describe('quand la feature Emplois en Europe n‘est pas activée', () => {
			it('génère le sitmap sans les emplois en Europe',  async() => {
				process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '0';

				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).not.toContain('<loc>http://localhost:3000/emplois-europe</loc>');
			});
		});

		describe('quand la feature Emplois en Europe est activée', () => {
			it('génère le sitmap avec les emplois en Europe',  async() => {
				process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '1';

				const générerSitemapUseCase = new GénérerSitemapUseCase(cmsRepository, ficheMetierRepository, faqRepository);
				const baseUrl = 'http://localhost:3000';

				const result = await générerSitemapUseCase.handle(baseUrl);

				expect(result).toContain('<loc>http://localhost:3000/emplois-europe</loc>');
			});
		});
	});
});
