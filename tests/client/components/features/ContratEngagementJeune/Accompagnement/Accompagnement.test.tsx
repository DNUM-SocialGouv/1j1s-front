/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockSmallScreen } from '@tests/client/window.mock';

import Accompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { LocalisationService } from '~/client/services/localisation.service';
import { createSuccess } from '~/server/errors/either';

describe('<Accompagnement />', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  function renderComponent () {
    const demandeDeContactService  : DemandeDeContactService  = {
      envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
      envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactService;
    const localisationService = {} as unknown as LocalisationService;


    render(
      <DependenciesProvider demandeDeContactService={demandeDeContactService} localisationService={localisationService}>
        <Accompagnement />
      </DependenciesProvider>,
    );

  }

  describe('quand il se passe rien', () => {
    it('on affiche le composant avec 3 boutons', () => {
      // Given
      renderComponent();
      const premierBouton = screen.getByText('Oui, je suis accompagné(e) par la Mission Locale');
      const deuxièmeBouton = screen.getByText('Oui, je suis accompagné(e) par Pôle Emploi');
      const troisièmeBouton = screen.getByText('Non, je ne bénéficie d\'aucun accompagnement');
      // Then
      expect(premierBouton).toBeInTheDocument();
      expect(deuxièmeBouton).toBeInTheDocument();
      expect(troisièmeBouton).toBeInTheDocument();
    });
  });

  describe('quand on clique sur Non, je ne bénéficie d\'aucun accompagnement', () => {
    it('ça affiche le formulaire avec l\'âge du capitaine', async () => {
      // Given
      const pasDAccompagnement = 'Non, je ne bénéficie d\'aucun accompagnement';
      const quelÂgeAvezVous = 'Quel âge avez-vous ?';

      renderComponent();
      const troisièmeBouton = screen.getByText(pasDAccompagnement);

      // When
      await userEvent.click(troisièmeBouton);

      // Then
      const preuveDExistence = screen.getByText(quelÂgeAvezVous);
      expect(troisièmeBouton).not.toBeInTheDocument();
      expect(preuveDExistence).toBeInTheDocument();
    });
  });

  describe('quand on clique sur Entre 18 et 25 ans', () => {
    it('ça affiche le formulaire besoin d\'aide', async () => {
      // Given
      const contenuModal = 'Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?';
      const titreModal = 'Découvrez les dispositifs référencés sur le portail 1jeune1solution';

      renderComponent();

      // When
      await userEvent.click(screen.getByRole('button',{ name: 'Non, je ne bénéficie d\'aucun accompagnement' }));
      await userEvent.click(screen.getByRole('button',{ name: 'Entre 18 et 25 ans' }));
      await userEvent.click(screen.getByRole('button',{ name: 'Non' }));

      // Then
      expect(await screen.findByText(titreModal)).toBeInTheDocument();
      expect(screen.getByText(contenuModal)).toBeInTheDocument();
    });
  });

  describe('quand on clique sur Oui je suis accompagné par la Mission Locale', () => {
    it('ça te renvoie sur le formulaire Mission Locale', async () => {
      // Given
      const missionLocale = 'Oui, je suis accompagné(e) par la Mission Locale';
      renderComponent();
      const premierBouton = screen.getByText(missionLocale);
      // When
      await userEvent.click(premierBouton);

      // Then
      expectFormulaireDeContact();
      expect(true).toEqual(true);
    });
  });


  describe('quand on clique sur Oui je suis accompagné par Pôle Emploi', () => {
    it('ça te renvoie chez Pôle Emploi', async () => {
      // Given
      const pôleEmploi = 'Oui, je suis accompagné(e) par Pôle Emploi';
      const jeContacteMonConseiller = 'Je contacte mon conseiller';
      renderComponent();

      // When
      await userEvent.click(screen.getByText(pôleEmploi));

      // Then
      const link = screen.getByRole('link', { name: jeContacteMonConseiller });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('pole-emploi.fr'));
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('quand on clique sur Retour', () => {
    it('ça revient sur le formulaire de départ', async () => {
      // Given
      const pasDAccompagnement = 'Non, je ne bénéficie d\'aucun accompagnement';
      const retour = 'Retour';
      const quelÂgeAvezVous = 'Quel âge avez-vous ?';

      renderComponent();
      await userEvent.click(screen.getByText(pasDAccompagnement));

      // When
      await userEvent.click(screen.getByText(retour));

      // Then
      expect(screen.getByText(pasDAccompagnement)).toBeInTheDocument();
      expect(screen.queryByText(quelÂgeAvezVous)).not.toBeInTheDocument();
    });
  });
});

function expectFormulaireDeContact() {
  expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
  expect(screen.getByLabelText('Nom')).toBeInTheDocument();
  expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
  expect(screen.getByLabelText('Age')).toBeInTheDocument();
  expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
  expect(screen.getByLabelText('Ville')).toBeInTheDocument();
  expect(screen.getByText('Envoyer la demande')).toBeInTheDocument();
}
