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

export namespace AnnonceDeLogementResponse {
  export interface Localisation {
    ville?: string
    adresse?: string
    département?: string
    codePostal?: number // TODO voir si doit être string si lettre dans code postal
    région?: string
    pays?: string
  }
}

export interface AnnonceDeLogementResponse {
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
  sourceUpdatedAt: Date
  sourceCreatedAt: Date
  devise: string
  description: string
  localisation: AnnonceDeLogementResponse.Localisation
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
}

export interface AnnonceDeLogement {
  titre: string
  type: string
  typeBien: string
  dateDeMiseAJour: string
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
  description: string
}
