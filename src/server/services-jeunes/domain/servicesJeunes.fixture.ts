import { anArticle } from '~/server/cms/domain/article.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';
import { aStrapiArticle, aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';

export function aServiceJeune(override?: Partial<ServiceJeune>): ServiceJeune {
	return {
		article: anArticle(),
		banniere: anImage(),
		categorie: ServiceJeune.Categorie.ACCOMPAGNEMENT,
		concerne: 'pour les 12 à 18mois',
		contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		extraitContenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s …',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Un titre de carte',
		url: 'Une belle url de carte',
		...override,
	};
}

export function aServiceJeuneList(): Array<ServiceJeune> {
	return [
		aServiceJeune({
			categorie: ServiceJeune.Categorie.ENTREE_VIE_PROFESSIONELLE,
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		}),
		aServiceJeune({
			categorie: ServiceJeune.Categorie.ORIENTATION_FORMATION,
			titre: 'Les Junior Entreprises',
		}),
		aServiceJeune({
			categorie: ServiceJeune.Categorie.ACCOMPAGNEMENT,
			titre: 'Une formation en centre EPIDE',
		}),
	];
}

export function anUnorderedAndNotFilterServiceJeuneList(): Array<ServiceJeune> {
	return [
		aServiceJeune({
			categorie: ServiceJeune.Categorie.ACCOMPAGNEMENT,
			concerne: 'pour les 12 à 18mois',
			contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
			titre: 'Une formation en centre EPIDE',
			url: 'Une belle url de carte',

		}),
		aServiceJeune({
			categorie: ServiceJeune.Categorie.AIDES_FINANCIERES,
			titre: 'Des aides pour financer son permis de conduire',
		}),
		aServiceJeune({
			categorie: ServiceJeune.Categorie.ORIENTATION_FORMATION,
			titre: 'Les Junior Entreprises',
		}),
		aServiceJeune({
			categorie: ServiceJeune.Categorie.ENTREE_VIE_PROFESSIONELLE,
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		}),
	];
}

