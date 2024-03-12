import { anImage } from '~/server/cms/domain/image.fixture';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';

export function aServiceJeune(override?: Partial<ServiceJeune>): ServiceJeune {
	return {
		banniere: anImage(),
		categorie: ServiceJeune.Categorie.ACCOMPAGNEMENT,
		concerne: 'pour les 12 à 18mois',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Un titre de carte',
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
			titre: 'Une formation en centre EPIDE',
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

