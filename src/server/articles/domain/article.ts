import { Strapi } from '~/server/articles/infra/repositories/apiStrapiArticle.response';

export type ArticleSlug = string;

export interface Article {
	titre: string
	banniere?: Strapi.ImageAttributes
	slug: ArticleSlug
	contenu: string
}
