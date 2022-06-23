/**
 * @jest-environment jsdom
 */
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aMissionEngagementService } from '@tests/fixtures/client/services/missionEngagementService.fixture';
import React from 'react';

import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('RechercherMission', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on recherche par domaine', () => {
    describe('quand on est dans bénévolat', () => {
      it('appelle l\'api avec le domaine séléctionné et la catégorie bénévolat', async () => {
        const missionEngagementServiceMock = aMissionEngagementService();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category={'bénévolat'} />
          </DependenciesProvider>,
        );

        const button =  screen.getByText('Sélectionnez un domaine');
        fireEvent.click(button);

        const domaineList = await screen.findByTestId('OptionList');

        await waitFor(() => {
          expect(domaineList).toBeInTheDocument();
        });

        const inputDomaine = within(domaineList).getAllByRole('option');
        fireEvent.click(inputDomaine[0]);


        const buttonRechercher = screen.getByText('Rechercher');

        mockUseRouter({ query: { domain: 'culture-loisirs', page: '1' } });
        fireEvent.click(buttonRechercher);

        expect(await screen.findByTestId('RésultatRechercherOffreList')).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: 'domain=culture-loisirs&page=1' });
        expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('domain=culture-loisirs&page=1', 'bénévolat');
      });
    });

    describe('quand on est dans service civique', () => {
      it('appelle l\'api avec le domaine séléctionné et la catégorie service civique', async () => {
        const missionEngagementServiceMock = aMissionEngagementService();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission
              category={'service-civique'}
            />
          </DependenciesProvider>,
        );

        const button = screen.getByText('Sélectionnez un domaine');
        fireEvent.click(button);

        const domaineList = await screen.findByTestId('OptionList');

        await waitFor(() => {
          expect(domaineList).toBeInTheDocument();
        });

        const inputDomaine = within(domaineList).getAllByRole('option');
        fireEvent.click(inputDomaine[0]);


        const buttonRechercher = screen.getByText('Rechercher');

        mockUseRouter({ query: { domain: 'culture-loisirs', page: '1' } });
        fireEvent.click(buttonRechercher);

        expect(await screen.findByTestId('RésultatRechercherOffreList')).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: 'domain=culture-loisirs&page=1' });
        expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('domain=culture-loisirs&page=1', 'service-civique');
      });
    });

  });

});
