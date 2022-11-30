/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  RechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
  anÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { mockUseRouter } from '~/client/useRouter.mock';
import { mockSmallScreen } from '~/client/window.mock';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('RechercherAccompagnement', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand aucune recherche n‘est lancée', () => {
    it('affiche un formulaire de recherche, sans résultat ou message d‘erreur', () => {
      const établissementAccompagnementService = anÉtablissementAccompagnementService();
      const localisationServiceMock = aLocalisationService();

      mockUseRouter({});
      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          établissementAccompagnementService={établissementAccompagnementService}
        >
          <RechercherAccompagnement />
        </DependenciesProvider>,
      );

      // WHEN
      const formulaireRechercheÉtablissementAccompagnement = screen.getByRole('form');
      const résultatRechercheÉtablissementAccompagnementList = screen.queryAllByTestId('RésultatRechercherSolution');
      const rechercheÉtablissementAccompagnementNombreRésultats = screen.queryByTestId('NombreRésultatsSolution');
      const zeroResultsMessage = screen.queryByText('0 résultat');
      const errorMessage = screen.queryByTestId('Erreur - Demande incorrecte');

      // THEN
      expect(formulaireRechercheÉtablissementAccompagnement).toBeInTheDocument();
      expect(résultatRechercheÉtablissementAccompagnementList).toHaveLength(0);
      expect(rechercheÉtablissementAccompagnementNombreRésultats).not.toBeInTheDocument();
      expect(zeroResultsMessage).not.toBeInTheDocument();
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('quand on recherche un établissement d‘accompagnement', () => {
    describe('quand aucun résultat ne correspond à la recherche', () => {
      it('affiche un message aucun résultat', async () => {
        const établissementAccompagnementService = anÉtablissementAccompagnementService();
        établissementAccompagnementService.rechercher = jest.fn().mockResolvedValue(createSuccess([]));
        const localisationServiceMock = aLocalisationService();

        mockUseRouter({ query: { codeCommune: '75056', libelleCommune: 'Paris' } });
        render(
          <DependenciesProvider
            localisationService={localisationServiceMock}
            établissementAccompagnementService={établissementAccompagnementService}
          >
            <RechercherAccompagnement />
          </DependenciesProvider>,
        );

        // WHEN
        const aucunRésultat = await screen.findByText('0 résultat');
        const résultatRechercheÉtablissementAccompagnementList = screen.queryByTestId('RésultatRechercherSolution');

        // THEN
        expect(résultatRechercheÉtablissementAccompagnementList).not.toBeInTheDocument();
        expect(aucunRésultat).toBeInTheDocument();
      });
    });

    describe('quand le service nous retourne une erreur', () => {
      it('affiche un message d‘erreur',  async () => {
        const établissementAccompagnementService = anÉtablissementAccompagnementService();
        établissementAccompagnementService.rechercher = jest.fn().mockResolvedValue(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
        const localisationServiceMock = aLocalisationService();

        mockUseRouter({ query: { codeCommune: '75056', libelleCommune: 'Paris' } });
        render(
          <DependenciesProvider
            localisationService={localisationServiceMock}
            établissementAccompagnementService={établissementAccompagnementService}
          >
            <RechercherAccompagnement />
          </DependenciesProvider>,
        );

        // WHEN
        const aucunRésultat = await screen.findByText('Erreur - Demande incorrecte');
        const résultatRechercheÉtablissementAccompagnementList = screen.queryByTestId('RésultatRechercherSolution');

        // THEN
        expect(résultatRechercheÉtablissementAccompagnementList).not.toBeInTheDocument();
        expect(aucunRésultat).toBeInTheDocument();
      });
    });

    describe('quand on filtre par localisation', () => {
      it('retourne des établissements liés à la localisation', async () => {
        const établissementAccompagnementService = anÉtablissementAccompagnementService();
        const localisationServiceMock = aLocalisationService();

        mockUseRouter({ query: { codeCommune: '75056', libelleCommune: 'Paris' } });
        render(
          <DependenciesProvider
            localisationService={localisationServiceMock}
            établissementAccompagnementService={établissementAccompagnementService}
          >
            <RechercherAccompagnement />
          </DependenciesProvider>,
        );

        // WHEN
        const résultatRechercheÉtablissementAccompagnementList = await screen.findAllByTestId('RésultatRechercherSolution');
        const rechercheÉtablissementAccompagnementNombreRésultats = await screen.findByText('3 établissements d‘accompagnement pour les structures Infos Jeunes');

        // THEN
        expect(résultatRechercheÉtablissementAccompagnementList).toHaveLength(3);
        expect(rechercheÉtablissementAccompagnementNombreRésultats).toBeInTheDocument();
      });
    });
  });
});
