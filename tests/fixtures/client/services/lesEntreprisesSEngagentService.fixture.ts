import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { Entreprise } from '~/server/entreprises/domain/Entreprise';
import { RejoindreLaMobilisation } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createSuccess } from '~/server/errors/either';

export function aLesEntreprisesSEngagentService(): LesEntreprisesSEngagentService {
  return {
    envoyerFormulaireEngagement: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as LesEntreprisesSEngagentService;
}

export const uneCommandeRejoindreLaMobilisation: () => RejoindreLaMobilisation = () => ({
  codePostal: '75015',
  email: 'machin.chose@bidule.com',
  nom: 'Chose',
  nomSociété: 'Bidule co.',
  prénom: 'Machin',
  secteur: 'other-services',
  siret: '12345678901114',
  taille: 'medium',
  travail: 'Chef',
  téléphone: '0123456789',
  ville: 'Paris (15e arrondissement)',
});

export const uneEntreprise: () => Entreprise = () => ({
  codePostal: '75015',
  email: 'machin.chose@bidule.com',
  nom: 'Chose',
  nomSociété: 'Bidule co.',
  prénom: 'Machin',
  secteur: 'other-services',
  siret: '12345678901114',
  taille: 'medium',
  travail: 'Chef',
  téléphone: '+33123456789',
  ville: 'Paris (15e arrondissement)',
});

export const uneEntrepriseMember = () => ({
  companyName: 'Bidule co.',
  companyPostalCode: '75015',
  companySector: 'other-services',
  companySiret: '12345678901114',
  companySize: 'medium',
  email: 'machin.chose@bidule.com',
  firstname: 'Machin',
  from1j1s: true,
  job: 'Chef',
  lastname: 'Chose',
  phone: '+33123456789',
});

export const unContenuEntreprise = (annotation?: string) => ({
  code_postal: '75015',
  email: 'machin.chose@bidule.com',
  nom: 'Chose',
  nom_societe: 'Bidule co.',
  prenom: 'Machin',
  secteur: 'other-services',
  siret: '12345678901114',
  taille: 'medium',
  telephone: '+33123456789',
  travail: 'Chef',
  ville: 'Paris (15e arrondissement)',
  ...(annotation ? { erreur: annotation } : {}),
});
