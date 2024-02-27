import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export namespace StrapiMesuresEmployeurs {
	export interface MesuresEmployeurs {
		dispositifs: Array<StrapiMesuresEmployeurs.Dispositif>;
	}

	export interface Dispositif {
		titre: string
		contenu: string
		url: string
		banniere: Strapi.SingleRelation<Strapi.Image>
		article?: Strapi.SingleRelation<Strapi.CollectionType.Article>
		pourQui?: string
	}
}
