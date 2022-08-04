import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export type ArticleContentType = Strapi.PublicationContentType<ArticleAttributes>

export interface ArticleAttributes extends Strapi.PublicationContentTypeAttributes {
		titre: string
		banniere?: Strapi.Image
		slug: string
		contenu?: string
}

