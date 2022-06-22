export interface Localisation {
  nom: string
  code: string
}

export enum TypeLocalisation {
  REGION = 'REGION',
  DEPARTEMENT = 'DEPARTEMENT',
  COMMUNE = 'COMMUNE',
}

export interface RechercheLocalisation {
  communeList: Localisation[]
  départementList: Localisation[]
  régionList: Localisation[]
}
