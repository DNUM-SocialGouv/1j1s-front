import { Image } from '~/server/cms/domain/image';

export interface ServiceJeune {
	titre: string
	categorie: ServiceJeuneCategorie
	banniere?: Image
	concerne: string
	link?: string
}

export enum ServiceJeuneCodeCategorie {
	ACCOMPAGNEMENT = 'accompagnement',
	AIDES_FINANCIERES = 'aidesFinancieres',
	ENGAGEMENT = 'engagement',
	ENTREE_VIE_PROFESSIONELLE = 'vieProfessionnelle',
	LOGEMENT = 'logement',
	ORIENTATION_FORMATION = 'orienterFormer',
}

export interface ServiceJeuneCategorie {
	code: ServiceJeuneCodeCategorie
	libelle: string
}

export function mapCodeCategorieServiceJeuneToLibelle(code: ServiceJeuneCodeCategorie): string {
	switch(code) {
		case ServiceJeuneCodeCategorie.ACCOMPAGNEMENT : return 'Accompagnement';
		case ServiceJeuneCodeCategorie.AIDES_FINANCIERES : return 'Aides financières';
		case ServiceJeuneCodeCategorie.ORIENTATION_FORMATION : return 'Orientation et formation';
		case ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE : return 'Entrée dans la vie professionnelle';
		case ServiceJeuneCodeCategorie.LOGEMENT : return 'Logement';
		case ServiceJeuneCodeCategorie.ENGAGEMENT : return 'Engagement';
	}
}
