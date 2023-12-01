import {
	ContactÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

export type DemandeDeContactType = 'CEJ' | 'LesEntreprisesSEngagent';

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
  établissement: ContactÉtablissementAccompagnement
}

export type Age = 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
