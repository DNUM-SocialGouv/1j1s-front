export interface Commune {
  libelle: string;
  ville: string;
  code: string;
  coordonnées: {
    longitude: number
    latitude: number
  }
}

export interface RésultatsRechercheCommune {
  résultats: Commune[]
}
