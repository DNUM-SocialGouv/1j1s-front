/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import React from 'react';

import { ÉtiquettesFiltreMission } from '~/client/components/features/Engagement/Rechercher/ÉtiquettesFiltreMission';

describe('Étiquettes filtre mission', () => {

  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand une recherche est lancée', () => {
    it('retourne une liste d\'étiquettes', async () => {

      mockUseRouter({
        query: {
          ouvertsAuxMineurs: 'true',
          page: '1',
        },
      });
      render(<ÉtiquettesFiltreMission/>);

      const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
      expect(filtresRecherche).toBeInTheDocument();
    });
  });
});
