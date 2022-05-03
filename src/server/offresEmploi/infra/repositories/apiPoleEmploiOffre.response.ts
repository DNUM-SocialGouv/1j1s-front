export interface OffreEmploiResponse {
  id: string
  intitule: string
  description?: string
  lieuTravail?: OffreEmploiResponse.LieuTravail
  entreprise?: OffreEmploiResponse.Entreprise
  typeContrat: OffreEmploiResponse.TypeContrat
  experienceExige?: OffreEmploiResponse.Expérience
  dureeTravailLibelleConverti?: OffreEmploiResponse.DuréeTravail
  origineOffre: OffreEmploiResponse.OrigineOffre
}

export namespace OffreEmploiResponse {
  export type Expérience = 'D' | 'S' | 'E';

  export type DuréeTravail = 'Temps plein' | 'Temps partiel';

  export type TypeContrat = 'CDI' | 'CDD' | 'MIS' | 'SAI'

  export interface LieuTravail {
    libelle: string
  }

  export interface Entreprise {
    nom?: string
    logo?: string
  }

  export interface OrigineOffre {
    urlOrigine: string
  }
}

export interface RésultatsRechercheOffreEmploiResponse {
  resultats: OffreEmploiResponse[]
  filtresPossibles: RésultatsRechercheOffreEmploiResponse.FiltresPossibles[]
}

export namespace RésultatsRechercheOffreEmploiResponse {
  export interface FiltresPossibles {
    agregation: FiltresPossiblesResponse.Agrégation[]
  }

  export namespace FiltresPossiblesResponse {
    export interface Agrégation {
      nbResultats: number
    }
  }
}
