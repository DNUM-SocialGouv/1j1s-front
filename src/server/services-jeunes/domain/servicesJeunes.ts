import { Image } from '~/server/cms/domain/image';

export interface ServiceJeune {
	titre: string
	categorie?: ServiceJeune.Categorie
	banniere?: Image
	concerne: string
	link?: string
}

export namespace ServiceJeune {
	export enum CodeCategorie {
		ACCOMPAGNEMENT = 'accompagnement',
		AIDES_FINANCIERES = 'aidesFinancieres',
		ENGAGEMENT = 'engagement',
		ENTREE_VIE_PROFESSIONELLE = 'vieProfessionnelle',
		LOGEMENT = 'logement',
		ORIENTATION_FORMATION = 'orienterFormer',
	}

	export interface Categorie {
		code: 'accompagnement'
			| 'aidesFinancieres'
			| 'engagement'
			| 'vieProfessionnelle'
			| 'logement'
			| 'orienterFormer'
		libelle: string
	}
}

export function mapCodeCategorieServiceJeuneToLibelle(code: ServiceJeune.CodeCategorie): string {
	switch(code) {
		case ServiceJeune.CodeCategorie.ACCOMPAGNEMENT : return 'Accompagnement';
		case ServiceJeune.CodeCategorie.AIDES_FINANCIERES : return 'Aides financières';
		case ServiceJeune.CodeCategorie.ORIENTATION_FORMATION : return 'Orientation et formation';
		case ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE : return 'Entrée dans la vie professionnelle';
		case ServiceJeune.CodeCategorie.LOGEMENT : return 'Logement';
		case ServiceJeune.CodeCategorie.ENGAGEMENT : return 'Engagement';
	}
}
