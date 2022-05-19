import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export type OffreEmploiId = string;

export interface OffreEmploi {
  id: OffreEmploiId
  intitulé: string
  description?: string
  formations?: OffreEmploi.Formation[]
  compétences?: OffreEmploi.Compétence[]
  qualitéesProfessionnelle?: OffreEmploi.QualitéeProfessionnelle[]
  lieuTravail?: string
  salaire?: string
  entreprise: OffreEmploi.Entreprise
  typeContrat?: OffreEmploi.TypeDeContrat
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

  export interface Entreprise {
    nom?: string
    logo?: string
  }
  
  export interface Formation {
    libellé?: string
    commentaire?: string
  }
  
  export interface Compétence {
    niveau?: string
    commentaire?: string
  }

  export interface QualitéeProfessionnelle {
    libelle?: string
  }

  export interface TypeDeContrat {
    libelléCourt?: string
    libelléLong: string
    valeur: string
  }

  export const CONTRAT_CDD: TypeDeContrat = {
    libelléCourt: 'CDD',
    libelléLong: 'Contrat à durée déterminé',
    valeur: 'CDD',
  };

  export const CONTRAT_CDI: TypeDeContrat = {
    libelléCourt: 'CDI',
    libelléLong: 'Contrat à durée indéterminé',
    valeur: 'CDI',
  };

  export const CONTRAT_INTÉRIMAIRE: TypeDeContrat = {
    libelléCourt: 'Intérim',
    libelléLong: 'Mission intérimaire',
    valeur: 'MIS',
  };

  export const CONTRAT_SAISONNIER: TypeDeContrat = {
    libelléCourt: 'Saisonnier',
    libelléLong: 'Contrat travail saisonnier',
    valeur: 'SAI',
  };

  export const TYPE_DE_CONTRAT_LIST: TypeDeContrat[] = [
    OffreEmploi.CONTRAT_CDD,
    OffreEmploi.CONTRAT_CDI,
    OffreEmploi.CONTRAT_INTÉRIMAIRE,
    OffreEmploi.CONTRAT_SAISONNIER,
  ];
}

export interface RésultatsRechercheOffreEmploi {
  nombreRésultats: number
  résultats: OffreEmploi[]
}

export interface OffreEmploiFiltre {
  motClé?: string
  typeDeContrats: string[]
  page: number
  localisation?: OffreEmploiFiltreLocalisation
}

export interface OffreEmploiFiltreLocalisation {
  typeLocalisation: TypeLocalisation
  codeInsee: string
}

export const NOMBRE_RÉSULTATS_PAR_PAGE = 30;
