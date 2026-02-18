import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { StrapiImage, StrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.response';

export interface StrapiMesuresEmployeurs {
	dispositifs: Array<StrapiMesureEmployeurDispositif>;
}

export interface StrapiMesureEmployeurDispositif {
	titre: string
	contenu: string
	url: string
	banniere: StrapiSingleRelation<StrapiImage>
	article?: StrapiSingleRelation<StrapiArticle>
	pourQui?: string
}
