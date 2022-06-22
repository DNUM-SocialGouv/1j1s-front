export interface Localisation {
  libelle: string;
  code: string;
}

export enum TypeLocalisation {
  REGION = 'REGION',
  DEPARTEMENT = 'DEPARTEMENT',
  COMMUNE = 'COMMUNE',
}

export interface LocalisationList {
  communeList: Localisation[]
  départementList: Localisation[]
  régionList: Localisation[]
}
