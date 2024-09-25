import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export interface StrapiArticle {
	contenu: string;
	banniere: Strapi.SingleRelation<Strapi.Image>;
	slug: string;
	titre: string;
	updatedAt: string;
}
