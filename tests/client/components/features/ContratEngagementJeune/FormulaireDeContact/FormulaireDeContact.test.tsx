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

jest.setTimeout(10000);
describe('<FormulaireDeContact />', () => {
  const labels = ['Prénom', 'Nom', 'Adresse email', 'Téléphone', 'Age', 'Ville'];

  function renderComponent() {
    const onSuccess = jest.fn();
    const anDemandeDeContactService = (): DemandeDeContactService => ({
      envoyer: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactService);
    const demandeDeContactServiceMock = anDemandeDeContactService();

    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactServiceMock}>
        <FormulaireDeContact onSuccess={onSuccess}>
          Revenir
        </FormulaireDeContact>
      </DependenciesProvider>,
    );
    return { demandeDeContactServiceMock, onSuccess };
  }
  it('affiche un formulaire de rappel', async () => {
    // Given
    renderComponent();
    // When
    // Then
    for (const label of labels) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
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
    describe('et que le formulaire est valide', () => {
      it('appelle l’api avec les paramètres saisis dans le formulaire', async () => {
        // Given
        const { demandeDeContactServiceMock } = renderComponent();

        // When
        await remplirFormulaireDeContact({
          age: '19 ans',
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Pontoise',
        });

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
      it('appelle la propriété onSuccess', async () => {
        // Given
        const { onSuccess } = renderComponent();

        // When
        await remplirFormulaireDeContact({
          age: '19 ans',
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Pontoise',
        });

        // Then
        expect(onSuccess).toHaveBeenCalled();
      });
      it('Affiche un message de confirmation et {children}', async () => {
        // Given
        renderComponent();

        // When
        await remplirFormulaireDeContact({
          age: '19 ans',
          email: 'toto@msn.fr',
          nom: 'Mc Totface',
          prénom: 'Toto',
          téléphone: '0123456789',
          ville: 'Pontoise',
        });

        // Then
        expect(screen.getByText('Votre demande a bien été transmise !')).toBeInTheDocument();
        expect(screen.getByText('Revenir')).toBeInTheDocument();
      });
    });
  });
});

/* eslint-disable jest/no-export */
type ContactInputs = Record<'prénom'|'nom'|'téléphone'|'email'|'age'|'ville', string>
export async function remplirFormulaireDeContact (data: ContactInputs, submit = true) {
  await userEvent.type(screen.getByLabelText('Prénom'), data.prénom);
  await userEvent.type(screen.getByLabelText('Nom'), data.nom);
  await userEvent.type(screen.getByLabelText('Téléphone'), data.téléphone);
  await userEvent.type(screen.getByLabelText('Adresse email'), data.email);
  await userEvent.type(screen.getByLabelText('Ville'), data.ville);
  await userEvent.click(screen.getByLabelText('Age'));
  await userEvent.click(screen.getByLabelText(data.age));
  if (submit) {
    await userEvent.click(screen.getByRole('button', { name: 'Envoyer la demande' }));
  }
}

