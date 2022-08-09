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
    const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];
    it('affiche un formulaire de rappel', async () => {
      // Given
      render(<Rappel />);
      // When
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
      // Then
      for (const label of labels) {
        expect(screen.getByLabelText(label)).toBeInTheDocument();
      }
      expect(screen.getByLabelText("J'accepte de recevoir des informations de « 1 Jeune, 1 Solution »")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
    });

    for (const label of labels.filter((l) => l !== 'Age')) {
      it(`a un champ ${label} obligatoire`, async () => {
        // Given
        render(<Rappel />);
        await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
        // When
        await userEvent.type(screen.getByLabelText(label), 's{backspace}');
        // Then
        expect(screen.getByLabelText('Nom')).toBeInvalid();
      });
    }

    it('a un champ Age obligatoire', async () => {
      // Given
      render(<Rappel />);
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
      // When
      await userEvent.click(screen.getByLabelText('Age'));
      await userEvent.click(screen.getByLabelText('Nom'));
      // Then
      expect(screen.getByLabelText('Age')).toBeInvalid();
    });
  });
});
