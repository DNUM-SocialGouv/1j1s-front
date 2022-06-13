export type AlternanceId = string;

export type From = 'peJob' | 'matcha'

export interface Alternance {
  id: AlternanceId;
  from: From;
  intitulé: string;
  description?: string;
  entreprise: Alternance.Entreprise;
  niveauRequis?: string
  ville?: string
  typeDeContrats?: string[]
  étiquetteList: string[]
  adresse: string
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
