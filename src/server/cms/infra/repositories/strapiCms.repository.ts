import { AxiosResponse } from 'axios';
import qs from 'qs';

import { CarteActualite } from '~/server/cms/domain/actualite';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';
import {
	mapActualites,
	mapArticle,
	mapEspaceJeune,
	mapFicheMetier,
	mapMentionObligatoire,
	mapMesuresEmployeurs,
} from '~/server/cms/infra/repositories/strapi.mapper';
import {
	ArticleAttributesResponse,
	ArticleSimpleAttributesResponse,
	DataResponse,
	EspaceJeuneAttributesResponse,
	MesuresEmployeursAttributesResponse,
	StrapiCollectionTypeResponse,
	StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { handleFailureError } from '~/server/cms/infra/repositories/strapiCmsError';
import { createSuccess, Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMétierHttp } from '~/server/fiche-metier/domain/ficheMetierHttp';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

const MAX_PAGINATION_SIZE = '100';

export class StrapiCmsRepository implements CmsRepository {
	constructor(
    private httpClientService: HttpClientService,
    private authenticatedHttpClientService: HttpClientServiceWithAuthentification,
	) {}

	async getActualites(): Promise<Either<CarteActualite[]>> {
		const query = {
			populate: {
				listeActualites: { populate: '*' },
			},
		};
		const endpoint = `actualite?${qs.stringify(query, { encode: false })}`;
		return this.getResource(endpoint, mapActualites, 'actualite');
	}

	async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
		const filters = `[slug][$eq]=${slug}&populate[0]=banniere`;
		const endpoint = `articles?filters${filters}`;
		return this.getResource<StrapiCollectionTypeResponse<ArticleAttributesResponse>, Article>(endpoint, mapArticle, 'article');
	}

	async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
		const filters = `[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=%2A`;
		const endpoint = `fiche-metiers?filters${filters}`;
		return this.getResource<StrapiCollectionTypeResponse<FicheMétierHttp>, FicheMétier>(endpoint, mapFicheMetier, 'ficher métier');
	}

	async listAllFicheMetierNomMetier(): Promise<Either<Array<string>>> {
		return this.listAllCollectionField<FicheMétierHttp, 'nom_metier'>('fiche-metiers', 'nom_metier');
	}

	async listAllArticleSlug(): Promise<Either<Array<string>>> {
		return this.listAllCollectionField<ArticleAttributesResponse, 'slug'>('articles', 'slug');
	}

	async getMentionObligatoire(type: MentionsObligatoires): Promise<Either<Article>> {
		const requestSuffix = '?populate=*';
		const getContentTypeApi = (contenuType: MentionsObligatoires): string => {
			switch (contenuType) {
				case MentionsObligatoires.ACCESSIBILITE: return 'accessibilite';
				case MentionsObligatoires.CONDITIONS_GENERALES_UTILISATIONS: return 'conditions-generales-d-utilisation';
				case MentionsObligatoires.MENTIONS_LEGALES: return 'mention-legale';
				case MentionsObligatoires.POLITIQUES_CONFIDENTIALITES: return 'politique-de-confidentialite';
			}
		};
		const endpoint = `${getContentTypeApi(type)}${requestSuffix}`;
		return this.getResource<StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>, Article>(endpoint, mapMentionObligatoire, 'mention obligatoire');
	}

	async getEspaceJeune(): Promise<Either<EspaceJeune>> {
		const query = {
			populate: {
				accompagnement: { populate: '*' },
				aidesFinancieres: { populate: '*' },
				orienterFormer: { populate: '*' },
				vieProfessionnelle: { populate: '*' },
			},
		};
		const endpoint = `mesure-jeune?${qs.stringify(query, { encode: false })}`;
		return this.getResource<StrapiSingleTypeResponse<EspaceJeuneAttributesResponse>, EspaceJeune>(endpoint, mapEspaceJeune, 'mesures jeune');
	}

	async getMesuresEmployeurs(): Promise<Either<MesuresEmployeurs>> {
		const query = {
			populate: {
				dispositifs: {
					populate: '*',
				},
			},
		};
		const endpoint = `les-mesures-employeurs?${qs.stringify(query, { encode: false })}`;
		return this.getResource<StrapiSingleTypeResponse<MesuresEmployeursAttributesResponse>, MesuresEmployeurs>(endpoint, mapMesuresEmployeurs, 'les mesures employeurs');
	}

	async getResource<ApiResponseType, ResponseType>(endpoint: string, mapper: (data: ApiResponseType) => ResponseType, content: string): Promise<Either<ResponseType>> {
		try {
			const { data }: AxiosResponse = await this.httpClientService.get<ResponseType>(endpoint);
			return createSuccess(mapper(data));
		} catch (e) {
			return handleFailureError(e, content);
		}
	}

	async save<Body, Response = undefined>(resource: string, body: Body): Promise<Either<Response>> {
		try {
			const { data } = await this.authenticatedHttpClientService.post<{ data: Body }, Response>(resource, { data: body });
			return createSuccess(data);
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}

	private mapDataResponseField<CollectionType, Field extends keyof CollectionType>(dataResponseList: Array<DataResponse<CollectionType>>, field: Field): Array<CollectionType[Field]> {
		return dataResponseList.map(({ attributes }) => attributes[field]);
	}

	private async listAllCollectionField<CollectionType, Field extends keyof CollectionType>(resource: string, field: Field): Promise<Either<Array<CollectionType[Field]>>> {
		try {
			const firstPage = 1;
			const result = await this.getPaginatedCollectionWithField<CollectionType, Field>(resource, field, firstPage);
			const { page, pageCount } = result.meta.pagination;
			const dataResponseList = result.data;

			const hasSeveralPages = pageCount > page;
			if (hasSeveralPages) {
				const promiseList = [];
				for(let currentPage = page + 1; currentPage <= pageCount; currentPage++) {
					promiseList.push(this.getPaginatedCollectionWithField<CollectionType, Field>(resource, field, currentPage));
				}
				const resultList = await Promise.all(promiseList);
				dataResponseList.push(...resultList.flatMap((result) => result.data));
			}

			return createSuccess(this.mapDataResponseField(dataResponseList, field));
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}

	private async getPaginatedCollectionWithField<CollectionType, Field extends keyof CollectionType>(resource: string, field: Field, page: number): Promise<StrapiCollectionTypeResponse<CollectionType>> {
		const endpoint = `${resource}/?fields[]=${String(field)}&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=${page}`;
		const { data } = await this.httpClientService.get<StrapiCollectionTypeResponse<CollectionType>>(endpoint);
		return data;
	}
}
