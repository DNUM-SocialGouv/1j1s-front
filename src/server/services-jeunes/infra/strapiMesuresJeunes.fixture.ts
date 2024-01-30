import { aStrapiArticle, aStrapiImage, aStrapiSingleRelation } from '../../cms/infra/repositories/strapi.fixture';
import { MesuresJeunes } from './strapiMesuresJeunes';

export function aStrapiMesuresJeunes(): MesuresJeunes.MesuresJeunes {
	return {
		accompagnement: [aStrapiMesureJeune({
			titre: 'Une formation en centre EPIDE',
		})],
		aidesFinancieres: [aStrapiMesureJeune({
			article: undefined,
			titre: 'Des aides pour financer son permis de conduire',
		})],
		orienterFormer: [aStrapiMesureJeune({
			titre: 'Les Junior Entreprises',
		})],
		vieProfessionnelle: [aStrapiMesureJeune({
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		})],
	};
}

export function aStrapiMesureJeune(override?: Partial<MesuresJeunes.MesureJeune>): MesuresJeunes.MesureJeune {
	return {
		// TODO (BRUJ 30/01/2024): comment gérer la fixture de l'image ?
		article: aStrapiSingleRelation(aStrapiArticle()),
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		pourQui: 'pour les 12 à 18mois',
		titre: 'Un titre de carte',
		url: 'Une belle url de carte',
		...override,
	};
}
