import { OptionListObject } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
export type AlternanceId = string;

export type From = 'peJob' | 'matcha'

export interface Alternance {
  id: AlternanceId;
  from: From;
  intitulé: string;
  description?: string;
  entreprise?: Alternance.Entreprise;
  niveauRequis?: string
  ville?: string
  typeDeContrats?: string[]
  étiquetteList: string[]
  adresse?: string
  contact?: Alternance.Contact
}

export namespace Alternance {
  export interface Entreprise {
    nom?: string
    logo?: string
  }

  export interface Contact {
    nom?: string
    téléphone?: string
  }
}

export interface AlternanceFiltre {
  codeRomeList: string[]
  radius?: string
  codeLocalisation?: string
}

export interface RésultatsRechercheAlternance {
  nombreRésultats: number
  résultats: Alternance[]
}

export const Radius: OptionListObject[] = [
  { libellé: 'Indifférent', valeur: '' },
  { libellé: '10', valeur: '10' },
  { libellé: '30', valeur: '30' },
  { libellé: '60', valeur: '60' },
  { libellé: '100', valeur: '100' },
];
