export interface LocalisationApiResponse {
  libelle: string;
  codeInsee: string;
  code: string;
}

export interface LocalisationListApiResponse {
  communeList: LocalisationApiResponse[]
  départementList: LocalisationApiResponse[]
  régionList: LocalisationApiResponse[]
}
