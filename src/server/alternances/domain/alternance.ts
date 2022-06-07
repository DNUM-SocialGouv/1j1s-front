export type AlternanceId = string;

export type IdeaType = 'peJob' | 'matcha'

export function isAlternancePeJob(alternance: Alternance): alternance is AlternancePeJob {
  return alternance.ideaType === 'peJob';
}

export function isAlternanceMatcha(alternance: Alternance): alternance is AlternanceMatcha {
  return alternance.ideaType ===  'matcha';
}

export type Alternance = AlternancePeJob | AlternanceMatcha

export interface AlternanceBase {
  id: AlternanceId;
  ideaType: IdeaType;
  intitulé: string;
  description?: string;
  entreprise: AlternanceBase.Entreprise;
  niveauRequis?: string
  ville?: string
  typeDeContrats?: string[]
  étiquetteList: string[]
  adresse: string
}

export interface AlternancePeJob extends AlternanceBase {
  url?: string
  contact: AlternancePeJob.Contact
  duréeContrat: string
}

export namespace AlternancePeJob {
  export interface Contact {
    info?: string
    téléphone?: string
  }
}
export interface AlternanceMatcha extends AlternanceBase {
  débutContrat: string
  rythmeAlternance: string
  competencesDeBase: string[]
  duréeContrat: number
  contact: AlternanceMatcha.Contact
}

export namespace AlternanceMatcha {
  export interface Contact {
    nom?: string
    téléphone?: string
  }
}

export namespace AlternanceBase {
  export interface Entreprise {
    nom: string
    logo?: string
  }
}

export interface AlternanceFiltre {
  codeRomeList: string[]
}

export interface RésultatsRechercheAlternance {
  nombreRésultats: number
  résultats: AlternanceBase[]
}
