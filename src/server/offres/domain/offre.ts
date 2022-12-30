import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export type OffreId = string;

export interface Offre {
  id: OffreId
  intitulé: string
  description?: string
  formationList: Offre.Formation[]
  compétenceList: string[]
  qualitéeProfessionnelleList: string[]
  lieuTravail?: string
  salaire?: string
  entreprise: Offre.Entreprise
  typeContrat?: Offre.TypeDeContrat
  expérience?: Offre.Expérience
  duréeTravail?: Offre.DuréeTravail
  urlOffreOrigine: string
  étiquetteList: string[]
}

export namespace Offre {
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

  type Contrat = 'CDD' | 'CDI' | 'SAI' | 'MIS'

  export interface TypeDeContrat {
    libelléCourt: string
    libelléLong: string
    valeur: Contrat
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
  	Offre.CONTRAT_CDD,
  	Offre.CONTRAT_CDI,
  	Offre.CONTRAT_INTÉRIMAIRE,
  	Offre.CONTRAT_SAISONNIER,
  ];


  type Temps = 'tempsPlein' | 'tempsPartiel' | 'indifférent'

  export interface TempsDeTravail {
    libellé: string
    valeur: Temps
  }

  export const TEMPS_PLEIN : TempsDeTravail =  {
  	libellé: 'Temps plein',
  	valeur: 'tempsPlein',
  };

  export const TEMPS_PARTIEL : TempsDeTravail =  {
  	libellé: 'Temps partiel',
  	valeur: 'tempsPartiel',
  };

  export const TEMPS_INDIFFERENT : TempsDeTravail =  {
  	libellé: 'Indifférent',
  	valeur: 'indifférent',
  };

  export const TEMPS_DE_TRAVAIL_LIST: TempsDeTravail[] = [
  	Offre.TEMPS_PLEIN,
  	Offre.TEMPS_PARTIEL,
  	Offre.TEMPS_INDIFFERENT,
  ];

  type expérience = 'D' | 'S' | 'E'

  export interface ExpérienceAttendu {
    libellé: string
    valeur: expérience
  }

  export const EXPÉRIENCE_DEBUTANT: ExpérienceAttendu = {
  	libellé: 'Moins de 1 an',
  	valeur: 'D',
  };

  export const EXPÉRIENCE_EXIGÉE: ExpérienceAttendu = {
  	libellé: 'Plus de 3 ans',
  	valeur: 'E',
  };

  export const EXPÉRIENCE_SOUHAITÉ: ExpérienceAttendu = {
  	libellé: 'De 1 à 3 ans',
  	valeur: 'S',
  };

  export const EXPÉRIENCE: ExpérienceAttendu[] = [
  	Offre.EXPÉRIENCE_DEBUTANT,
  	Offre.EXPÉRIENCE_SOUHAITÉ,
  	Offre.EXPÉRIENCE_EXIGÉE,
  ];

  export interface CheckboxFiltre {
    libellé: string
    valeur: string
  }
}

export interface RésultatsRechercheOffre {
  nombreRésultats: number
  résultats: Offre[]
}

export interface OffreFiltre {
  page: number
  motClé?: string
  localisation?: OffreEmploiFiltreLocalisation
}

export interface OffreEmploiFiltreLocalisation {
  type: TypeLocalisation
  code: string
}

export enum DomaineCode {
  M = 'M',
  B = 'B',
  C = 'C',
  F = 'F',
  D = 'D',
  E = 'E',
  M14 = 'M14',
  M13 = 'M13',
  A = 'A',
  G = 'G',
  C15 = 'C15',
  H = 'H',
  M18 = 'M18',
  I = 'I',
  M17 = 'M17',
  M15 = 'M15',
  J = 'J',
  M16 = 'M16',
  K = 'K',
  L = 'L',
  L14 = 'L14',
  N = 'N'
}

export interface RéférentielDomaine {
  code: DomaineCode
  libelle: string
}

export const NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE = 15;
const MAX_RESULT_ALLOWED = 1000;
export const MAX_PAGE_ALLOWED = Math.floor(MAX_RESULT_ALLOWED / NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE);

export function isOffreÉchantillonFiltre(offreFiltre: OffreFiltre) {
	const { page, ...rest } = offreFiltre;
	const emploiFiltreSanitized = Object.values(rest);
	return page === 1 && emploiFiltreSanitized.every((value) => value === undefined);
}
