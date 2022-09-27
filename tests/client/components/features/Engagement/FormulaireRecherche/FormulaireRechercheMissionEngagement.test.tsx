/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import { aMissionEngagementDomainList } from '@tests/fixtures/domain/missionEngagement.fixture';
import React from 'react';

import {
  FormulaireRechercheMissionEngagement,
} from '~/client/components/features/Engagement/FormulaireRecherche/FormulaireRechercheMissionEngagement';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('FormulaireRechercheMissionEngagement', () => {
  describe('quand on recherche par domaine', () => {
    it('ajoute les domaines aux query params', async () => {
      // GIVEN
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const domainList = aMissionEngagementDomainList();
      const localisationServiceMock = aLocalisationService();

      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <FormulaireRechercheMissionEngagement domainList={domainList}/>
        </DependenciesProvider>,
      );

      const sélectionnerUnDomaineButton = screen.getByRole('button', { name: 'Domaine' });
      fireEvent.click(sélectionnerUnDomaineButton);
      const domaineÉducationOption = screen.getByRole('radio', { name: 'Éducation' });
      fireEvent.click(domaineÉducationOption);
      const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      fireEvent.submit(rechercherMissionButton);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'domain=education&page=0' }, undefined, { shallow: true });
    });
  });

  describe('quand on filtre avec ouverts aux mineurs', () => {
    it('ajoute le filtre aux query params', async () => {
      // GIVEN
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const domainList = aMissionEngagementDomainList();
      const localisationServiceMock = aLocalisationService();

      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <FormulaireRechercheMissionEngagement domainList={domainList}/>
        </DependenciesProvider>,
      );

      const ouvertsAuxMineursCheckbox = screen.getByRole('checkbox', { name: 'Dès 16 ans' });
      fireEvent.click(ouvertsAuxMineursCheckbox);
      const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      fireEvent.submit(rechercherMissionButton);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'ouvertsAuxMineurs=true&page=0' }, undefined, { shallow: true });
    });
  });

  describe('quand on recherche par localisation', () => {
    it('ajoute les distances aux query params', async () => {
      // GIVEN
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const domainList = aMissionEngagementDomainList();
      const localisationServiceMock = aLocalisationService();

      render(
        <DependenciesProvider localisationService={localisationServiceMock}>
          <FormulaireRechercheMissionEngagement domainList={domainList}/>
        </DependenciesProvider>,
      );

      const user = userEvent.setup();
      const inputCommune = screen.getByTestId('InputCommune');
      await user.type(inputCommune, 'Pari');
      const résultatsCommune = await screen.findByTestId('RésultatsCommune');
      const resultListCommune = within(résultatsCommune).getAllByRole('option');
      fireEvent.click(resultListCommune[0]);
      const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
      fireEvent.click(selectButtonRadius);

      const rayon30kmOption = screen.getByRole('radio', { name: '30 km' });
      fireEvent.click(rayon30kmOption);
      const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      fireEvent.submit(rechercherMissionButton);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'libelleCommune=Paris&codeCommune=75056&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=30&page=0' }, undefined, { shallow: true });
    });
  });
});
