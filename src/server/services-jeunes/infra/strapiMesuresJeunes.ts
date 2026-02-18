import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { StrapiImage, StrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.response';


export interface StrapiMesuresJeunesMesuresJeunesParCategorie {
	vieProfessionnelle: Array<StrapiMesuresJeunesMesureJeune>
	orienterFormer: Array<StrapiMesuresJeunesMesureJeune>
	accompagnement: Array<StrapiMesuresJeunesMesureJeune>
	aidesFinancieres: Array<StrapiMesuresJeunesMesureJeune>
	logement: Array<StrapiMesuresJeunesMesureJeune>
	engagement: Array<StrapiMesuresJeunesMesureJeune>
}
export interface StrapiMesuresJeunesMesureJeune {
	titre: string
	contenu: string
	url: string
	banniere: StrapiSingleRelation<StrapiImage>
	article: StrapiSingleRelation<StrapiArticle>
	pourQui: string
}

export type StrapiMesuresJeunesCategorie = 'accompagnement' | 'orienterFormer' | 'vieProfessionnelle' | 'aidesFinancieres' | 'logement' | 'engagement'
