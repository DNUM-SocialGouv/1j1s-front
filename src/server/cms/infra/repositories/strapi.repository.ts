import qs from 'qs';

import { CarteActualite } from '~/server/cms/domain/actualite';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { CarteMesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import {
	mapAnnonceLogement,
	mapArticle,
	mapEnregistrerOffreDeStage,
	mapEspaceJeune,
	mapFicheMetier,
	mapMesuresEmployeurs,
	mapOffreStage,
	mapStrapiListeActualités,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { handleFailureError } from '~/server/cms/infra/repositories/strapiCmsError';
import { createFailure, createSuccess, Either, isSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

const MAX_PAGINATION_SIZE = '100';
const RESOURCE_ARTICLE = 'articles';
const RESOURCE_ACTUALITE = 'actualite';
const RESOURCE_FICHE_METIER = 'fiche-metiers';
const RESOURCE_MESURE_JEUNE = 'mesure-jeune';
const RESOURCE_MESURES_EMPLOYEURS = 'les-mesures-employeurs';
const RESOURCE_OFFRE_DE_STAGE = 'offres-de-stage';
const RESOURCE_ANNONCE_DE_LOGEMENT = 'annonces-de-logement';

export class StrapiRepository implements CmsRepository {
	constructor(
		private httpClientService: HttpClientService,
		private authenticatedHttpClientService: HttpClientServiceWithAuthentification,
	) {
	}

	private async getCollectionType<Collection, Response>(resource: string, query: string, mapper: (data: Collection) => Response): Promise<Either<Response[]>> {
		try {
			const endpoint = `${resource}?${query}`;
			const { data } = await this.httpClientService.get<Strapi.CollectionType<Collection>>(endpoint);
			const response = data.data.map((data) => mapper(data.attributes));
			return createSuccess(response);
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}

	private async getSingleType<Single, Response>(resource: string, query: string, mapper: (data: Single) => Response): Promise<Either<Response>> {
		try {
			const endpoint = `${resource}?${query}`;
			const { data } = await this.httpClientService.get<Strapi.SingleType<Single>>(endpoint);
			const response = mapper(data.data.attributes);
			return createSuccess(response);
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}

	private getFirstFromCollection<Response>(responseList: Either<Array<Response>>): Either<Response> {
		if (isSuccess(responseList)) {
			if (!responseList.result[0]) {
				return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
			}
			return createSuccess(responseList.result[0]);
		} else {
			return responseList;
		}
	}

	async getActualitéList(): Promise<Either<Array<CarteActualite>>> {
		const query = {
			populate: {
				listeActualites: { populate: '*' },
			},
		};
		const queryString = qs.stringify(query, { encode: false });
		return this.getSingleType<Strapi.SingleType.ListeActualités, Array<CarteActualite>>(RESOURCE_ACTUALITE, queryString, mapStrapiListeActualités);
	}

	async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const articleList = await this.getCollectionType<Strapi.CollectionType.Article, Article>(RESOURCE_ARTICLE, query, mapArticle);
		return this.getFirstFromCollection(articleList);
	}

	async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
		const query = `filters[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=deep`;
		const ficheMétierList = await this.getCollectionType<Strapi.CollectionType.FicheMétier, FicheMétier>(RESOURCE_FICHE_METIER, query, mapFicheMetier);
		return this.getFirstFromCollection(ficheMétierList);
	}

	async listAllFicheMetierNomMetier(): Promise<Either<Array<string>>> {
		return this.listAllCollectionField<Strapi.CollectionType.FicheMétier, 'nom_metier'>('fiche-metiers', 'nom_metier');
	}

	async listAllArticleSlug(): Promise<Either<Array<string>>> {
		return this.listAllCollectionField<Strapi.CollectionType.Article, 'slug'>('articles', 'slug');
	}

	async getMentionObligatoire(type: MentionsObligatoires): Promise<Either<Article>> {
		const query = 'populate=*';
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

	async getMesureJeune(): Promise<Either<EspaceJeune>> {
		const query = {
			populate: {
				accompagnement: { populate: '*' },
				aidesFinancieres: { populate: '*' },
				orienterFormer: { populate: '*' },
				vieProfessionnelle: { populate: '*' },
			},
		};
		const queryString = qs.stringify(query, { encode: false });
		return this.getSingleType<Strapi.SingleType.LesMesuresJeunes, EspaceJeune>(RESOURCE_MESURE_JEUNE, queryString, mapEspaceJeune);
	}

	async getMesuresEmployeurs(): Promise<Either<CarteMesuresEmployeurs[]>> {
		const query = {
			populate: {
				dispositifs: {
					populate: '*',
				},
			},
		};
		const queryString = qs.stringify(query, { encode: false });
		return this.getSingleType<Strapi.SingleType.LesMesuresEmployeurs, CarteMesuresEmployeurs[]>(RESOURCE_MESURES_EMPLOYEURS, queryString, mapMesuresEmployeurs);
	}

	async getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const offreStageList = await this.getCollectionType<Strapi.CollectionType.OffreStage, OffreDeStage>(RESOURCE_OFFRE_DE_STAGE, query, mapOffreStage);
		return this.getFirstFromCollection(offreStageList);
	}

	async getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>> {
		const query = `filters[slug][$eq]=${slug}&populate=deep`;
		const annonceLogementList = await this.getCollectionType<Strapi.CollectionType.AnnonceLogement, AnnonceDeLogement>(RESOURCE_ANNONCE_DE_LOGEMENT, query, mapAnnonceLogement);
		return this.getFirstFromCollection(annonceLogementList);
	}

	async saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>> {
		const offreStrapi = mapEnregistrerOffreDeStage(offre);
		return this.save<Strapi.CollectionType.OffreStageDepot, void>(RESOURCE_OFFRE_DE_STAGE, offreStrapi);
	}

	async save<Body, Response = undefined>(resource: string, body: Body): Promise<Either<Response>> {
		try {
			const { data } = await this.authenticatedHttpClientService.post<{ data: Body }, Response>(resource, { data: body });
			return createSuccess(data);
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}

	private mapDataResponseField<CollectionType, Field extends keyof CollectionType>(dataResponseList: Array<Strapi.Data<CollectionType>>, field: Field): Array<CollectionType[Field]> {
		return dataResponseList.map(({ attributes }) => attributes[field]);
	}

	// TODO: merge with getCollectionType
	private async listAllCollectionField<CollectionType, Field extends keyof CollectionType>(resource: string, field: Field): Promise<Either<Array<CollectionType[Field]>>> {
		try {
			const firstPage = 1;
			const result = await this.getPaginatedCollectionWithField<CollectionType, Field>(resource, field, firstPage);
			const { page, pageCount } = result.meta.pagination;
			const dataResponseList = result.data;

			const hasSeveralPages = pageCount > page;
			if (hasSeveralPages) {
				const promiseList = [];
				for (let currentPage = page + 1; currentPage <= pageCount; currentPage++) {
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

	private async getPaginatedCollectionWithField<CollectionType, Field extends keyof CollectionType>(resource: string, field: Field, page: number): Promise<Strapi.CollectionType<CollectionType>> {
		const endpoint = `${resource}/?fields[]=${String(field)}&pagination[pageSize]=${MAX_PAGINATION_SIZE}&pagination[page]=${page}`;
		const { data } = await this.httpClientService.get<Strapi.CollectionType<CollectionType>>(endpoint);
		return data;
	}
}
