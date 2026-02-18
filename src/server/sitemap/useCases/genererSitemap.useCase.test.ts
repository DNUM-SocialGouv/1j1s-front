import {
	NavigationItemList,
	navigationItemList,
} from '~/client/components/layouts/Header/Navigation/NavigationStructure';
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

		vi.spyOn(articlesRepository, 'listAllArticleSlug').mockResolvedValue(createSuccess(anArticlePathList()));
		vi.spyOn(ficheMetierRepository, 'getAllNomsMetiers').mockResolvedValue(createSuccess(aFicheMetierNomMetierList()));
		vi.spyOn(faqRepository, 'listAllFAQSlug').mockResolvedValue(createSuccess(aListeFAQSlug()));
		vi.spyOn(stagesRepository, 'listAllOffreDeStageSlug').mockResolvedValue(createSuccess(anOffreDeStageSlugsList()));
		vi.spyOn(annonceDeLogementRepository, 'listAllAnnonceDeLogementSlug').mockResolvedValue(createSuccess(anAnnonceDeLogementSlugList()));
	});
	describe('feature flip Formation en apprentissage', () => {
		describe('quand la feature Formation en apprentissage n‘est pas activée', () => {
			it('génère le sitemap sans la Formation en apprentissage', async () => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '0';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).not.toContain('<loc>http://localhost:3000/formations/apprentissage</loc>');
			});
		});

		describe('quand la feature Formation en apprentissage est activée', () => {
			it('génère le sitemap avec la Formation en apprentissage', async () => {
				process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE = '1';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

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
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).not.toContain('<loc>http://localhost:3000/formations-initiales</loc>');
			});
		});

		describe('quand la feature de Formations initiales est activée', () => {
			it('génère le sitmap avec la formations initiales', async () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

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
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).not.toContain('<loc>http://localhost:3000/emplois-europe</loc>');
			});
		});

		describe('quand la feature Emplois en Europe est activée', () => {
			it('génère le sitmap avec les emplois en Europe', async () => {
				process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '1';
				const baseUrl = 'http://localhost:3000';
				const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

				const result = await générerSitemapUseCase.handle();

				expect(result).toContain('<loc>http://localhost:3000/emplois-europe</loc>');
			});
		});
	});
	it('contient les url statiques présentes dans le menu principal', async () => {
		const baseUrl = 'http://localhost:3000';
		const entreesMenu: NavigationItemList = {
			accompagnements: { children: [
				{ label: 'Stages', link: '/stages' },
				{ children: [
					{ label: 'Formations Initiales', link: '/formations-initiales' },
				], label: 'Formations' },
			], label: 'Accompagnements' },
			accueil: { label: 'Accueil', link: '/' },
		};
		const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, entreesMenu, baseUrl);

		const result = await générerSitemapUseCase.handle();

		expect(result).toContain('<loc>http://localhost:3000/</loc>');
		expect(result).toContain('<loc>http://localhost:3000/stages</loc>');
		expect(result).toContain('<loc>http://localhost:3000/formations-initiales</loc>');
	});
	it('filtre les entrées externes', async () => {
		const baseUrl = 'http://localhost:3000';
		const entreesMenu: NavigationItemList = {
			stages: { label: 'Stage de 2nd GT', link: 'https://stagedeseconde.recette.1jeune1solution.gouv.fr/eleves' },
		};
		const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, entreesMenu, baseUrl);

		const result = await générerSitemapUseCase.handle();

		expect(result).not.toContain('https://stagedeseconde.recette.1jeune1solution.gouv.fr/eleves');
	});
	it('santize les URI', async () => {
		const baseUrl = 'http://localhost:3000';
		ficheMetierRepository = aFicheMetierRepository({
			getAllNomsMetiers: vi.fn().mockResolvedValue(createSuccess(['Dev web'])),
		});
		const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

		const result = await générerSitemapUseCase.handle();

		expect(result).toContain('http://localhost:3000/decouvrir-les-metiers/Dev%20web');
	});
	it('encode les URI', async () => {
		const baseUrl = 'http://localhost:3000';
		ficheMetierRepository = aFicheMetierRepository({
			getAllNomsMetiers: vi.fn().mockResolvedValue(createSuccess(['Dev web "accessibilite<>&\'"'])),
		});
		const générerSitemapUseCase = new GenererSitemapUseCase(ficheMetierRepository, faqRepository, annonceDeLogementRepository, stagesRepository, articlesRepository, navigationItemList(), baseUrl);

		const result = await générerSitemapUseCase.handle();

		const encodedURI = '/Dev%20web%20%22accessibilite%3C%3E&amp;&apos;%22';
		expect(result).toContain(encodedURI);
	});
});
