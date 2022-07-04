/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import {
  aLocalisationService,
  aLocalisationServiceWithEmptyRésultat,
} from '@tests/fixtures/client/services/localisationService.fixture';
import React from 'react';

import { InputCommune } from '~/client/components/features/InputCommune/InputCommune';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('InputCommune', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand aucun résultat n\'est trouvé', () => {
    it('affiche un message d\'information', async () => {
      // GIVEN
      const localisationServiceMock = aLocalisationServiceWithEmptyRésultat();
      const user = userEvent.setup();

      mockUseRouter({});
      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <InputCommune code="" libellé="" latitude="" longitude="" />
        </DependenciesProvider>,
      );
      const inputCommune = screen.getByTestId('InputCommune');

      // WHEN
      await user.type(inputCommune, 'abgfjs');

      // THEN
      await waitFor(() => {
        expect(screen.getByTestId('CommuneNoResultMessage')).toBeInTheDocument();
      });
    });
  });

  describe('quand la recherche retourne des résultats', () => {
    it('appelle l\'api avec la valeur de la commune sélectionnée', async () => {
      // GIVEN
      const localisationServiceMock = aLocalisationService();
      const user = userEvent.setup();

      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <InputCommune code="" libellé="" latitude="" longitude="" />
        </DependenciesProvider>,
      );

      const inputCommune = screen.getByTestId('InputCommune');

      // WHEN
      await user.type(inputCommune, 'pari');

      // THEN
      await waitFor(() => {
        expect(localisationServiceMock.rechercherCommune).toHaveBeenCalledWith('pari');
      });


      const résultatsCommune = await screen.findByTestId('RésultatsCommune');

      // WHEN
      const résultatCommuneList = within(résultatsCommune).getAllByRole('option');
      fireEvent.click(résultatCommuneList[0]);

      // THEN
      expect(screen.getByRole('textbox', { name: 'Commune' })).toHaveValue('Paris');
      expect(screen.getByTestId('codeCommune')).toHaveValue('75056');
      expect(screen.getByTestId('latitudeCommune')).toHaveValue('48.859');
      expect(screen.getByTestId('longitudeCommune')).toHaveValue('2.347');
    });
  });

  describe('quand l\'input contient déjà une valeur', () => {
    it('affiche la commune pré-sélectionnée', () => {
      // GIVEN
      const localisationServiceMock = aLocalisationService();

      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <InputCommune code="75056" libellé="Paris" latitude="48.859" longitude="2.347" />
        </DependenciesProvider>,
      );

      // THEN
      expect(screen.getByRole('textbox', { name: 'Commune' })).toHaveValue('Paris');
      expect(screen.getByTestId('codeCommune')).toHaveValue('75056');
      expect(screen.getByTestId('latitudeCommune')).toHaveValue('48.859');
      expect(screen.getByTestId('longitudeCommune')).toHaveValue('2.347');
    });
  });
});
