import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { mapArticle } from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { createFailure, createSuccess, Either, isSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

const MAX_PAGINATION_SIZE = '100';
const RESOURCE_ARTICLE = 'articles';

export class StrapiRepository implements CmsRepository {
	constructor(
		private httpClientService: PublicHttpClientService,
		private authenticatedHttpClientService: AuthenticatedHttpClientService,
		private errorManagementService: ErrorManagementService,
	) {
	}

	private async getSingleTypeDeprecated<Single, Response>(resource: string, query: string, mapper: (data: Single) => Response): Promise<Either<Response>> {
		try {
			const endpoint = `${resource}?${query}`;
			const { data } = await this.httpClientService.get<Strapi.SingleType<Single>>(endpoint);
			const response = mapper(data.data.attributes);
			return createSuccess(response);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Strapi',
				contexte: 'get single type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${resource}`,
			});
		}
	}

	// NOTE (SULI 23-10-2023): methode dépréciée au profit de GetCollectionType qui ne prend pas de mapper en paramètre
	// doit disparaitre après avoir scindé complètement le CMS repository
	async getCollectionTypeDeprecated<Collection, Response>(resource: string, query: string, mapper: (data: Collection) => Response): Promise<Either<Response[]>> {
		try {
			const firstPage = 1;
			const result = await this.getPaginatedCollectionType<Collection>(resource, query, firstPage);
			const { page, pageCount } = result.meta.pagination;
			const dataResponseList = result.data;

			const hasSeveralPages = pageCount > page;
			if (hasSeveralPages) {
				const promiseList = [];
				for (let currentPage = page + 1; currentPage <= pageCount; currentPage++) {
					promiseList.push(this.getPaginatedCollectionType<Collection>(resource, query, currentPage));
				}
				const resultList = await Promise.all(promiseList);
				dataResponseList.push(...resultList.flatMap((result) => result.data));
			}

			const response = dataResponseList.map((data) => mapper(data.attributes));
			return createSuccess(response);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Strapi',
				contexte: 'get collection type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${resource}`,
			});
		}
	}

	async getSingleType<Response>(resource: string, query: string): Promise<Either<Response>> {
		try {
			const endpoint = `${resource}?${query}`;
			const { data } = await this.httpClientService.get<Strapi.SingleType<Response>>(endpoint);
			return createSuccess(data.data.attributes);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Strapi',
				contexte: 'get single type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${resource}`,
			});
		}
	}

	async getCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection[]>> {
		try {
			const firstPage = 1;
			const result = await this.getPaginatedCollectionType<Collection>(resource, query, firstPage);
			const { page, pageCount } = result.meta.pagination;
			const dataResponseList = result.data;

			const hasSeveralPages = pageCount > page;
			if (hasSeveralPages) {
				const promiseList = [];
				for (let currentPage = page + 1; currentPage <= pageCount; currentPage++) {
					promiseList.push(this.getPaginatedCollectionType<Collection>(resource, query, currentPage));
				}
				const resultList = await Promise.all(promiseList);
				dataResponseList.push(...resultList.flatMap((result) => result.data));
			}

			const collections = dataResponseList.map((data) => data.attributes);

			return createSuccess(collections);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Strapi',
				contexte: 'get collection type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${resource}`,
			});
		}
	}

	private async getPaginatedCollectionType<Collection>(resource: string, query: string, page: number): Promise<Strapi.CollectionType<Collection>> {
		const paginationQuery = `pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=${page}`;
		const queryWithPagination = query ? `${query}&${paginationQuery}` : paginationQuery;
		const endpoint = `${resource}?${queryWithPagination}`;
		const { data } = await this.httpClientService.get<Strapi.CollectionType<Collection>>(endpoint);
		return data;
	}

	private getFirstFromCollection<Response>(responseList: Either<Array<Response>>): Either<Response> {
		if (isSuccess(responseList)) {
			if (!responseList.result[0]) {
				return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			}
			return createSuccess(responseList.result[0]);
		} else {
			return responseList;
		}
	}

	async getFirstFromCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection>> {
		const collectionType = await this.getCollectionType<Collection>(resource, query);
		return this.getFirstFromCollection(collectionType);
	}

	async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const articleList = await this.getCollectionTypeDeprecated<Strapi.CollectionType.Article, Article>(RESOURCE_ARTICLE, query, mapArticle);
		return this.getFirstFromCollection(articleList);
	}

	async listAllArticleSlug(): Promise<Either<Array<string>>> {
		const ARTICLE_SLUG_FIELD_NAME = 'slug';
		const query = `fields[0]=${ARTICLE_SLUG_FIELD_NAME}`;
		const flatMapSlug = (strapiArticle: Strapi.CollectionType.Article): string => strapiArticle.slug;
		return await this.getCollectionTypeDeprecated<Strapi.CollectionType.Article, string>(RESOURCE_ARTICLE, query, flatMapSlug);
	}

	async save<Body, Response = undefined>(resource: string, body: Body): Promise<Either<Response>> {
		try {
			const { data } = await this.authenticatedHttpClientService.post<{
				data: Body
			}, Response>(resource, { data: body });
			return createSuccess(data);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Strapi',
				contexte: 'save strapi',
				message: `Erreur inconnue - Impossible de sauvegarder la ressource ${resource}`,
				severity: Severity.FATAL,
			});
		}
	}
}
