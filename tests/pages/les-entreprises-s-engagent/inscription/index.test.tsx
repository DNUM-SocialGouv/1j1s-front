/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';

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
    it('il voie des messages d’erreur', () => {
      render(<LesEntreprisesSEngagentInscription />);

      const button = screen.getByRole('button', { name: 'Suivant' });
      fireEvent.click(button);

      expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise (champ obligatoire)' })).toBeInvalid();
    });
  });
});
