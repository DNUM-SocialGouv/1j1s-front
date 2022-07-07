export type MissionId = string;

export interface MissionEngagementFiltre {
  publisher: string
  domain: string
  distance?: string
  lat?: number
  lon?: number
  from: number
  size: number
}

export interface Mission {
  id: MissionId
  description: string
  titre: string
  nomEntreprise?: string
  étiquetteList: Array<string>
  logo?: string
  url?: string
  localisation?: string
  débutContrat?: string
  duréeContrat?: number
  openToMinors?: string
}

export interface RésultatsRechercheMission {
  nombreRésultats: number
  résultats: Array<Mission>
}

export namespace MissionEngagement {
  export interface Domaine {
    libellé: string
    valeur: string
  }
}

export const bénévolatDomaineList: Array<MissionEngagement.Domaine> = [
  {
    libellé: 'Culture et loisirs',
    valeur: 'culture-loisirs',
  },
  {
    libellé: 'Éducation',
    valeur: 'education',
  },
  {
    libellé: 'Environnement',
    valeur: 'environnement',
  },
  {
    libellé: 'Mémoire et citoyenneté',
    valeur: 'mémoire et citoyenneté',
  },
  {
    libellé: 'Prévention et protection',
    valeur: 'prevention-protection',
  },
  {
    libellé: 'Santé',
    valeur: 'sante',
  },
  {
    libellé: 'Solidarité et insertion',
    valeur: 'solidarite-insertion',
  },
  {
    libellé: 'Sport',
    valeur: 'sport',
  },
  {
    libellé: 'Vivre ensemble',
    valeur: 'vivre-ensemble',
  },
  {
    libellé: 'Autre',
    valeur: 'autre',
  },
];

export const serviceCiviqueDomaineList: Array<MissionEngagement.Domaine>  = [
  {
    libellé: 'Culture et Loisirs',
    valeur: 'culture-loisirs',
  },
  {
    libellé: 'Éducation',
    valeur: 'education',
  },
  {
    libellé: 'Environnement',
    valeur: 'environnement',
  },
  {
    libellé: 'Humanitaire',
    valeur: 'humanitaire',
  },
  {
    libellé: 'Santé',
    valeur: 'sante',
  },
  {
    libellé: 'Solidarité et insertion',
    valeur: 'solidarite-insertion',
  },
  {
    libellé: 'Sport',
    valeur: 'sport',
  },
  {
    libellé: 'Vivre ensemble',
    valeur: 'vivre-ensemble',
  },
  {
    libellé: 'Autre',
    valeur: 'autre',
  },
];
