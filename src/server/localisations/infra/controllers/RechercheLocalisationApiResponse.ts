export interface LocalisationApiResponse {
  nom: string
  code: string
  libelle: string
}

export interface RechercheLocalisationApiResponse {
  communeList: LocalisationApiResponse[]
  départementList: LocalisationApiResponse[]
  régionList: LocalisationApiResponse[]
}
