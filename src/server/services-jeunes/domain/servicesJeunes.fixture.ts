import { anImage } from '~/server/cms/domain/image.fixture';
import { mapCodeCategorieServiceJeuneToLibelle, ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';

export function aServiceJeune(override?: Partial<ServiceJeune>): ServiceJeune {
	return {
		banniere: anImage(),
		categorie: {
			code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
			libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
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
				code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
			},
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
			},
			titre: 'Les Junior Entreprises',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
			},			titre: 'Une formation en centre EPIDE',
		}),
	];
}

export function anUnorderedAndNotFilterServiceJeuneList(): Array<ServiceJeune> {
	return [
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
			},			concerne: 'pour les 12 à 18mois',
			titre: 'Une formation en centre EPIDE',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
			},
			titre: 'Des aides pour financer son permis de conduire',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.ENGAGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT),
			},
			titre: 'Le Service Militaire Volontaire',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.LOGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT),
			},
			titre: 'Un Logement',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
			},
			titre: 'Les Junior Entreprises',
		}),
		aServiceJeune({
			categorie: {
				code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
			},
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		}),

	];
}

