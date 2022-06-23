
export interface MissionEngagementFiltre {
  publisher: string
  domain: string
  from: number
  size: number
}

export interface Mission {
  id: string
  description: string
  titre: string
  nomEntreprise?: string
  étiquetteList: Array<string>
  logo?: string
  débutContrat?: string
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
    libellé: 'Culture Loisirs',
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
    libellé: 'Prévention protection',
    valeur: 'prevention-protection',
  },
  {
    libellé: 'Santé',
    valeur: 'sante',
  },
  {
    libellé: 'Solidarité insertion',
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
    libellé: 'Culture Loisirs',
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
    libellé: 'Solidarité insertion',
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
