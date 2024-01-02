import { Image } from '~/client/components/props';
import { BilanEnergetique, Service, Source } from '~/server/logements/infra/strapiAnnonceDeLogement';

export interface AnnonceDeLogement {
	titre: string
	type: string
	typeBien: string
	dateDeMiseAJour: string
	surface: number
	surfaceMax?: number
	nombreDePièces: number
	étage?: number
	prix: number
	prixHT?: number
	charge?: number
	garantie?: number
	dateDeDisponibilité: string
	meublé: boolean
	localisation: AnnonceDeLogement.Localisation
	description: string
	devise: string
	imageList: Array<Image>
	servicesInclus: Array<Service>
	servicesOptionnels: Array<Service>
	source: Source
	urlDeCandidature: string
	bilanEnergetique: BilanEnergetique
}

export namespace AnnonceDeLogement {
	export interface Localisation {
		ville?: string
		adresse?: string
		département?: string
		codePostal?: string
		région?: string
		pays?: string
	}
}

export type CategorieEnergetique = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
