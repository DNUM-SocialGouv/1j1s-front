export interface Commune {
  libelle: string;
  ville: string;
  code: string;
  coordonnées: Commune.Coordonnées
}

namespace Commune {
  export interface Coordonnées {
    lon: number
    lat: number
  }
}

export interface RésultatsRechercheCommune {
  résultats: Commune[]
}
