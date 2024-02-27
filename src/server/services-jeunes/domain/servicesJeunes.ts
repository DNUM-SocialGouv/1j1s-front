import { Image } from '~/server/cms/domain/image';

export interface ServiceJeune {
	titre: string
	categorie?: string
	contenu: string //todo à supprimer aussi ?
	banniere?: Image
	concerne: string
	link: string
}

export namespace ServiceJeune {
	export enum Categorie {
		ACCOMPAGNEMENT = 'Accompagnement',
		AIDES_FINANCIERES = 'Aides financières',
		ORIENTATION_FORMATION = 'Orientation et formation',
		ENTREE_VIE_PROFESSIONELLE = 'Entrée dans la vie professionnelle',
	}
}
