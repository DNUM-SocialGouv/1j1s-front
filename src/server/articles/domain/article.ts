import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export type ArticleSlug = string;

export interface Article {
	titre: string
	banniere?: Strapi.ImageAttributes
	slug: ArticleSlug
	contenu: string
}
