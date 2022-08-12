/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormulaireDeContact from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

describe('<FormulaireDeContact />', () => {
  const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];
  it('affiche un formulaire de rappel', async () => {
    // Given
    render(<FormulaireDeContact />);
    // When
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
      render(<FormulaireDeContact />);
      // When
      await userEvent.type(screen.getByLabelText(label), 's{backspace}');
      // Then
      expect(screen.getByLabelText('Nom')).toBeInvalid();
    });
  }

  it('a un champ Age obligatoire', async () => {
    // Given
    render(<FormulaireDeContact />);
    // When
    await userEvent.click(screen.getByLabelText('Age'));
    await userEvent.click(screen.getByLabelText('Nom'));
    // Then
    expect(screen.getByLabelText('Age')).toBeInvalid();
  });
  describe('Quand l’utilisateur clique sur Envoyer la demande', () => {
    it('doit appeler l’api avec les paramètres saisis dans le formulaire', async () => {
      // Given
      const anDemandeDeContactService = (): DemandeDeContactService => ({
        enregistrer: jest.fn().mockResolvedValue(createSuccess(undefined)),
      } as unknown as DemandeDeContactService);
      const demandeDeContactServiceMock = anDemandeDeContactService();
      render(
        <DependenciesProvider demandeDeContactService={demandeDeContactServiceMock}>
          <FormulaireDeContact />
        </DependenciesProvider>,
      );

      // When
      const inputFirstName = screen.getByRole('textbox', { name: 'Prénom' });
      const inputLastName = screen.getByRole('textbox', { name: 'Nom' });
      const inputPhone = screen.getByRole('textbox', { name: 'Téléphone' });
      const inputMail = screen.getByRole('textbox', { name: 'Adresse email' });
      const inputVille = screen.getByRole('textbox', { name: 'Ville' });
      const inputAge = screen.getByRole('button', { name: 'Age' });
      fireEvent.click(inputAge);
      const optionAge = screen.getByRole('option', { name: '18 ans' });
      await userEvent.type(inputFirstName, 'Jean');
      await userEvent.type(inputLastName, 'Dupont');
      await userEvent.type(inputPhone, '012345678');
      await userEvent.type(inputMail, 'test@test.com');
      await userEvent.type(inputVille, 'Paris');
      fireEvent.click(optionAge);

      const button = screen.getByRole('button', { name: 'Envoyer la demande' });
      fireEvent.click(button);

      // Then
      expect(demandeDeContactServiceMock.enregistrer).toHaveBeenCalledWith({
        age: 18,
        email: 'test@test.com',
        nom: 'Dupont',
        prénom: 'Jean',
        téléphone: '012345678',
        ville: 'Paris',
      });
    });
  });
});


