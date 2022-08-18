/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  aLesEntreprisesSEngagementService,
} from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import LesEntreprisesSEngagentInscription from '~/pages/les-entreprises-s-engagent/inscription';

describe('LesEntreprisesSEngagentInscription', () => {
  const aLesEntreprisesSEngagementServiceMock = aLesEntreprisesSEngagementService();

  describe('quand l’utilisateur arrivent sur la page', () => {
    it('il voit afficher la première étape de formulaire', () => {
      render(
        <DependenciesProvider lesEntreprisesSEngagementService={aLesEntreprisesSEngagementServiceMock}>
          <LesEntreprisesSEngagentInscription />
        </DependenciesProvider>,
      );

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise' })).toBeInTheDocument();
      expect(screen.getByText('Etape 1 sur 2')).toBeInTheDocument();
    });
  });

  describe('quand l’utilisateur cliquent sur Suivant mais n’a pas rempli le formulaire', () => {
    it('il voie des messages d’erreur', async () => {
      render(
        <DependenciesProvider lesEntreprisesSEngagementService={aLesEntreprisesSEngagementServiceMock}>
          <LesEntreprisesSEngagentInscription />
        </DependenciesProvider>,
      );

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
      await userEvent.type(inputNomSociété, 'Octo');

      const button = screen.getByRole('button', { name: 'Suivant' });
      await userEvent.click(button);

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' })).toBeValid();
      expect(screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise' })).toBeInvalid();
    });
  });

  describe('quand l’utilisateur cliquent sur Suivant et qu’il a remplie tous les champs', () => {
    it('il passe à l’étape 2', async () => {
      render(
        <DependenciesProvider lesEntreprisesSEngagementService={aLesEntreprisesSEngagementServiceMock}>
          <LesEntreprisesSEngagentInscription />
        </DependenciesProvider>,
      );

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
      const inputCodePostalSociété = screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise' });
      const inputSiret = screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET' });
      const inputSecteur = screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise' });
      const inputTaille = screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise' });
      await userEvent.type(inputNomSociété, 'Octo');
      await userEvent.type(inputCodePostalSociété, '75002');
      await userEvent.type(inputSiret, '41816609600069');
      await userEvent.type(inputSecteur, 'Conseil en systèmes et logiciels informatiques');
      await userEvent.type(inputTaille, '+1000');

      const button = screen.getByRole('button', { name: 'Suivant' });
      await userEvent.click(button);

      expect(screen.getByRole('textbox', { name: 'Indiquer votre prénom' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre nom' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre adresse e-mail de contact' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre fonction au sein de votre entreprise' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer un numéro de téléphone de contact' })).toBeInTheDocument();
      expect(screen.getByText('Etape 2 sur 2')).toBeInTheDocument();
    });
  });

  describe('quand l’utilisateur a mal remplie l’étape 2 du formulaire et clique sur Envoyer le formulaire', () => {
    it('il voie des messages d’erreur', async () => {
      render(
        <DependenciesProvider lesEntreprisesSEngagementService={aLesEntreprisesSEngagementServiceMock}>
          <LesEntreprisesSEngagentInscription />
        </DependenciesProvider>,
      );

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
      const inputCodePostalSociété = screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise' });
      const inputSiret = screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET' });
      const inputSecteur = screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise' });
      const inputTaille = screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise' });
      await userEvent.type(inputNomSociété, 'Octo');
      await userEvent.type(inputCodePostalSociété, '75002');
      await userEvent.type(inputSiret, '41816609600069');
      await userEvent.type(inputSecteur, 'Conseil en systèmes et logiciels informatiques');
      await userEvent.type(inputTaille, '+1000');

      const buttonSuivant = screen.getByRole('button', { name: 'Suivant' });
      await userEvent.click(buttonSuivant);

      const inputPrénom = screen.getByRole('textbox', { name: 'Indiquer votre prénom' });
      await userEvent.type(inputPrénom, 'Toto');

      const button = screen.getByRole('button', { name: 'Envoyer le formulaire' });
      await userEvent.click(button);

      expect(screen.getByRole('textbox', { name: 'Indiquer votre prénom' })).toBeValid();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre nom' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre adresse e-mail de contact' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre fonction au sein de votre entreprise' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer un numéro de téléphone de contact' })).toBeInvalid();
    });
  });

  describe('quand l’utilisateur a remplie tous les champs et clique sur Envoyer le formulaire', () => {
    it('appelle l’api avec les valeurs du formulaire de l’étape 1 et 2 et affiche un message de succès à l’utilisateur', async () => {
      render(
        <DependenciesProvider lesEntreprisesSEngagementService={aLesEntreprisesSEngagementServiceMock}>
          <LesEntreprisesSEngagentInscription />
        </DependenciesProvider>,
      );

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise' });
      const inputCodePostalSociété = screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise' });
      const inputSiret = screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET' });
      const inputSecteur = screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise' });
      const inputTaille = screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise' });
      await userEvent.type(inputNomSociété, 'Octo');
      await userEvent.type(inputCodePostalSociété, '75002');
      await userEvent.type(inputSiret, '41816609600069');
      await userEvent.type(inputSecteur, 'Conseil en systèmes et logiciels informatiques');
      await userEvent.type(inputTaille, '+1000');

      const buttonSuivant = screen.getByRole('button', { name: 'Suivant' });
      await userEvent.click(buttonSuivant);

      const inputPrénom = screen.getByRole('textbox', { name: 'Indiquer votre prénom' });
      const inputNom = screen.getByRole('textbox', { name: 'Indiquer votre nom' });
      const inputEmail = screen.getByRole('textbox', { name: 'Indiquer votre adresse e-mail de contact' });
      const inputTravail = screen.getByRole('textbox', { name: 'Indiquer votre fonction au sein de votre entreprise' });
      const inputTéléphone = screen.getByRole('textbox', { name: 'Indiquer un numéro de téléphone de contact' });
      await userEvent.type(inputPrénom, 'Toto');
      await userEvent.type(inputNom, 'Tata');
      await userEvent.type(inputEmail, 'toto@email.com');
      await userEvent.type(inputTravail, 'RH');
      await userEvent.type(inputTéléphone, '01 22 33 44 55');

      const button = screen.getByRole('button', { name: 'Envoyer le formulaire' });
      await userEvent.click(button);

      expect(aLesEntreprisesSEngagementServiceMock.envoyerFormulaireEngagement).toHaveBeenCalledWith(
        {
          codePostal: '75002',
          email: 'toto@email.com',
          nom: 'Tata',
          nomSociété: 'Octo',
          prénom: 'Toto',
          secteur: 'Conseil en systèmes et logiciels informatiques',
          siret: '41816609600069',
          taille: '+1000',
          travail: 'RH',
          téléphone: '01 22 33 44 55',
        },
      );
      expect(screen.getByText('Félicitations, votre formulaire a bien été envoyé !')).toBeInTheDocument();
    });
  });
});
