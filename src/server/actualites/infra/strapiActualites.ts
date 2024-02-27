import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';


export namespace StrapiListeActualites {
	export interface ListeActualites {
		listeActualites: StrapiListeActualites.Actualite[];
	}
	export interface Actualite {
		titre: string;
		contenu: string;
		url: string;
		banniere: Strapi.SingleRelation<Strapi.Image>;
		article: Strapi.SingleRelation<StrapiArticle>;
	}
}
