import * as process from 'process';

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
	describe('feature flip Formation et Apprentissage', () => {
		describe('quand le feature flip de Formation et Apprentissage n‘est pas actif', () => {
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

		describe('quand le feature flip de Formation et Apprentissage est actif', () => {
			it('génère le xml contenant le sitemap',  async() => {
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
		describe('quand le feature flip de Formations initiales n‘est pas actif', () => {
			it('génère le xml contenant le sitemap',  async() => {
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

		describe('quand le feature flip de Formation et Apprentissage est actif', () => {
			it('génère le xml contenant le sitemap',  async() => {
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
