import { ArticleRepository } from '~/server/articles/domain/articles.repository';
import { anArticleRepository } from '~/server/articles/infra/stapiArticle.repository.fixture';
import { createSuccess } from '~/server/errors/either';
import { aListeFAQSlug } from '~/server/faq/domain/FAQ.fixture';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';
import { aFAQRepository } from '~/server/faq/infra/strapiFAQ.repository.fixture';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';
import { aFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository.fixture';
import { AnnonceDeLogementRepository } from '~/server/logements/domain/annonceDeLogement.repository';
import { anAnnonceDeLogementSlugList } from '~/server/logements/infra/strapiAnnonceDeLogement.fixture';
import { anAnnonceDeLogementRepository } from '~/server/logements/infra/strapiAnnonceDeLogement.repository.fixture';
import {
	aFicheMetierNomMetierList,
	anArticlePathList,
	aSitemap,
} from '~/server/sitemap/domain/sitemap.fixture';
import { GenererSitemapUseCase } from '~/server/sitemap/useCases/genererSitemap.useCase';
import { anOffreDeStageSlugsList } from '~/server/stages/domain/stages.fixture';
import { StagesRepository } from '~/server/stages/domain/stages.repository';
import { aStagesRepository } from '~/server/stages/repository/strapiStages.repository.fixture';

describe('GenererSitemapUseCase', () => {
	let ficheMetierRepository: FicheMetierRepository;
	let faqRepository: FAQRepository;
	let annonceDeLogementRepository: AnnonceDeLogementRepository;
	let stagesRepository: StagesRepository;
	let articlesRepository: ArticleRepository;
	beforeEach(() => {
		ficheMetierRepository = aFicheMetierRepository();
		articlesRepository = anArticleRepository();
		faqRepository = aFAQRepository();
		annonceDeLogementRepository = anAnnonceDeLogementRepository();
		stagesRepository = aStagesRepository();

		jest.spyOn(articlesRepository, 'listAllArticleSlug').mockResolvedValue(createSuccess(anArticlePathList()));
		jest.spyOn(ficheMetierRepository, 'getAllNomsMetiers').mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
		jest.spyOn(faqRepository, 'listAllFAQSlug').mockResolvedValue(createSuccess(aListeFAQSlug()));
		jest.spyOn(stagesRepository, 'listAllOffreDeStageSlug').mockResolvedValue(createSuccess(anOffreDeStageSlugsList()));
		jest.spyOn(annonceDeLogementRepository, 'listAllAnnonceDeLogementSlug').mockResolvedValue(createSuccess(anAnnonceDeLogementSlugList()));
	});
	describe('feature flip Formation en apprentissage', () => {
		describe('quand la feature Formation en apprentissage n‘est pas activée', () => {
			it('génère le xml contenant le sitemap', async () => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '0';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase( ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, baseUrl);

				const expected = aSitemap(baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).toEqual(expected);
			});
		});

		describe('quand la feature Formation en apprentissage est activée', () => {
			it('génère le sitamp avec la Formation en apprentissage', async () => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '1';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).toContain('<loc>http://localhost:3000/formations/apprentissage</loc>');
			});
		});
	});
	describe('feature flip Formations initiales', () => {
		describe('quand la feature Formations initiales n‘est pas activée', () => {
			it('génère le sitmap sans la formations initiales', async () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).not.toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});

		describe('quand la feature de Formations initiales est activée', () => {
			it('génère le sitmap avec la formations initiales', async () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';

				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});
	});
	describe('feature flip Emplois en Europe', () => {
		describe('quand la feature Emplois en Europe n‘est pas activée', () => {
			it('génère le sitmap sans les emplois en Europe', async () => {
				process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '0';

				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).not.toContain('<loc>http://localhost:3000/emplois-europe</loc>');
			});
		});

		describe('quand la feature Emplois en Europe est activée', () => {
			it('génère le sitmap avec les emplois en Europe', async () => {
				process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '1';

				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).toContain('<loc>http://localhost:3000/emplois-europe</loc>');
			});
		});
	});
});
