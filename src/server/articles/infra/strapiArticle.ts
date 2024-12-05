import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { ISODateTime } from '~/shared/ISODateTime';

export interface StrapiArticle {
	contenu: string;
	banniere: Strapi.SingleRelation<Strapi.Image>;
	slug: string;
	titre: string;
	updatedAt: ISODateTime;
}
