import { Strapi } from '../../cms/infra/repositories/strapi.response';


export namespace StrapiMesuresJeunes {
	export interface MesuresJeunesParCategorie {
		vieProfessionnelle: Array<StrapiMesuresJeunes.MesureJeune>
		orienterFormer: Array<StrapiMesuresJeunes.MesureJeune>
		accompagnement: Array<StrapiMesuresJeunes.MesureJeune>
		aidesFinancieres: Array<StrapiMesuresJeunes.MesureJeune>
	}
	export interface MesureJeune {
		titre: string
		contenu: string
		url: string
		banniere: Strapi.SingleRelation<Strapi.Image>
		article: Strapi.SingleRelation<Strapi.CollectionType.Article>
		pourQui: string
	}

	export type Categorie = 'accompagnement' | 'orienterFormer' | 'vieProfessionnelle' | 'aidesFinancieres'
}
