import { CmsService } from '~/server/cms/domain/cmsService';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

const MAX_PAGINATION_SIZE = '100';

export class StrapiService implements CmsService {
	constructor(
		private httpClientService: PublicHttpClientService,
		private authenticatedHttpClientService: AuthenticatedHttpClientService,
		private errorManagementService: ErrorManagementService,
	) {
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

	async getFirstFromCollectionType<Collection>(resource: string, query: string): Promise<Either<Collection>> {
		try {
			const firstPage = 1;
			const result = await this.getPaginatedCollectionType<Collection>(resource, query, firstPage);
			const data = result.data;
			if (!data[0]) {
				return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			}
			return createSuccess(data[0].attributes);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Strapi',
				contexte: 'get first from collection type strapi',
				message: `Erreur inconnue - Impossible de récupérer la ressource ${resource}`,
			});
		}
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

	private async getPaginatedCollectionType<Collection>(resource: string, query: string, page: number): Promise<Strapi.CollectionType<Collection>> {
		const paginationQuery = `pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=${page}`;
		const queryWithPagination = query ? `${query}&${paginationQuery}` : paginationQuery;
		const endpoint = `${resource}?${queryWithPagination}`;
		const { data } = await this.httpClientService.get<Strapi.CollectionType<Collection>>(endpoint);
		return data;
	}
}
