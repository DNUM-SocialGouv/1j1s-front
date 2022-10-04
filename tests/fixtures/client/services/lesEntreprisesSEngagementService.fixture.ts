import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { Entreprise } from '~/server/entreprises/domain/Entreprise';
import { RejoindreLaMobilisation } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createSuccess } from '~/server/errors/either';

export function aLesEntreprisesSEngagementService(): LesEntreprisesSEngagentService {
  return {
    envoyerFormulaireEngagement: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as LesEntreprisesSEngagentService;
}

export const uneCommandeRejoindreLaMobilisation: () => RejoindreLaMobilisation = () => ({
  codePostal: '75115',
  email: 'machin.chose@bidule.com',
  nom: 'Chose',
  nomSociété: 'Bidule co.',
  prénom: 'Machin',
  secteur: 'other-services',
  siret: '12345678901114',
  taille: 'medium',
  travail: 'Chef',
  téléphone: '0123456789',
});

export const uneEntreprise: () => Entreprise = () => ({
  codePostal: '75115',
  email: 'machin.chose@bidule.com',
  nom: 'Chose',
  nomSociété: 'Bidule co.',
  prénom: 'Machin',
  secteur: 'other-services',
  siret: '12345678901114',
  taille: 'medium',
  travail: 'Chef',
  téléphone: '+33123456789',
});

export const unContenuEntreprise = () => ({
  code_postal: '75115',
  email: 'machin.chose@bidule.com',
  nom: 'Chose',
  nom_societe: 'Bidule co.',
  prenom: 'Machin',
  secteur: 'other-services',
  siret: '12345678901114',
  taille: 'medium',
  telephone: '+33123456789',
  travail: 'Chef',
});
