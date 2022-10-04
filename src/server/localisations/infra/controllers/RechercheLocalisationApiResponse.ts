export interface LocalisationApiResponse {
  nom: string
  code: string
  libelle: string
}

export interface CommuneLocalisationApiResponse extends LocalisationApiResponse {
  codePostal: string
}

export interface RechercheLocalisationApiResponse {
  communeList: CommuneLocalisationApiResponse[]
  départementList: LocalisationApiResponse[]
  régionList: LocalisationApiResponse[]
}
