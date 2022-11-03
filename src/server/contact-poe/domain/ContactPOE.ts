import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';

export interface ContactPOE {
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: keyof typeof SecteurDActivité;
  taille: keyof typeof TailleDEntreprise;
  nom: string;
  prénom: string;
  téléphone: string;
  email: string;
  travail: string;
  nombreARecruter: string;
  commentaire: string;
}
