/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import {
  anApprentiBoucherFromMatcha,
  anApprentiBoucherFromPoleEmploi,
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
      const étiquettesOffreAlternanceList = screen.getByTestId('ÉtiquetteOffreAlternanceList');


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

  describe('quand l\'offre d\'alternance  provient de pejob', () => {
    it('affiche l\'offre d\'alternance', () => {
      const offreAlternance = anApprentiBoucherFromPoleEmploi();

      render(<ConsulterOffreAlternance offreAlternance={offreAlternance} />);

      const nomEntreprise = screen.getByText('AUCHAN SUPERMARCHE');
      const intituléOffreAlternance = screen.getByText('APPRENTI (E) BOUCHER (ERE) (H/F)');
      const étiquettesOffreAlternanceList = screen.getByTestId('ÉtiquetteOffreAlternanceList');


      expect(nomEntreprise).toBeInTheDocument();
      expect(intituléOffreAlternance).toBeInTheDocument();
      expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(3);
    });

    it('contient un bouton pour postuler', () => {
      const offreAlternance = anApprentiBoucherFromPoleEmploi();

      render(<ConsulterOffreAlternance offreAlternance={offreAlternance} />);

      const linkPostulerOffreAlternance = screen.getByTestId('LinkPostulerOffreEmploi');

      expect(linkPostulerOffreAlternance).toHaveAttribute('href', offreAlternance.url);
      expect(linkPostulerOffreAlternance).toHaveAttribute('target', '_blank');
    });
  });

});
