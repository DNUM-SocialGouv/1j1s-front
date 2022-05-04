export type OffreEmploiId = string;

export interface OffreEmploi {
  id: OffreEmploiId
  intitulé: string
  description?: string
  lieuTravail?: string
  entreprise: OffreEmploi.Entreprise
  typeContrat: OffreEmploi.TypeContrat
  expérience?: OffreEmploi.Expérience
  duréeTravail?: OffreEmploi.DuréeTravail
  urlOffreOrigine: string
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
  nombreRésultats: number
  résultats: OffreEmploi[]
}

export interface OffreEmploiFiltre {
  motClé?: string
  typeDeContrats: string[]
  page: number
}

export const NOMBRE_RÉSULTATS_PAR_PAGE = 30;

export const TYPE_DE_CONTRAT_LIST = [
  { label: 'Contrat à durée déterminé', value: 'CDD' },
  { label: 'Contrat à durée indéterminé', value: 'CDI' },
  { label: 'Mission intérimaire', value: 'MIS' },
  { label: 'Contrat travail saisonnier', value: 'SAI' },
];
