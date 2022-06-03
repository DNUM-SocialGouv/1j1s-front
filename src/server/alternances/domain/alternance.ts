export type AlternanceId = string;

export type IdeaType = 'peJob' | 'matcha'

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
