export interface AnnonceDeLogementIndexee  {
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
export namespace AnnonceDeLogementAttributesFromCMS {
  export interface Localisation {
    ville?: string
    adresse?: string
    département?: string
    codePostal?: number // TODO voir si doit être string si lettre dans code postal
    région?: string
    pays?: string
  }
}

export interface AnnonceDeLogementAttributesFromCMS {
  titre: string
  slug: string
  dateDeDisponibilite: string
  nombresDePieces: number
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
  dateDeMiseAJour: string
  devise: string
  description: string
  localisation: AnnonceDeLogementAttributesFromCMS.Localisation
}

export type AnnonceDeLogementDataFromCMS = {
  id: number
  attributes: AnnonceDeLogementAttributesFromCMS
}

export type AnnonceDeLogementResponse = {
  data: AnnonceDeLogementDataFromCMS
}

export namespace AnnonceDeLogement {
  export interface Localisation {
    ville?: string
    adresse?: string
    département?: string
    codePostal?: number // TODO voir si doit être string si lettre dans code postal
    région?: string
    pays?: string
  }

  export interface EnTête {
    titre: string
    type: string
    typeBien: string
    dateDeMiseAJour: string
  }

  export interface InformationsGénérales {
    surface: number
    surfaceMax?: number
    nombresDePièces: number
    étage?: number
    prix: number
    prixHT?: number
    charge?: number
    garantie?: number
    dateDeDisponibilité: string
    meublé: boolean
    localisation: AnnonceDeLogement.Localisation
  }
}


export interface AnnonceDeLogement {
  enTête: AnnonceDeLogement.EnTête
  informationsGénérales: AnnonceDeLogement.InformationsGénérales
  description: string
}
