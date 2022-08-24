/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import {
  anApprentiBoucherFromMatcha,
} from '@tests/fixtures/domain/alternance.fixture';

import { ConsulterOffreAlternance } from '~/client/components/features/Alternance/Consulter/ConsulterOffreAlternance';

jest.mock('dompurify', () => {
  return {
    sanitize: jest.fn().mockImplementation(() => 'sanitized'),
  };
});

describe('ConsulterOffreAlternance', () => {
  describe('quand l\'offre d\'alternance provient de matcha', () => {
    it('affiche l\'offre d\'alternance', () => {
      const offreAlternance = anApprentiBoucherFromMatcha();

      render(<ConsulterOffreAlternance offreAlternance={offreAlternance} />);

      const nomEntreprise = screen.getByText('BOUCHERIE STEPHANE VEIT');
      const étiquettesOffreAlternanceList = screen.getByRole('list', { name: 'Caractéristiques du contrat d\'alternance' });


      expect(nomEntreprise).toBeInTheDocument();
      expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(3);
    });

    it('ne contient pas de bouton pour postuler', () => {
      const offreAlternance = anApprentiBoucherFromMatcha();

      render(<ConsulterOffreAlternance offreAlternance={offreAlternance} />);

      const linkPostulerOffreAlternance = screen.queryByText('Postuler');

      expect(linkPostulerOffreAlternance).toBeNull();
    });
  });
});
