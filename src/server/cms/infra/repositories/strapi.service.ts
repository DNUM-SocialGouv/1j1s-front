import { CmsService } from '~/server/cms/domain/cmsService';
import { StrapiCollectionType, StrapiSingleType } from '~/server/cms/infra/repositories/strapi.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

const MAX_PAGINATION_SIZE = '100';

// Nombre maximum de requêtes lancées EN PARALLÈLE vers le CMS lors de la récupération
// d'une collection paginée.
//
// Pourquoi ce plafond existe-t-il ?
// Certaines collections (ex. annonces-de-logement : ~850 pages) étaient récupérées en
// lançant TOUTES les pages d'un coup via un unique Promise.all. Le CMS Strapi tourne sur
// un conteneur unique : ces rafales (pics mesurés à ~430 requêtes/seconde) saturaient son
// pool de connexions à la base et son event loop, provoquant des réponses 503 puis le
// crash et le redémarrage automatique du conteneur en production (incident du 24/06/2026,
// génération du sitemap). On borne donc le nombre de requêtes simultanées pour lisser la
// charge. La valeur est volontairement basse et alignée sur la taille du pool de
// connexions configuré côté CMS, afin de ne jamais le saturer.
export const NOMBRE_MAX_REQUETES_PARALLELES_CMS = 5;

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
			const { data } = await this.httpClientService.get<StrapiSingleType<Response>>(endpoint);
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
				// La page 1 a déjà été chargée ci-dessus ; on liste les pages restantes à récupérer.
				const pagesRestantes: number[] = [];
				for (let currentPage = page + 1; currentPage <= pageCount; currentPage++) {
					pagesRestantes.push(currentPage);
				}

				// On récupère ces pages par LOTS successifs plutôt que toutes en même temps :
				// au plus NOMBRE_MAX_REQUETES_PARALLELES_CMS requêtes sont en vol simultanément,
				// et le lot suivant ne démarre qu'une fois le précédent entièrement résolu (await).
				// Le résultat final est identique à l'ancien code (mêmes pages, même ordre), mais
				// la charge envoyée au CMS est lissée au lieu d'arriver en une seule rafale.
				for (let debutLot = 0; debutLot < pagesRestantes.length; debutLot += NOMBRE_MAX_REQUETES_PARALLELES_CMS) {
					const lotDePages = pagesRestantes.slice(debutLot, debutLot + NOMBRE_MAX_REQUETES_PARALLELES_CMS);
					const resultatsDuLot = await Promise.all(
						lotDePages.map((numeroPage) => this.getPaginatedCollectionType<Collection>(resource, query, numeroPage)),
					);
					dataResponseList.push(...resultatsDuLot.flatMap((resultat) => resultat.data));
				}
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
			if (data.length === 0) {
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

	private async getPaginatedCollectionType<Collection>(resource: string, query: string, page: number): Promise<StrapiCollectionType<Collection>> {
		const paginationQuery = `pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=${page}`;
		const queryWithPagination = query ? `${query}&${paginationQuery}` : paginationQuery;
		const endpoint = `${resource}?${queryWithPagination}`;
		const { data } = await this.httpClientService.get<StrapiCollectionType<Collection>>(endpoint);
		return data;
	}
}
