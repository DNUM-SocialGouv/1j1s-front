import { StrapiImage, StrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.response';

export interface StrapiArticle {
	contenu: string;
	banniere: StrapiSingleRelation<StrapiImage>;
	slug: string;
	titre: string;
	updatedAt: string;
}
