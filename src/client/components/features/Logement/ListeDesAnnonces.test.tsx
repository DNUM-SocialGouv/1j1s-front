/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { ListeDesAnnonces } from '~/client/components/features/Logement/ListeDesAnnonces';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { mockUsePagination } from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import { mockSmallScreen } from '~/client/components/window.mock';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyedPagination = jest.spyOn(require('react-instantsearch-hooks-web'), 'usePagination');

const TestComponent = () => {
  return (
    <ol aria-label="Annonces de logement">
	  <li>
		Annonce de Logement
	  </li>
    </ol>
  );
};

describe('ListeDesAnnonces Component', () => {
  beforeEach(() => {
    mockSmallScreen();
  });
  describe('Quand la liste des annonces est en cours de chargement', () => {
    it('Affiche un skeleton', () => {
	  spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

	  render(<ListeDesAnnonces
        isLoading={true}
        resultats={<TestComponent/> as React.ReactNode}
        pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3}/>  as React.ReactNode}
	  />);

      const skeletonList = screen.getByLabelText('...En cours de chargement');
      expect(skeletonList).toBeInTheDocument();
      
    });
  });

  describe('Quand la liste des annonces est chargée', () => {
    describe('Quand le nombre d‘annonces est inférieur au maximum à afficher', () => {
	  it('Affiche une liste d‘annonces sans pagination', () => {
        spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

        render(<ListeDesAnnonces
		  isLoading={false}
		  resultats={<TestComponent/> as React.ReactNode}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3}/>  as React.ReactNode}
        />);

        const annoncesDeLogementList = screen.getByLabelText('Annonces de logement');
        expect(annoncesDeLogementList).toBeInTheDocument();

        const skeletonList = screen.queryByLabelText('...En cours de chargement');
        expect(skeletonList).not.toBeInTheDocument();

        const pagination = screen.queryByLabelText('pagination');
        expect(pagination).not.toBeInTheDocument();
	  });
    });


    describe("Quand le nombre d'annonces est supérieur au maximum à afficher", () => {
	  it('Affiche une liste d‘annonces avec pagination', () => {
        spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 4 }));
        render(<ListeDesAnnonces
		  isLoading={false}
		  resultats={<TestComponent/> as React.ReactNode}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3}/>  as React.ReactNode}
        />);

        const annoncesDeLogementList = screen.getByLabelText('Annonces de logement');
        expect(annoncesDeLogementList).toBeInTheDocument();

        const skeletonList = screen.queryByLabelText('...En cours de chargement');
        expect(skeletonList).not.toBeInTheDocument();

        const pagination = screen.getByLabelText('pagination');
        expect(pagination).toBeInTheDocument();
	  });
    });
  });

});
