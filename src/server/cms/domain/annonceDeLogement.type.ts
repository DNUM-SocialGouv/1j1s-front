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

  export enum ServiceOptionnel {
    ASPIRATEUR = 'aspirateur',
    FER_A_REPASSER = 'fer à repasser',
    INTERNET = 'internet',
    LOCAL_A_VELO = 'local à vélo',
    MACHINE_A_LAVER = 'machine à laver',
    MICRO_ONDE = 'micro-onde',
    NECESSAIRE_DE_NETTOYAGE = 'nécessaire de nettoyage',
    SALLE_DE_SPORT = 'salle de sport',
    TV = 'télévision',
    NON_RENSEIGNE = 'non renseigné',
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
