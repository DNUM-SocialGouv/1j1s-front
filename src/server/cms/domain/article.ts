import { Image } from '~/server/cms/domain/image';

export type ArticleSlug = string;

export interface Article {
	titre: string
	contenu: string
	bannière?: Image
	slug?: ArticleSlug
}
