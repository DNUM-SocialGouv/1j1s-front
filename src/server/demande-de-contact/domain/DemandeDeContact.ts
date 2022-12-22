import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';

export type DemandeDeContactType = 'CEJ' | 'LesEntreprisesSEngagent';

export interface DemandeDeContact {
  prénom: string
  nom: string
  email: string
  téléphone: string
}

export interface DemandeDeContactEntreprise extends DemandeDeContact {
  sujet: string
  message: string
}

export interface DemandeDeContactCEJ extends DemandeDeContact {
  ville: string
  codePostal: string
  age: Age
}

export interface DemandeDeContactAccompagnement extends DemandeDeContact {
  ville: string
  codePostal: string
  age: Age
  commentaire: string
}

export interface DemandeDeContactPOE extends DemandeDeContact{
  nomSociété: string
  siret: string
  taille: keyof typeof TailleDEntreprise
  secteur: keyof typeof SecteurDActivité
  codePostal: string
  ville: string
  nombreARecruter: string
  travail: string
  commentaire: string
}

type Age = 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;

export function Age(a: number): Age {
  if (a >= 16 && a <= 30 && Math.floor(a) === a) {
    return a as Age;
  }
  throw Error(`${a} n'est un âge valide`);
}
