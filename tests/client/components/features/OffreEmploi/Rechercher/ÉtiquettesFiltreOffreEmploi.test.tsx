/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import React from 'react';

import {
  ÉtiquettesFiltreOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/ÉtiquettesFiltreOffreEmploi';

describe('Étiquettes filtre emploi', () => {

  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand une recherche est lancée', () => {
    it('retourne une liste d\'étiquettes',  async () => {

      mockUseRouter({
        query: {
          codeLocalisation: '26',
          libelleLocalisation: 'BOURG LES VALENCE (26)',
          typeLocalisation: 'DEPARTEMENT',
        },
      });
      render(<ÉtiquettesFiltreOffreEmploi/>);

      const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
      expect(filtresRecherche).toBeInTheDocument();
    });
  });
});
