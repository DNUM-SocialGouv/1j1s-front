import {
	AnnonceDeLogementBilanEnergetique,
	AnnonceDeLogementLocalisation,
	AnnonceDeLogementService,
	AnnonceDeLogementSource,
} from '~/server/logements/domain/annonceDeLogement';

export interface StrapiAnnonceDeLogement {
	titre: string
	slug: string
	dateDeDisponibilite: string
	nombreDePieces: number
	surface: number
	surfaceMax?: number
	etage?: number
	prix: number
	prixHT?: number
	charge?: number
	garantie?: number
	type: string
	typeBien: string
	meuble: boolean
	url: string
	sourceUpdatedAt: Date
	sourceCreatedAt: Date
	devise: string
	description: string
	localisation: AnnonceDeLogementLocalisation
	bilanEnergetique: AnnonceDeLogementBilanEnergetique
	imagesUrl?: Array<{ value: string }>
	source: AnnonceDeLogementSource
	servicesInclus: Array<{ nom: AnnonceDeLogementService }>
	servicesOptionnels: Array<{ nom: AnnonceDeLogementService }>
}
