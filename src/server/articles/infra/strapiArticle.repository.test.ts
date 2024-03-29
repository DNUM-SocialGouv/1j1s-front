import { anArticle, anArticleSlugList } from '~/server/articles/domain/article.fixture';
import { aStrapiArticle, aStrapiArticleSlugList } from '~/server/articles/infra/strapiArticle.fixture';
import { StrapiArticleRepository } from '~/server/articles/infra/strapiArticle.repository';
import { aStrapiService } from '~/server/cms/infra/repositories/strapi.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';

describe('strapiArticles', () => {
	describe('getArticleBySlug', () => {
		it('appelle le service avec les bons paramètres', async () => {
			const RESOURCE_ARTICLE = 'articles';
			const slug = 'slug-article';
			const strapiService = aStrapiService();
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(createSuccess(aStrapiArticle()));
			const strapiArticles = new StrapiArticleRepository(strapiService, anErrorManagementService());
			const query = `filters[slug][$eq]=${slug}&populate=deep`;

			await strapiArticles.getArticleBySlug(slug);

			expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(RESOURCE_ARTICLE, query);
		});

		describe('quand l‘article est récupéré', () => {
			it('lorsque le mapping est en succès, renvoie l‘article', async () => {
				const slug = 'slug-article';
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(createSuccess(aStrapiArticle()));
				const strapiArticles = new StrapiArticleRepository(strapiService, anErrorManagementService());

				const result = await strapiArticles.getArticleBySlug(slug);
				expect(result).toStrictEqual(createSuccess(anArticle()));
			});

			it('lorsque le mapping est en échec, appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
				const slug = 'slug-article';
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(createSuccess(undefined));

				const errorManagementService = anErrorManagementService();
				const failureFromErrorManagementService = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(failureFromErrorManagementService);

				const strapiArticles = new StrapiArticleRepository(strapiService, errorManagementService);

				const result = await strapiArticles.getArticleBySlug(slug);


				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(
					expect.any(Error),
					aLogInformation({
						apiSource: 'Strapi - Articles',
						contexte: 'récupérer un article par slug',
						message: 'impossible de mapper vers l‘article',
					}));
				expect(result).toStrictEqual(failureFromErrorManagementService);
			});
		});

		it('quand la récupération des articles est en échec, relais l‘échec du strapi service', async () => {
			const slug = 'slug-article';
			const strapiService = aStrapiService();
			const failureFromStrapiService = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
			jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(failureFromStrapiService);

			const strapiArticles = new StrapiArticleRepository(strapiService, anErrorManagementService());

			const result = await strapiArticles.getArticleBySlug(slug);
			expect(result).toStrictEqual(failureFromStrapiService);
		});
	});
	describe('listAllArticleSlug', () => {
		it('appelle le service avec les bons paramètres', async () => {
			const RESOURCE_ARTICLE = 'articles';
			const strapiService = aStrapiService();
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(createSuccess(aStrapiArticleSlugList()));
			const strapiArticles = new StrapiArticleRepository(strapiService, anErrorManagementService());
			const query = 'fields[0]=slug';

			await strapiArticles.listAllArticleSlug();

			expect(strapiService.getCollectionType).toHaveBeenCalledWith(RESOURCE_ARTICLE, query);
		});

		describe('quand l‘article est récupéré', () => {
			it('lorsque le mapping est en succès, renvoie l‘article', async () => {
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(createSuccess(aStrapiArticleSlugList()));
				const strapiArticles = new StrapiArticleRepository(strapiService, anErrorManagementService());

				const result = await strapiArticles.listAllArticleSlug();
				expect(result).toStrictEqual(createSuccess(anArticleSlugList()));
			});

			it('lorsque le mapping est en échec, appelle le service de gestion d’erreur avec l’erreur et le contexte', async () => {
				const strapiService = aStrapiService();
				// @ts-expect-error
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(createSuccess({}));

				const errorManagementService = anErrorManagementService();
				const failureFromErrorManagementService = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(failureFromErrorManagementService);

				const strapiArticles = new StrapiArticleRepository(strapiService, errorManagementService);

				const result = await strapiArticles.listAllArticleSlug();


				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(
					expect.any(Error),
					aLogInformation({
						apiSource: 'Strapi - Articles',
						contexte: 'récupérer la liste des articles slugs',
						message: 'impossible de mapper vers la liste des articles slugs',
					}));
				expect(result).toStrictEqual(failureFromErrorManagementService);
			});
		});

		it('quand la récupération de la liste des slugs est en échec, relais l‘échec du strapi service', async () => {
			const strapiService = aStrapiService();
			const failureFromStrapiService = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValue(failureFromStrapiService);

			const strapiArticles = new StrapiArticleRepository(strapiService, anErrorManagementService());

			const result = await strapiArticles.listAllArticleSlug();
			expect(result).toStrictEqual(failureFromStrapiService);
		});
	});
});
