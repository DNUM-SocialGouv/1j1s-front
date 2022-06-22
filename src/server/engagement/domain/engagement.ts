
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


export const domaineList: Array<MissionEngagement.Domaine>  = [
  {
    libellé: 'Environnement',
    valeur: 'environnement',
  },
  {
    libellé: 'Solidarité insertion',
    valeur: 'solidarite-insertion',
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
    libellé: 'Culture Loisirs',
    valeur: 'culture-loisirs',
  },
  {
    libellé: 'Éducation',
    valeur: 'education',
  },
  {
    libellé: 'Emploi',
    valeur: 'emploi',
  },
  {
    libellé: 'Sport',
    valeur: 'sport',
  },
  {
    libellé: 'Humanitaire',
    valeur: 'humanitaire',
  },
  {
    libellé: 'Animaux',
    valeur: 'animaux',
  },
  {
    libellé: 'Vivre ensemble',
    valeur: 'vivre-ensemble',
  },
  {
    libellé: 'Mémoire et citoyenneté',
    valeur: 'mémoire et citoyenneté',
  },
  {
    libellé: 'Autre',
    valeur: 'autre',
  },
];
