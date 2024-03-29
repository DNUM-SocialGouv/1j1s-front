import { Article, ArticleSlug } from '~/server/articles/domain/article';
import { ArticleRepository } from '~/server/articles/domain/articles.repository';
import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { mapArticle } from '~/server/articles/infra/strapiArticle.mapper';
import { CmsService } from '~/server/cms/domain/cmsService';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

const RESOURCE_ARTICLE = 'articles';

export class StrapiArticleRepository implements ArticleRepository {
	constructor(private readonly strapiService: CmsService, private readonly errorManagementService: ErrorManagementService) {
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

	async listAllArticleSlug(): Promise<Either<Array<string>>> {
		const ARTICLE_SLUG_FIELD_NAME = 'slug';
		const query = `fields[0]=${ARTICLE_SLUG_FIELD_NAME}`;
		const strapiSlugs = await this.strapiService.getCollectionType<StrapiArticle>(RESOURCE_ARTICLE, query);
		if (isFailure(strapiSlugs)) return strapiSlugs;

		try {
			const flatMapSlug = (strapiArticle: StrapiArticle) => strapiArticle.slug;
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

