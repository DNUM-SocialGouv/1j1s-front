import { CategorieEnergetique } from '~/server/logements/domain/annonceDeLogement';

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
	localisation: Localisation
	bilanEnergetique: BilanEnergetique
	imagesUrl?: Array<{ value: string }>
	source: Source
	servicesInclus: Array<{ nom: Service }>
	servicesOptionnels: Array<{ nom: Service }>
}

export interface Localisation {
	ville?: string
	adresse?: string
	département?: string
	codePostal?: string
	région?: string
	pays?: string
}

export interface BilanEnergetique {
	consommationEnergetique?: CategorieEnergetique,
	emissionDeGaz?: CategorieEnergetique
}

export enum Service {
	ASCENSEUR = 'ascenseur',
	ASPIRATEUR = 'aspirateur',
	CAVE = 'cave',
	FER_A_REPASSER = 'fer à repasser',
	FIBRE_OPTIQUE = 'fibre optique',
	FOUR = 'four',
	GARAGE = 'garage',
	GARDIEN_RESIDENCE = 'gardien résidentiel',
	INTERNET = 'internet',
	LAVE_LINGE = 'machine à laver',
	LAVE_VAISSELLE = 'lave vaisselle',
	LOCAL_A_VELO = 'local à vélo',
	MICRO_ONDE = 'micro-onde',
	NECESSAIRE_DE_NETTOYAGE = 'nécessaire de nettoyage',
	PARKING = 'parking',
	PISCINE = 'piscine',
	REFRIGERATEUR = 'réfrigérateur',
	SALLE_DE_BAIN_PRIVATIVE = 'salle de bain privative',
	SALLE_DE_SPORT = 'salle de sport',
	SECHE_LINGE = 'sèche linge',
	TERRACE = 'terrace',
	TV = 'télévision',
	NON_RENSEIGNE = 'non renseigné',
}

export type Source = 'immojeune' | 'studapart'
