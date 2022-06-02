type AlternanceId = string;

export interface Alternance {
  id: AlternanceId;
  intitulé: string;
  description?: string;
  entreprise: Alternance.Entreprise;
  niveauRequis?: string
  ville?: string
  typeDeContrats?: string[]
  tagList: string[]
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
