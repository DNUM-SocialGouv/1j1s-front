/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormulaireDeContact from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContact';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

describe('<FormulaireDeContact />', () => {
  const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];
  function renderComponent() {
    const anDemandeDeContactService = (): DemandeDeContactService => ({
      envoyer: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactService);
    const demandeDeContactServiceMock = anDemandeDeContactService();
    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactServiceMock}>
        <FormulaireDeContact/>
      </DependenciesProvider>,
    );
    return { demandeDeContactServiceMock };
  }
  it('affiche un formulaire de rappel', async () => {
    // Given
    renderComponent();
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
      renderComponent();
      // When
      await userEvent.type(screen.getByLabelText(label), 's{backspace}');
      // Then
      expect(screen.getByLabelText('Nom')).toBeInvalid();
    });
  }

  it('a un champ Age obligatoire', async () => {
    // Given
    renderComponent();
    // When
    await userEvent.click(screen.getByLabelText('Age'));
    await userEvent.click(screen.getByLabelText('Nom'));
    // Then
    expect(screen.getByLabelText('Age')).toBeInvalid();
  });
  describe('Quand l’utilisateur clique sur Envoyer la demande', () => {
    it('appelle l’api avec les paramètres saisis dans le formulaire', async () => {
      // Given
      const { demandeDeContactServiceMock } = renderComponent();

      // When
      const inputFirstName = screen.getByRole('textbox', { name: 'Prénom' });
      const inputLastName = screen.getByRole('textbox', { name: 'Nom' });
      const inputPhone = screen.getByRole('textbox', { name: 'Téléphone' });
      const inputMail = screen.getByRole('textbox', { name: 'Adresse email' });
      const inputVille = screen.getByRole('textbox', { name: 'Ville' });
      const inputAge = screen.getByRole('button', { name: 'Age' });
      await userEvent.click(inputAge);
      const optionAge = screen.getByRole('option', { name: '19 ans' });
      await userEvent.click(optionAge);
      await userEvent.type(inputFirstName, 'Toto');
      await userEvent.type(inputLastName, 'Mc Totface');
      await userEvent.type(inputPhone, '0123456789');
      await userEvent.type(inputMail, 'toto@msn.fr');
      await userEvent.type(inputVille, 'Pontoise');

      const button = screen.getByRole('button', { name: 'Envoyer la demande' });
      await userEvent.click(button);

      // Then
      expect(demandeDeContactServiceMock.envoyer).toHaveBeenCalledWith({
        age: 19,
        email: 'toto@msn.fr',
        nom: 'Mc Totface',
        prénom: 'Toto',
        téléphone: '0123456789',
        ville: 'Pontoise',
      });
    });
  });
});


