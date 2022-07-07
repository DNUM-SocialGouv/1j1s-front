import { Option } from '~/client/components/ui/Select/SelectSingle/SelectSingle';

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

export const radiusList: Option[] = [
  { libellé: '10 km', valeur: '10' },
  { libellé: '30 km', valeur: '30' },
  { libellé: '60 km', valeur: '60' },
  { libellé: '100 km', valeur: '100' },
];
