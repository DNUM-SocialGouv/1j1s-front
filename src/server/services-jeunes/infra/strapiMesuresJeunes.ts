import { Strapi } from '../../cms/infra/repositories/strapi.response';


export namespace MesuresJeunes {
	export interface MesuresJeunes {
		vieProfessionnelle: Array<MesuresJeunes.MesureJeune>
		orienterFormer: Array<MesuresJeunes.MesureJeune>
		accompagnement: Array<MesuresJeunes.MesureJeune>
		aidesFinancieres: Array<MesuresJeunes.MesureJeune>
	}
	export interface MesureJeune {
		titre: string
		contenu: string
		url: string
		banniere: Strapi.SingleRelation<Strapi.Image>
		article: Strapi.SingleRelation<Strapi.CollectionType.Article>
		pourQui: string
	}
}
