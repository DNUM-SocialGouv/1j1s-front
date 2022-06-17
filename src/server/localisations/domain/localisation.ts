import { CodeInsee } from '~/server/localisations/domain/codeInsee';

export interface Localisation {
  libelle: string;
  codeInsee: CodeInsee;
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
