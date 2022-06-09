export type AlternanceId = string;

export type IdeaType = 'peJob' | 'matcha'

export function isAlternanceFromPoleEmploi(alternance: RésultatRechercheAlternance): alternance is AlternanceFromPoleEmploi {
  return alternance.ideaType === 'peJob';
}

export function isAlternanceFromMatcha(alternance: RésultatRechercheAlternance): alternance is AlternanceFromMatcha {
  return alternance.ideaType ===  'matcha';
}

export type RésultatRechercheAlternance = AlternanceFromPoleEmploi | AlternanceFromMatcha

export interface Alternance {
  id: AlternanceId;
  ideaType: IdeaType;
  intitulé: string;
  description?: string;
  entreprise: Alternance.Entreprise;
  niveauRequis?: string
  ville?: string
  typeDeContrats?: string[]
  étiquetteList: string[]
  adresse: string
}

export interface AlternanceFromPoleEmploi extends Alternance {
  url?: string
  contact: AlternanceFromPoleEmploi.Contact
  duréeContrat: string
}

export namespace AlternanceFromPoleEmploi {
  export interface Contact {
    info?: string
    téléphone?: string
  }
}
export interface AlternanceFromMatcha extends Alternance {
  débutContrat: string
  rythmeAlternance: string
  competencesDeBase: string[]
  duréeContrat: number
  contact: AlternanceFromMatcha.Contact
}

export namespace AlternanceFromMatcha {
  export interface Contact {
    nom?: string
    téléphone?: string
  }
}

export namespace Alternance {
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
  résultats: Alternance[]
}
