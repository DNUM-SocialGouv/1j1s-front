/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';

import Rappel from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createSuccess } from '~/server/errors/either';

jest.setTimeout(20000);

describe('<Rappel />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  function renderComponent() {
    const demandeDeContactService: DemandeDeContactService = {
      envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
      envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactService;
    const localisationService = aLocalisationService({
      communeList: [],
      départementList: [{ code: '95', libelle: 'Pontoise', nom: 'Pontoise' }],
      régionList: [],
    });

    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactService} localisationService={localisationService}>
        <Rappel/>
      </DependenciesProvider>,
    );

  }

  it('le composant s\'affiche correctement', () => {
    // Given
    // When
    renderComponent();
    // Then
    expect(screen.getByText('Je souhaite être contacté(e)')).toBeInTheDocument();
  });
  describe('Lorsqu\'on clique sur le bouton je souhaite être contacté(e)', () => {
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

/* eslint-disable jest/no-export */
type ContactInputs = Record<'prénom' | 'nom' | 'téléphone' | 'email' | 'age' | 'ville', string>

export async function remplirFormulaireDeContact(data: ContactInputs, user = userEvent.setup(), submit = true) {
  await user.type(screen.getByLabelText('Prénom'), data.prénom);
  await user.type(screen.getByLabelText('Nom'), data.nom);
  await user.type(screen.getByLabelText('Téléphone'), data.téléphone);
  await user.type(screen.getByLabelText('Adresse email'), data.email);

  await user.type(screen.getByLabelText('Ville'), data.ville);
  const résultatsLocalisation = await screen.findByTestId('RésultatsLocalisation');
  const résultatLocalisationList = within(résultatsLocalisation).getAllByRole('option');
  fireEvent.click(résultatLocalisationList[0]);

  await user.click(screen.getByLabelText('Age'));
  await user.click(screen.getByLabelText(data.age));
  if (submit) {
    await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));
  }
}
