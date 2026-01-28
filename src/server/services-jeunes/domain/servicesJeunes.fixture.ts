import { anImage } from '~/server/cms/domain/image.fixture';
import {
	mapCodeCategorieServiceJeuneToLibelle,
	ServiceJeune,
	ServiceJeuneCodeCategorie,
} from '~/server/services-jeunes/domain/servicesJeunes';

export function aServiceJeune(override?: Partial<ServiceJeune>): ServiceJeune {
	return {
		banniere: anImage(),
		categorie: {
			code: ServiceJeuneCodeCategorie.ACCOMPAGNEMENT,
			libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ACCOMPAGNEMENT),
		},
		concerne: 'pour les 12 à 18mois',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Un titre de carte',
		...override,
	};
}

export function aServiceJeuneList(): Array<ServiceJeune> {
	return [
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE),
			},
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ORIENTATION_FORMATION,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ORIENTATION_FORMATION),
			},
			titre: 'Les Junior Entreprises',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ACCOMPAGNEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ACCOMPAGNEMENT),
			},
			titre: 'Une formation en centre EPIDE',
		}),
	];
}

export function anUnorderedAndNotFilterServiceJeuneList(): Array<ServiceJeune> {
	return [
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ACCOMPAGNEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ACCOMPAGNEMENT),
			},
			concerne: 'pour les 12 à 18mois',
			titre: 'Une formation en centre EPIDE',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.AIDES_FINANCIERES,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.AIDES_FINANCIERES),
			},
			titre: 'Des aides pour financer son permis de conduire',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ENGAGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ENGAGEMENT),
			},
			titre: 'Le Service Militaire Volontaire',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.LOGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.LOGEMENT),
			},
			titre: 'Un Logement',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ORIENTATION_FORMATION,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ORIENTATION_FORMATION),
			},
			titre: 'Les Junior Entreprises',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE),
			},
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		}),

	];
}

