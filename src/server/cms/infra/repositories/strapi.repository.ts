import { Actualite } from '~/server/cms/domain/actualite';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FoireAuxQuestions } from '~/server/cms/domain/foireAuxQuestions.type';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { OffreDeStage, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import {
	mapAnnonceLogement,
	mapArticle,
	mapEnregistrerOffreDeStage,
	mapFaq,
	mapFicheMetier,
	mapMesuresEmployeurs,
	mapOffreStage,
	mapServiceJeuneList,
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
const RESOURCE_FOIRE_AUX_QUESTIONS = 'foire-aux-questions';

export class StrapiRepository implements CmsRepository {
	constructor(
		private httpClientService: HttpClientService,
		private authenticatedHttpClientService: HttpClientServiceWithAuthentification,
	) {
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

	private async getCollectionType<Collection, Response>(resource: string, query: string, mapper: (data: Collection) => Response): Promise<Either<Response[]>> {
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
		} catch (e) {
			return handleFailureError(e, resource);
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
				return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
			}
			return createSuccess(responseList.result[0]);
		} else {
			return responseList;
		}
	}

	async getActualitéList(): Promise<Either<Array<Actualite>>> {
		const query = 'populate=deep';
		return this.getSingleType<Strapi.SingleType.ListeActualités, Array<Actualite>>(RESOURCE_ACTUALITE, query, mapStrapiListeActualités);
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
		const FICHE_METIER_NOM_METIER_FIELD_NAME = 'nom_metier';
		const query = `fields[]=${FICHE_METIER_NOM_METIER_FIELD_NAME}`;
		const flatMapNomMetier = (strapiFicheMetier: Strapi.CollectionType.FicheMétier): string => strapiFicheMetier.nom_metier;
		return this.getCollectionType<Strapi.CollectionType.FicheMétier, string>(RESOURCE_FICHE_METIER, query, flatMapNomMetier);
	}

	async listAllArticleSlug(): Promise<Either<Array<string>>> {
		const ARTICLE_SLUG_FIELD_NAME = 'slug';
		let query = `fields[0]=${ARTICLE_SLUG_FIELD_NAME}`;
		const faqSlugList = await this.listAllFoireAuxQuestionsSlug();
		if (isSuccess(faqSlugList)) {
			const exceptFaqSlug = this.filterFaqSlug(faqSlugList.result);
			query = `${query}${exceptFaqSlug}`;
		}
		const flatMapSlug = (strapiArticle: Strapi.CollectionType.Article): string => strapiArticle.slug;
		return await this.getCollectionType<Strapi.CollectionType.Article, string>(RESOURCE_ARTICLE, query, flatMapSlug);
	}

	private filterFaqSlug(faqSlugList: Array<string>): string {
		return faqSlugList.map((slug, index) => `&filters[$and][${index}][slug][$ne]=${slug}`).join('');
	}

	async listAllFoireAuxQuestionsSlug(): Promise<Either<Array<string>>> {
		const query = 'populate[reponse][fields][0]=slug';
		const flatMapSlug = (faq: Strapi.CollectionType.FoireAuxQuestions): string | undefined => mapFaq(faq).urlArticleRéponse;
		const allFoireAuxQuestionsSlug = await this.getCollectionType<Strapi.CollectionType.FoireAuxQuestions, string | undefined>(RESOURCE_FOIRE_AUX_QUESTIONS, query, flatMapSlug);
		if (isSuccess(allFoireAuxQuestionsSlug)) {
			return  {
				instance: 'success',
				result: this.filtrerSlugFoireAuxQuestionSansRelation(allFoireAuxQuestionsSlug.result),
			};
		}
		return allFoireAuxQuestionsSlug;
	}

	filtrerSlugFoireAuxQuestionSansRelation(result: Array<string | undefined>): Array<string> {
		return result.filter((slug): slug is string => slug !== undefined);
	}

	async listAllAnnonceDeLogementSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const flatMapSlug = (annoneDeLogement: Strapi.CollectionType.AnnonceLogement): string => annoneDeLogement.slug;
		return await this.getCollectionType<Strapi.CollectionType.AnnonceLogement, string>(RESOURCE_ANNONCE_DE_LOGEMENT, query, flatMapSlug);
	}

	async listAllOffreDeStageSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const flatMapSlug = (offreDeStage: Strapi.CollectionType.OffreStage): string => offreDeStage.slug;
		return await this.getCollectionType<Strapi.CollectionType.OffreStage, string>(RESOURCE_OFFRE_DE_STAGE, query, flatMapSlug);
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

	async getAllFoireAuxQuestions(): Promise<Either<Array<FoireAuxQuestions>>> {
		const query = 'fields[0]=problematique&populate[reponse][fields][0]=slug';
		const allFoireAuxQuestions = await this.getCollectionType<Strapi.CollectionType.FoireAuxQuestions, FoireAuxQuestions>(RESOURCE_FOIRE_AUX_QUESTIONS, query, mapFaq);
		if (isSuccess(allFoireAuxQuestions)) {
			return  {
				instance: 'success',
				result: this.filtrerFoireAuxQuestionSansRelation(allFoireAuxQuestions.result),
			};
		}
		return allFoireAuxQuestions;
	}

	filtrerFoireAuxQuestionSansRelation(result: Array<FoireAuxQuestions>): Array<FoireAuxQuestions> {
		return result.filter((faq) => faq.urlArticleRéponse !== undefined );
	}
}
