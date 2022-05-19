export interface OffreEmploiResponse {
  id: string
  intitule: string
  description?: string
  formations?: OffreEmploiResponse.Formation[]
  competences?: OffreEmploiResponse.Compétence[]
  qualitesProfessionnelles?: OffreEmploiResponse.QualitéeProfessionnelle[]
  lieuTravail?: OffreEmploiResponse.LieuTravail
  entreprise?: OffreEmploiResponse.Entreprise
  salaire?: OffreEmploiResponse.Salaire
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

  export interface Salaire {
    libelle?: string
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

export interface RésultatsRechercheOffreEmploiResponse {
  resultats: OffreEmploiResponse[]
  filtresPossibles?: RésultatsRechercheOffreEmploiResponse.FiltresPossibles[]
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
