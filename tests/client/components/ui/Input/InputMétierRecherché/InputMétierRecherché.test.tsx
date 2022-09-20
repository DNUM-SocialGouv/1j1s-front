/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { anAlternanceService } from '@tests/fixtures/client/services/alternanceService.fixture';
import {
  aMétierRecherchéService,
  aMétierRecherchéServiceWithEmptyResponse,
} from '@tests/fixtures/client/services/métierRecherchéService.fixture';
import React from 'react';

import { InputMétierRecherché } from '~/client/components/ui/Form/InputMétierRecherché/InputMétierRecherché';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';


describe('InputMétierRecherché', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on recherche un métier', () => {
    it('on appelle l\'api des codes ROMES avec la valeur tapée', async () => {
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();

      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <InputMétierRecherché
            libellé=""
            handleErrorMessageActive={false}
            resetHandleErrorMessageActive={jest.fn()}
            code={[]}
          />
        </DependenciesProvider>,
      );

      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');

      await user.type(inputRechercheMétier, 'bou');
      await waitFor(() => {
        expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('bou');
      });


    });

    it('on affiche la liste des suggestions', async () => {
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();

      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <InputMétierRecherché libellé="" handleErrorMessageActive={false} resetHandleErrorMessageActive={jest.fn()} code={[]}/>
        </DependenciesProvider>,
      );

      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');

      await user.type(inputRechercheMétier, 'bou');
      const résultatsRechercheMétier = await screen.findByTestId('RésultatsRechercheMétier');
      expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('bou');

      const resultListItem = within(résultatsRechercheMétier).getAllByRole('option');

      expect(resultListItem.length).toEqual(2);
    });
  });

  describe('quand le métier recherché n\'a pas été trouvé', () => {
    it('on affiche un message d\'information à la place des suggestions', async () => {
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéServiceWithEmptyResponse();

      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <InputMétierRecherché libellé="" handleErrorMessageActive={false} resetHandleErrorMessageActive={jest.fn()} code={[]}/>
        </DependenciesProvider>,
      );
      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');

      await user.type(inputRechercheMétier, 'fake métier');
      await waitFor(() => {
        expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('fake métier');
      });


      const aucuneSuggestion = await screen.findByTestId('MétierRecherchéNoResultMessage');

      await waitFor(() => {
        expect(aucuneSuggestion).toBeInTheDocument();
      });

    });
  });

  describe('quand la recherche est lancé sans métier recherché', () => {
    it('on affiche un message d\'erreur dans le label', async () => {
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <InputMétierRecherché libellé="" handleErrorMessageActive={true} resetHandleErrorMessageActive={jest.fn()} code={[]}/>
        </DependenciesProvider>,
      );

      const erreurMessage = await screen.findByText('Métier, mot-clé');

      await waitFor(() => {
        expect(erreurMessage).toBeInTheDocument();
      });
    });

    it('on affiche un message d\'erreur', async () => {
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <InputMétierRecherché libellé="" handleErrorMessageActive={true} resetHandleErrorMessageActive={jest.fn()} code={[]}/>
        </DependenciesProvider>,
      );

      const erreurMessage = await screen.findByText('Le champ est obligatoire - veuillez saisir un mot-clé');

      await waitFor(() => {
        expect(erreurMessage).toBeInTheDocument();
      });
    });
  });
});
