import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { ArticlesRepository } from '~/server/articles/domain/articles.repository';
import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { mapArticle } from '~/server/articles/infra/strapiArticles.mapper';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

const RESOURCE_ARTICLE = 'articles';

export class StrapiArticlesRepository implements ArticlesRepository {
	constructor(private readonly strapiService: CmsRepository, private readonly errorManagementService: ErrorManagementService) {
	}

	async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const article = await this.strapiService.getFirstFromCollectionType<StrapiArticle>(RESOURCE_ARTICLE, query);
		if (isFailure(article)) return article;

		try {
			const articleMapped = mapArticle(article.result);
			return createSuccess(articleMapped);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - Articles',
				contexte: 'récupérer un article par slug',
				message: 'impossible de mapper vers l‘article',
			});
		}
	}

	async listAllArticleSlug(): Promise<Either<Array<Pick<Article, 'slug'>>>> {
		const ARTICLE_SLUG_FIELD_NAME = 'slug';
		const query = `fields[0]=${ARTICLE_SLUG_FIELD_NAME}`;
		const strapiSlugs = await this.strapiService.getCollectionType<StrapiArticle>(RESOURCE_ARTICLE, query);
		if (isFailure(strapiSlugs)) return strapiSlugs;

		try {
			const flatMapSlug = (strapiArticle: StrapiArticle) => strapiArticle.slug as Pick<Article, 'slug'>;

			return createSuccess(strapiSlugs.result.map(flatMapSlug));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - Articles',
				contexte: 'récupérer la liste des articles slugs',
				message: 'impossible de mapper vers la liste des articles slugs',
			});
		}

	}
}

