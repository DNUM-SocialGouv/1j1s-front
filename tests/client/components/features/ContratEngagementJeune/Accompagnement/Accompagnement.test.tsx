/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockSmallScreen } from '@tests/client/window.mock';

import Accompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';

describe('<Accompagnement />', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand il se passe rien', () => {
    it('on affiche le composant avec 3 boutons', () => {
      // Given
      render(<Accompagnement/>);
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

      render(<Accompagnement/>);
      const troisièmeBouton = screen.getByText(pasDAccompagnement);

      // When
      await userEvent.click(troisièmeBouton);

      // Then
      const preuveDExistence = screen.getByText(quelÂgeAvezVous);
      expect(troisièmeBouton).not.toBeInTheDocument();
      expect(preuveDExistence).toBeInTheDocument();
    });
  });

  describe('quand on clique sur Oui je suis accompagné par la Mission Locale', () => {
    it('ça te renvoie sur le formulaire Mission Locale', async () => {
      // Given
      const missionLocale = 'Oui, je suis accompagné(e) par la Mission Locale';
      render(<Accompagnement/>);
      const premierBouton = screen.getByText(missionLocale);
      // When
      await userEvent.click(premierBouton);

      // Then
      expectFormulaireDeContact();

    });
  });


  describe('quand on clique sur Oui je suis accompagné par Pôle Emploi', () => {
    it('ça te renvoie chez Pôle Emploi', async () => {
      // Given
      const pôleEmploi = 'Oui, je suis accompagné(e) par Pôle Emploi';
      const jeContacteMonConseiller = 'Je contacte mon conseiller';
      render(<Accompagnement/>);

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

      render(<Accompagnement/>);
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
