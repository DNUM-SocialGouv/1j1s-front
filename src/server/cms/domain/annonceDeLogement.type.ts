import { Image } from '~/client/components/props';

export interface AnnonceDeLogementIndexee {
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

export namespace AnnonceDeLogementResponse {
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

  export enum ServiceInclus {
    BIKE_STORAGE = 'bikeStorage',
    CLEANING_TOOLS = 'cleaningTools',
    FITNESS_ROOM = 'fitnessRoom',
    INTERNET = 'internet',
    IRON = 'iron',
    MICROWAVE = 'microwave',
    PARKING = 'parking',
    PRIVATE_BATHROOM = 'privateBathroom',
    TV = 'tv',
    VACUUM = 'vacuum',
    WASHING_MACHINE = 'washingMachine',
  }

  export enum ServiceOptionnel {
    BIKE_STORAGE = 'bikeStorage',
    CLEANING_TOOLS = 'cleaningTools',
    FITNESS_ROOM = 'fitnessRoom',
    DEFAULT = 'default',
    INTERNET = 'internet',
    IRON = 'iron',
    MICROWAVE = 'microwave',
    TV = 'tv',
    VACUUM = 'vacuum',
    WASHING_MACHINE = 'washingMachine',
  }

  export type Source = 'immojeune' | 'studapart'
}

export interface AnnonceDeLogementResponse {
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
  localisation: AnnonceDeLogementResponse.Localisation
  bilanEnergetique: AnnonceDeLogementResponse.BilanEnergetique
  imagesUrl?: Array<{ value: string }>
  source: AnnonceDeLogementResponse.Source
  servicesInclus: Array<AnnonceDeLogementResponse.ServiceInclus>
  servicesOptionnels: Array<AnnonceDeLogementResponse.ServiceOptionnel>
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

  export interface BilanEnergetique {
    consommationEnergetique?: CategorieEnergetique,
    emissionDeGaz?: CategorieEnergetique
  }

  export enum ServiceInclus {
    BIKE_STORAGE = 'bikeStorage',
    CLEANING_TOOLS = 'cleaningTools',
    FITNESS_ROOM = 'fitnessRoom',
    INTERNET = 'internet',
    IRON = 'iron',
    MICROWAVE = 'microwave',
    PARKING = 'parking',
    PRIVATE_BATHROOM = 'privateBathroom',
    TV = 'tv',
    VACUUM = 'vacuum',
    WASHING_MACHINE = 'washingMachine',
  }

  export enum ServiceOptionnel {
    BIKE_STORAGE = 'bikeStorage',
    CLEANING_TOOLS = 'cleaningTools',
    FITNESS_ROOM = 'fitnessRoom',
    DEFAULT = 'default',
    INTERNET = 'internet',
    IRON = 'iron',
    MICROWAVE = 'microwave',
    TV = 'tv',
    VACUUM = 'vacuum',
    WASHING_MACHINE = 'washingMachine',
  }

  export type Source = 'immojeune' | 'studapart'
}

export type CategorieEnergetique = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

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
  imageUrlList: Array<Image>
  servicesInclus: Array<AnnonceDeLogement.ServiceInclus>
  servicesOptionnels: Array<AnnonceDeLogement.ServiceOptionnel>
  source: AnnonceDeLogement.Source
  urlDeCandidature: string
  bilanEnergetique: AnnonceDeLogement.BilanEnergetique
}
