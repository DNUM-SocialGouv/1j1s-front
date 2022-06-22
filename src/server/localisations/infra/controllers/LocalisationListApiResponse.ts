export interface LocalisationApiResponse {
  libelle: string;
  code: string;
}

export interface LocalisationListApiResponse {
  communeList: LocalisationApiResponse[]
  départementList: LocalisationApiResponse[]
  régionList: LocalisationApiResponse[]
}
