import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export interface StrapiArticle {
	titre: string;
	banniere: Strapi.SingleRelation<Strapi.Image>;
	slug: string;
	contenu: string;
}
