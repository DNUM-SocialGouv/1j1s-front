import { AnnonceDeLogement } from '~/server/logements/domain/annonceDeLogement';

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
	localisation: AnnonceDeLogement.Localisation
	bilanEnergetique: AnnonceDeLogement.BilanEnergetique
	imagesUrl?: Array<{ value: string }>
	source: AnnonceDeLogement.Source
	servicesInclus: Array<{ nom: AnnonceDeLogement.Service }>
	servicesOptionnels: Array<{ nom: AnnonceDeLogement.Service }>
}
