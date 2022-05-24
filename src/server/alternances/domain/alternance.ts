type AlternanceId = string;

export interface Alternance {
  id: AlternanceId;
  intitulé: string;
  description: string | null;
  entreprise: Alternance.Entreprise;
}

export namespace Alternance {
  export interface Entreprise {
    nom: string
  }
}

export interface AlternanceFiltre {
  codeRomeList: string[]
}

export interface RésultatsRechercheAlternance {
  nombreRésultats: number
  résultats: Alternance[]
}
