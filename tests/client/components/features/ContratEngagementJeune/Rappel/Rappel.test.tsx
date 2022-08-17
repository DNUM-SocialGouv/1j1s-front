/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Rappel from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

describe('<Rappel />', () => {
  function renderComponent () {
    const demandeDeContactService  : DemandeDeContactService  = {
      envoyer: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactService;

    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactService}>
        <Rappel />
      </DependenciesProvider>,
    );

  }
  it("le composant s'affiche correctement", () => {
    // Given
    // When
    renderComponent();
    // Then
    expect(screen.getByText('Je souhaite être contacté(e)')).toBeInTheDocument();
  });
  describe("Lorsqu'on clique sur le bouton je souhaite être contacté(e)", () => {
    const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];
    it('affiche un formulaire de rappel', async () => {
      // Given
      renderComponent();
      // When
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));
      // Then
      for (const label of labels) {
        expect(screen.getByLabelText(label)).toBeInTheDocument();
      }
      expect(screen.getByLabelText("J'accepte de recevoir des informations de « 1 Jeune, 1 Solution »")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
    });
  });
});
