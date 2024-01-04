import { BaseHit } from 'instantsearch.js/es/types/results';

export interface AnnonceDeLogementIndexee extends BaseHit {
	titre: string
	slug: string
	dateDeDisponibilite: string
	prix: number
	prixHT?: number
	surfaceAAfficher: string
	type: string
	typeBien: string
	url: string
	dateDeMiseAJour: string
	localisationAAfficher: string
	devise: string
	imagesUrl: Array<string>
}
