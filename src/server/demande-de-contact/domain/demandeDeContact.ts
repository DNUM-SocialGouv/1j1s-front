import {
	ContactEtablissementAccompagnement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

export type DemandeDeContactType = 'CEJ';

export interface DemandeDeContact {
  prénom: string
  nom: string
  téléphone: string
}

export interface DemandeDeContactCEJ extends DemandeDeContact {
  ville: string
  codePostal: string
  age: Age
  email: string
}

export interface DemandeDeContactAccompagnement {
  prénom: string
  nom: string
  email?: string
  téléphone: string
  commune: string
  age: Age
  commentaire?: string
  établissement: ContactEtablissementAccompagnement
}

export type Age = 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;

export const ACCOMPAGNEMENT_MIN_AGE = 16;
export const ACCOMPAGNEMENT_MAX_AGE = 30;
