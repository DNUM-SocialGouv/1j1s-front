/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aFicheMetier } from '@tests/fixtures/domain/ficheMetier.fixture';

import ConsulterFicheMetierPage from '~/pages/decouvrir-les-metiers/[id]';

describe('Page consulter fiche métier', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Lorsque l\'utilisateur arrive sur la page', () => {
    beforeEach(() => {
      mockUseRouter({});
    });

    it('affiche les informations disponibles de la fiche métier', async () => {
      const ficheMetier = aFicheMetier();
      render(<ConsulterFicheMetierPage ficheMetier={ficheMetier} />);

      const nomMetier = await screen.findByRole('heading', { level: 1 });
      const sections = await screen.findAllByRole('heading', { level: 2 });

      expect(nomMetier).toBeInTheDocument();
      expect(sections.length).toEqual(7);
    });
  });
});
