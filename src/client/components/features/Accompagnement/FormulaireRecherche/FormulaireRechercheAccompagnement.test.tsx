/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  FormulaireRechercheAccompagnement,
} from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { mockUseRouter } from '~/client/useRouter.mock';
import { mockSmallScreen } from '~/client/window.mock';

describe('FormulaireRechercheAccompagnement', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  describe('quand on recherche par commune', () => {
    it('filtre les résultats par localisation',  async() => {
      // GIVEN
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const localisationServiceMock = aLocalisationService();

      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <FormulaireRechercheAccompagnement />
        </DependenciesProvider>,
      );

      const user = userEvent.setup();
      const inputCommune = screen.getByTestId('InputCommune');
      await user.type(inputCommune, 'Pari');
      const résultatsCommune = await screen.findByTestId('RésultatsCommune');
      const resultListCommune = within(résultatsCommune).getAllByRole('option');
      fireEvent.click(resultListCommune[0]);
      const rechercherÉtablissementAccompagnement = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      fireEvent.submit(rechercherÉtablissementAccompagnement);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'libelleCommune=Paris&codeCommune=75056' }, undefined, { shallow: true });
    });
  });
});
