import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { StrapiImage, StrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.response';


export interface StrapiListeActualites {
	listeActualites: StrapiActualite[];
}
export interface StrapiActualite {
	titre: string;
	contenu: string;
	url: string;
	banniere: StrapiSingleRelation<StrapiImage>;
	article: StrapiSingleRelation<StrapiArticle>;
}
