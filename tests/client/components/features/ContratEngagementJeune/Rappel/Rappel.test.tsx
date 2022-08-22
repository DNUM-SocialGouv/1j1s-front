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

import { remplirFormulaireDeContact } from '../FormulaireDeContact/FormulaireDeContact.test';

jest.setTimeout(10000);

describe('<Rappel />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
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
      expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
    });
  });
  describe('lorsque on envoie le formulaire', () => {
    it('affiche un message confirmation', async () => {
      // Given
      renderComponent();
      // When
      await userEvent.click(screen.getByText('Je souhaite être contacté(e)'));

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
      expect(screen.getByRole('button', { description: 'Revenir à la page', name: 'Fermer' })).toBeInTheDocument();
    });
  });
});
