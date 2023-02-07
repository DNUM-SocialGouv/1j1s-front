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

const MAX_PAGINATION = '255';
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
	/*
	private recupererNomMetierDesFichesMetier = ( page=1 ) => {
		const endpoint = 'fiche-metiers?pagination[pageSize]=10';
		const mapNomMetier = (ficheMetierResponse: any) {
			const ficheMetier = ficheMetierResponse.data[0].attributes;
			return ficheMetier.reduce( (noms: Array<string>, ficheMetier:any) => ([...noms, ficheMetier.nom_metier]) ,[])
		}
		return this.getResource<StrapiCollectionTypeResponse<FicheMétierHttp>, FicheMétier>(endpoint, mapNomMetier, 'ficher métier');

		//return this.getResource('fiche-metiers?fields[]=nom&pagination[page]=' + page + '&pagination[pageSize]=255 ', ((e) => e.data[0].attributes.nomMetier), 'nom fiche métier');
	};
	*/

	private async listFicheMetierPourNomMetier(currentPage=1, accumulator: Array<{attributes: { nom_metier: string }}>= []): Promise<Array<{attributes: { nom_metier: string }}>> {
		const response = await this.httpClientService.get<StrapiCollectionTypeResponse<FicheMétierHttp>>(`fiche-metiers/?fields[]=nom_metier&pagination[page]=${currentPage}&pagination[pageSize]=${MAX_PAGINATION}`);
		const lastPage = response.data.meta.pagination.pageCount;
		const ficheMétierHttpList: Array<{attributes: { nom_metier: string }}> = accumulator.concat(response.data.data);
		if(currentPage >= lastPage) {
			return ficheMétierHttpList;
		}
		return this.listFicheMetierPourNomMetier(currentPage + 1, ficheMétierHttpList);
	}

	async listFicheMetierNomMetier(): Promise<Either<Array<string>>> {
		const ficheMétierHttpList = await this.listFicheMetierPourNomMetier();
		return createSuccess(ficheMétierHttpList.map(({ attributes }) => attributes.nom_metier));
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
}
