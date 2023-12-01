export interface Commune {
  libelle: string;
  ville: string;
  code: string;
  codePostal: string;
  coordonnées: {
    longitude: number
    latitude: number
  }
}

export interface CommuneToRename {
	codeInsee: string
	codePostal: string
	longitude: string
	latitude: string
	ville: string
}

export interface RésultatsRechercheCommune {
  résultats: Commune[]
}
