/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Rappel from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel';
 
describe('<Rappel />', () => {
  it("le composant s'affiche correctement", () => {
    // Given
    // When
    render(<Rappel />);
    // Then
    expect(screen.getByText('Je souhaite être contacté(e)')).toBeInTheDocument();
  });
  describe("Lorsqu'on clique sur le bouton je souhaite être contacté(e)", () => {
    it('affiche un formulaire de rappel', async () => {
      // Given
      render(<Rappel />);
      // When
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
      // Then
      expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
      expect(screen.getByLabelText('Nom')).toBeInTheDocument();
      expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
      expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
      expect(screen.getByLabelText('Age')).toBeInTheDocument();
      expect(screen.getByLabelText('Ville')).toBeInTheDocument();
      expect(screen.getByLabelText("J'accepte de recevoir des informations de « 1 Jeune, 1 Solution »")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
    });
    it('a un champ Nom obligatoire', async () => {
      // Given
      render(<Rappel />);
      // When
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
      await userEvent.type(screen.getByLabelText('Nom'), 's{backspace}');
      // Then
      expect(screen.getByLabelText('Nom')).toBeInvalid();
    });
  });
});
 
