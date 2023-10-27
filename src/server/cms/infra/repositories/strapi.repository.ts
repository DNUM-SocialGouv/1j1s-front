import { Actualité } from '~/server/cms/domain/actualité';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import {
	mapAnnonceLogement,
	mapArticle,
	mapEnregistrerOffreDeStage,
	mapMesuresEmployeurs,
	mapOffreStage,
	mapServiceJeuneList,
	mapStrapiListeActualités,
	mapVideoCampagneApprentissage,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { createFailure, createSuccess, Either, isSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

const MAX_PAGINATION_SIZE = '100';
const RESOURCE_ARTICLE = 'articles';
const RESOURCE_ACTUALITE = 'actualite';
const RESOURCE_MESURE_JEUNE = 'mesure-jeune';
const RESOURCE_MESURES_EMPLOYEURS = 'les-mesures-employeurs';
const RESOURCE_OFFRE_DE_STAGE = 'offres-de-stage';
const RESOURCE_ANNONCE_DE_LOGEMENT = 'annonces-de-logement';
const RESOURCE_VIDEO_CAMPAGNE_APPRENTISSAGE = 'videos-campagne-apprentissages';

export class StrapiRepository implements CmsRepository {
	constructor(
		private httpClientService: PublicHttpClientService,
		private authenticatedHttpClientService: AuthenticatedHttpClientService,
		private errorManagementService: ErrorManagementService,
	) {
	}

	private async getSingleType<Single, Response>(resource: string, query: string, mapper: (data: Single) => Response): Promise<Either<Response>> {
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

	async getActualitéList(): Promise<Either<Array<Actualité>>> {
		const query = 'populate=deep';
		return this.getSingleType<Strapi.SingleType.ListeActualités, Array<Actualité>>(RESOURCE_ACTUALITE, query, mapStrapiListeActualités);
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

	async listAllAnnonceDeLogementSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const flatMapSlug = (annoneDeLogement: Strapi.CollectionType.AnnonceLogement): string => annoneDeLogement.slug;
		return await this.getCollectionTypeDeprecated<Strapi.CollectionType.AnnonceLogement, string>(RESOURCE_ANNONCE_DE_LOGEMENT, query, flatMapSlug);
	}

	async listAllOffreDeStageSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const flatMapSlug = (offreDeStage: Strapi.CollectionType.OffreStage): string => offreDeStage.slug;
		return await this.getCollectionTypeDeprecated<Strapi.CollectionType.OffreStage, string>(RESOURCE_OFFRE_DE_STAGE, query, flatMapSlug);
	}

	async getMentionObligatoire(type: MentionsObligatoires): Promise<Either<Article>> {
		const query = 'populate=deep';
		return this.getSingleType<Strapi.CollectionType.Article, Article>(this.getResourceMentionObligatoire(type), query, mapArticle);
	}

	private getResourceMentionObligatoire(type: MentionsObligatoires): string {
		switch (type) {
			case MentionsObligatoires.ACCESSIBILITE:
				return 'accessibilite';
			case MentionsObligatoires.CONDITIONS_GENERALES_UTILISATIONS:
				return 'conditions-generales-d-utilisation';
			case MentionsObligatoires.MENTIONS_LEGALES:
				return 'mention-legale';
			case MentionsObligatoires.POLITIQUES_CONFIDENTIALITES:
				return 'politique-de-confidentialite';
		}
	}

	async getServiceJeuneList(): Promise<Either<Array<ServiceJeune>>> {
		const query = 'populate=deep';
		return this.getSingleType<Strapi.SingleType.LesMesuresJeunes, Array<ServiceJeune>>(RESOURCE_MESURE_JEUNE, query, mapServiceJeuneList);
	}

	async getMesuresEmployeurs(): Promise<Either<MesureEmployeur[]>> {
		const query = 'populate=deep';
		return this.getSingleType<Strapi.SingleType.LesMesuresEmployeurs, MesureEmployeur[]>(RESOURCE_MESURES_EMPLOYEURS, query, mapMesuresEmployeurs);
	}

	async getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const offreStageList = await this.getCollectionTypeDeprecated<Strapi.CollectionType.OffreStage, OffreDeStage>(RESOURCE_OFFRE_DE_STAGE, query, mapOffreStage);
		return this.getFirstFromCollection(offreStageList);
	}

	async getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const annonceLogementList = await this.getCollectionTypeDeprecated<Strapi.CollectionType.AnnonceLogement, AnnonceDeLogement>(RESOURCE_ANNONCE_DE_LOGEMENT, query, mapAnnonceLogement);
		return this.getFirstFromCollection(annonceLogementList);
	}

	async saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>> {
		const offreStrapi = mapEnregistrerOffreDeStage(offre);
		return this.save<Strapi.CollectionType.OffreStageDepot, void>(RESOURCE_OFFRE_DE_STAGE, offreStrapi);
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

	async getAllVideosCampagneApprentissage(): Promise<Either<Array<VideoCampagneApprentissage>>> {
		const query = 'sort[0]=Index';
		return await this.getCollectionTypeDeprecated<Strapi.CollectionType.VideoCampagneApprentissage, VideoCampagneApprentissage>(RESOURCE_VIDEO_CAMPAGNE_APPRENTISSAGE, query, mapVideoCampagneApprentissage);
	}
}
