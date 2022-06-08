import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

export type OffreEmploiId = string;

export interface OffreEmploi {
  id: OffreEmploiId
  intitulé: string
  description?: string
  formationList: OffreEmploi.Formation[]
  compétenceList: string[]
  qualitéeProfessionnelleList: string[]
  lieuTravail?: string
  salaire?: string
  entreprise: OffreEmploi.Entreprise
  typeContrat?: OffreEmploi.TypeDeContrat
  expérience?: OffreEmploi.Expérience
  duréeTravail?: OffreEmploi.DuréeTravail
  urlOffreOrigine: string
  étiquetteList: string[]
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
    OffreEmploi.CONTRAT_CDD,
    OffreEmploi.CONTRAT_CDI,
    OffreEmploi.CONTRAT_INTÉRIMAIRE,
    OffreEmploi.CONTRAT_SAISONNIER,
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
    OffreEmploi.TEMPS_PLEIN,
    OffreEmploi.TEMPS_PARTIEL,
    OffreEmploi.TEMPS_INDIFFERENT,
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
    OffreEmploi.EXPÉRIENCE_DEBUTANT,
    OffreEmploi.EXPÉRIENCE_SOUHAITÉ,
    OffreEmploi.EXPÉRIENCE_EXIGÉE,
  ];

  export interface CheckboxFiltre {
    libellé: string
    valeur: string
  }
}

export interface RésultatsRechercheOffreEmploi {
  nombreRésultats: number
  résultats: OffreEmploi[]
}

export interface OffreEmploiFiltre {
  motClé?: string
  typeDeContratList: string[]
  page: number
  localisation?: OffreEmploiFiltreLocalisation
  tempsDeTravail?: string
  grandDomaineList: string[]
  experienceExigenceList: string[]
  dureeContratMax: string
}

export interface OffreEmploiFiltreLocalisation {
  typeLocalisation: TypeLocalisation
  codeInsee: CodeInsee
}

export const NOMBRE_RÉSULTATS_PAR_PAGE = 30;

export interface RéférentielDomaine {
  code: string
  libelle: string
}

export const référentielDomaineList: RéférentielDomaine[] = [
  {
    code: 'M',
    libelle: 'Achats / Comptabilité / Gestion',
  },
  {
    code: 'B',
    libelle: 'Arts / Artisanat d\'art',
  },
  {
    code: 'C',
    libelle: 'Banque / Assurance',
  },
  {
    code: 'F',
    libelle: 'Bâtiment / Travaux Publics',
  },
  {
    code: 'D',
    libelle: 'Commerce / Vente',
  },
  {
    code: 'E',
    libelle: 'Communication / Multimédia',
  },
  {
    code: 'M14',
    libelle: 'Conseil / Etudes',
  },
  {
    code: 'M13',
    libelle: 'Direction d\'entreprise',
  },
  {
    code: 'A',
    libelle: 'Espaces verts et naturels / Agriculture / Pêche / Soins aux animaux',
  },
  {
    code: 'G',
    libelle: 'Hôtellerie - Restauration / Tourisme / Animation',
  },
  {
    code: 'C15',
    libelle: 'Immobilier',
  },
  {
    code: 'H',
    libelle: 'Industrie',
  },
  {
    code: 'M18',
    libelle: 'Informatique / Télécommunication',
  },
  {
    code: 'I',
    libelle: 'Installation / Maintenance',
  },
  {
    code: 'M17',
    libelle: 'Marketing / Stratégie commerciale',
  },
  {
    code: 'M15',
    libelle: 'Ressources Humaines',
  },
  {
    code: 'J',
    libelle: 'Santé',
  },
  {
    code: 'M16',
    libelle: 'Secrétariat / Assistanat',
  },
  {
    code: 'K',
    libelle: 'Services à la personne / à la collectivité',
  },
  {
    code: 'L',
    libelle: 'Spectacle',
  },
  {
    code: 'L14',
    libelle: 'Sport',
  },
  {
    code: 'N',
    libelle: 'Transport / Logistique',
  },
];
