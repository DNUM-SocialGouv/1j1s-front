import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';

export interface DemandeDeContactPOE {
  prénom: string;
  nom: string;
  email: string;
  téléphone: string;
  nomSociété: string;
  siret: string;
  taille: keyof typeof TailleDEntreprise;
  secteur: keyof typeof SecteurDActivité;
  codePostal: string;
  ville: string;
  nombreARecruter: string;
  travail: string;
  commentaire: string;
}
