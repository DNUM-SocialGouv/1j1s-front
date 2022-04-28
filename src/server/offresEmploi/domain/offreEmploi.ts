export interface OffreEmploi {
  id: string
  intitulé: string
  description?: string
  lieuTravail?: string
  entreprise?: OffreEmploi.Entreprise
  typeContrat: OffreEmploi.TypeContrat
  expérience: OffreEmploi.Expérience
  duréeTravail: OffreEmploi.DuréeTravail
}

export namespace OffreEmploi {
  export enum Expérience {
    DEBUTANT_ACCEPTE = 'Débutant accepté',
    EXPERIENCE_SOUHAITEE = 'Expérience souhaitée',
    EXPERIENCE_EXIGEE = 'Expérience exigée',
  }

  export enum DuréeTravail {
    TEMPS_PLEIN = 'Temps plein',
    TEMPS_PARTIEL = 'Temps partiel',
  }

  export enum TypeContrat {
    CDI = 'CDI',
    CDD = 'CDD',
    MIS = 'Intérim',
    SAI = 'Saisonnier',
  }

  export interface Entreprise {
    nom?: string
    logo?: string
  }
}

export interface RésultatsRechercheOffreEmploi {
  résultats: OffreEmploi[]
  nbRésultats: number
}

export interface OffreEmploiFiltre {
  motClé?: string
  page: number
}

export const NOMBRE_RÉSULTATS_PAR_PAGE = 40;
