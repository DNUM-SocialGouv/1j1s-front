export interface OffreResponse {
  id: string
  intitule: string
  description?: string
  formations?: OffreResponse.Formation[]
  competences?: OffreResponse.Compétence[]
  qualitesProfessionnelles?: OffreResponse.QualitéeProfessionnelle[]
  lieuTravail?: OffreResponse.LieuTravail
  entreprise?: OffreResponse.Entreprise
  salaire?: OffreResponse.Salaire
  typeContrat: OffreResponse.TypeContrat
  experienceExige?: OffreResponse.Expérience
  dureeTravailLibelleConverti?: OffreResponse.DuréeTravail
  origineOffre: OffreResponse.OrigineOffre
}

export namespace OffreResponse {
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

  export interface Salaire {
    libelle?: string
    commentaire?: string
  }

  export interface Formation {
    niveauLibelle?: string
    commentaire?: string
  }

  export interface QualitéeProfessionnelle {
    libelle?: string
  }

  export interface Compétence {
    libelle?: string
  }

  export interface OrigineOffre {
    urlOrigine: string
  }
}

export interface RésultatsRechercheOffreResponse {
  resultats: OffreResponse[]
  filtresPossibles?: RésultatsRechercheOffreResponse.FiltresPossibles[]
}

export namespace RésultatsRechercheOffreResponse {
  export interface FiltresPossibles {
    agregation: FiltresPossiblesResponse.Agrégation[]
  }

  export namespace FiltresPossiblesResponse {
    export interface Agrégation {
      nbResultats: number
    }
  }
}
