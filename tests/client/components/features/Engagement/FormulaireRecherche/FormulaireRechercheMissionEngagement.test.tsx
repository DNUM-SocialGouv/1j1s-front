/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
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

      render(
        <DependenciesProvider>
          <FormulaireRechercheMissionEngagement domainList={domainList}/>
        </DependenciesProvider>,
      );

      const sélectionnerUnDomaineButton = screen.getByRole('button', { name: 'Sélectionnez un domaine' });
      fireEvent.click(sélectionnerUnDomaineButton);
      const domaineÉducationOption = screen.getByRole('option', { name: 'Éducation' });
      fireEvent.click(domaineÉducationOption);
      const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      fireEvent.submit(rechercherMissionButton);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'domain=education&page=1' }, undefined, { shallow: true });
    });
  });

  describe('quand on recherche par localisation', () => {
    it('ajoute les distances aux query params', async () => {
      // GIVEN
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const domainList = aMissionEngagementDomainList();

      render(
        <DependenciesProvider>
          <FormulaireRechercheMissionEngagement domainList={domainList}/>
        </DependenciesProvider>,
      );

      const sélectionnerUnRayonButton = screen.getByRole('button', { name: 'Indifférent' });
      fireEvent.click(sélectionnerUnRayonButton);
      const rayon30kmOption = screen.getByRole('option', { name: '30 km' });
      fireEvent.click(rayon30kmOption);
      const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      fireEvent.submit(rechercherMissionButton);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'distance=30&page=1' }, undefined, { shallow: true });
    });
  });
});
