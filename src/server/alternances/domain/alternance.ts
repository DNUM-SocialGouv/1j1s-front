import { CodeInsee } from '~/server/localisations/domain/codeInsee';

export type AlternanceId = string;

export type From = 'peJob' | 'matcha'

type AlternanceId = string;

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
  codeInsee?: CodeInsee
}

export interface RésultatsRechercheAlternance {
  nombreRésultats: number
  résultats: Alternance[]
}
