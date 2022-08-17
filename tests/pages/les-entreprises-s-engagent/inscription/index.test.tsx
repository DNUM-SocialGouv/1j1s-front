/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LesEntreprisesSEngagentInscription from '~/pages/les-entreprises-s-engagent/inscription';

describe('LesEntreprisesSEngagentInscription', () => {
  describe('quand l’utilisateur arrivent sur la page', () => {
    it('il voit afficher la première étape de formulaire', () => {
      render(<LesEntreprisesSEngagentInscription />);

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByText('Etape 1 sur 2')).toBeInTheDocument();
    });
  });

  describe('quand l’utilisateur cliquent sur Suivant mais n’a pas rempli le formulaire', () => {
    it('il voie des messages d’erreur', async () => {
      const user = userEvent.setup();
      render(<LesEntreprisesSEngagentInscription />);

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise (champ obligatoire)' });
      await user.type(inputNomSociété, 'Octo');

      const button = screen.getByRole('button', { name: 'Suivant' });
      fireEvent.click(button);

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise (champ obligatoire)' })).toBeValid();
      expect(screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise (champ obligatoire)' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET (champ obligatoire)' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise (champ obligatoire)' })).toBeInvalid();
      expect(screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise (champ obligatoire)' })).toBeInvalid();
    });
  });

  describe('quand l’utilisateur cliquent sur Suivant et qu’il a remplie tous les champs', () => {
    it('il passe à l’étape 2', async () => {
      const user = userEvent.setup();
      render(<LesEntreprisesSEngagentInscription />);

      const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise (champ obligatoire)' });
      const inputCodePostalSociété = screen.getByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise (champ obligatoire)' });
      const inputSiret = screen.getByRole('textbox', { name: 'Indiquer votre numéro de SIRET (champ obligatoire)' });
      const inputSecteur = screen.getByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise (champ obligatoire)' });
      const inputTaille = screen.getByRole('textbox', { name: 'Indiquer la taille de votre entreprise (champ obligatoire)' });
      await user.type(inputNomSociété, 'Octo');
      await user.type(inputCodePostalSociété, '75002');
      await user.type(inputSiret, '41816609600069');
      await user.type(inputSecteur, 'Conseil en systèmes et logiciels informatiques');
      await user.type(inputTaille, '+1000');

      const button = screen.getByRole('button', { name: 'Suivant' });
      fireEvent.click(button);

      expect(screen.getByRole('textbox', { name: 'Indiquer votre prénom (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre nom (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre adresse e-mail de contact (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer votre fonction au sein de votre entreprise (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Indiquer un numéro de téléphone de contact (champ obligatoire)' })).toBeInTheDocument();
      expect(screen.getByText('Etape 2 sur 2')).toBeInTheDocument();

      expect(screen.queryByRole('textbox', { name: 'Indiquez le nom de l’entreprise (champ obligatoire)' })).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Indiquez la ville du siège social de l’entreprise (champ obligatoire)' })).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Indiquer votre numéro de SIRET (champ obligatoire)' })).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Indiquer le secteur d’activité de votre entreprise (champ obligatoire)' })).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Indiquer la taille de votre entreprise (champ obligatoire)' })).not.toBeInTheDocument();
      expect(screen.queryByText('Etape 1 sur 2')).not.toBeInTheDocument();

      // CHECK INPUT HIDDEN VALUES (obligé de passer par des data-testid parce qu’on ne peut pas récupérer des inputs hidden via un rôle)
      expect(screen.getByTestId('Nom société')).toHaveValue('Octo');
      expect(screen.getByTestId('Code postal société')).toHaveValue('75002');
      expect(screen.getByTestId('Siret société')).toHaveValue('41816609600069');
      expect(screen.getByTestId('Secteur société')).toHaveValue('Conseil en systèmes et logiciels informatiques');
      expect(screen.getByTestId('Taille société')).toHaveValue('+1000');
    });
  });
});
