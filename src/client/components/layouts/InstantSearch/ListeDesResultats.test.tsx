/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import React from 'react';

import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { ListeDesResultats } from '~/client/components/layouts/InstantSearch/ListeDesResultats';
import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { mockUsePagination } from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyedPagination = jest.spyOn(require('react-instantsearch-hooks-web'), 'usePagination');

const TestComponent = () => {
	return (
		<ol aria-label="Résultats de recherche">
	  <li>
		Un résultat de recherche
	  </li>
		</ol>
	);
};

describe('ListeDesResultats Component', () => {
	beforeEach(() => {
		mockLargeScreen();
	});

	describe('Quand la liste des résultats est en cours de chargement', () => {
		it('Affiche un skeleton', () => {
	  spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

	  render(<ListeDesResultats
				isLoading={true}
				resultats={<TestComponent/>}
				pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3} onPageChange={() => (void 0)}/>  as React.ReactNode}
				isAffichageListeDeResultatsDesktopDirectionRow={true}
				skeletonRepeat={2}
	  />);

	  const skeletonList = screen.getByLabelText('...En cours de chargement');
	  expect(skeletonList).toBeInTheDocument();

	  const annoncesDeLogementList = screen.queryByLabelText('Résultats de recherche');
	  expect(annoncesDeLogementList).not.toBeInTheDocument();

		});

		describe('quand les résultats prennent toute la largeur de l‘écran', () => {
	  it('affiche le skeleton avec un résulat par ligne (en direction column)', () => {
				spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

				render(<ListeDesResultats
		  isLoading={true}
		  resultats={<TestComponent/>}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3} onPageChange={() => (void 0)}/>  as React.ReactNode}
		  isAffichageListeDeResultatsDesktopDirectionRow={true}
		  skeletonRepeat={4}
				/>);

				const skeletonList = screen.getByLabelText('...En cours de chargement');
				expect(skeletonList).toBeInTheDocument();
				const numberOfSkeleton = within(skeletonList).getAllByRole('listitem');
				expect(numberOfSkeleton.length).toEqual(4);
	  });

	  it('affiche le skeleton avec deux résultats', () => {
				spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

				render(<ListeDesResultats
		  isLoading={true}
		  resultats={<TestComponent/>}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3} onPageChange={() => (void 0)}/>  as React.ReactNode}
		  isAffichageListeDeResultatsDesktopDirectionRow={true}
		  skeletonRepeat={2}
				/>);

				const skeletonList = screen.getByLabelText('...En cours de chargement');
				const numberOfSkeleton = within(skeletonList).getAllByRole('listitem');
				expect(numberOfSkeleton.length).toEqual(2);
				expect(skeletonList).not.toHaveClass('skeletonAffichageDesktopDirectionRow');
	  });
		});

		describe('quand les résultats ne prennent pas toute la largeur de l‘écran', () => {
	  it('affiche le skeleton avec 3 résultats par ligne', () => {
				spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

				render(<ListeDesResultats
		  isLoading={true}
		  resultats={<TestComponent/>}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3} onPageChange={() => (void 0)}/>  as React.ReactNode}
		  isAffichageListeDeResultatsDesktopDirectionRow={false}
		  skeletonRepeat={3}
				/>);

				const skeletonList = screen.getByLabelText('...En cours de chargement');
				expect(skeletonList).toBeInTheDocument();

				const numberOfSkeleton = within(skeletonList).getAllByRole('listitem');
				expect(numberOfSkeleton.length).toEqual(3);
				expect(skeletonList).toHaveClass('skeletonAffichageDesktopDirectionRow');
	  });
		});
	});

	describe('Quand la liste des résultats est chargée', () => {
		describe('Quand le nombre de résultats est inférieur au maximum à afficher', () => {
	  it('Affiche une liste de résultats sans pagination', () => {
				spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 2 }));

				render(<ListeDesResultats
		  isLoading={false}
		  resultats={<TestComponent/>}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3} onPageChange={() => (void 0)}/>  as React.ReactNode}
		  isAffichageListeDeResultatsDesktopDirectionRow={true}
		  skeletonRepeat={2}
				/>);

				const annoncesDeLogementList = screen.getByLabelText('Résultats de recherche');
				expect(annoncesDeLogementList).toBeInTheDocument();

				const skeletonList = screen.queryByLabelText('...En cours de chargement');
				expect(skeletonList).not.toBeInTheDocument();

				const pagination = screen.queryByRole('navigation', { name: 'pagination' });
				expect(pagination).not.toBeInTheDocument();
	  });
		});

		describe('Quand le nombre de résultats est supérieur au maximum à afficher', () => {
	  it('Affiche une liste de résultats avec pagination', () => {
				spyedPagination.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 4 }));
				render(<ListeDesResultats
		  isLoading={false}
		  resultats={<TestComponent/>}
		  pagination={<MeiliSearchCustomPagination numberOfResultPerPage={3} onPageChange={() => (void 0)}/>  as React.ReactNode}
		  isAffichageListeDeResultatsDesktopDirectionRow={true}
		  skeletonRepeat={2}
				/>);

				const annoncesDeLogementList = screen.getByLabelText('Résultats de recherche');
				expect(annoncesDeLogementList).toBeInTheDocument();

				const skeletonList = screen.queryByLabelText('...En cours de chargement');
				expect(skeletonList).not.toBeInTheDocument();

				const pagination = screen.getByRole('navigation', { name: 'pagination' });
				expect(pagination).toBeInTheDocument();
	  });
		});

		it('affiche la note de bas de page sur les partenaires', async () => {
			render(<ListeDesResultats
				isLoading={false}
				resultats={<div />}
				pagination={<MeiliSearchCustomPagination numberOfResultPerPage={1} onPageChange={() => (void 0)}/>}
				isAffichageListeDeResultatsDesktopDirectionRow={true}
				skeletonRepeat={2}
			/>);

			const mention = screen.getByText(/les annonces listées ci-dessus nous sont fournies par nos partenaires/);
			expect(mention).toBeVisible();
			const lienCGU = within(mention).getByRole('link', { name: 'liste disponible dans les CGU' });
			expect(lienCGU).toHaveAttribute('href', '/cgu#3-services');
		});
		it('ajoute une abréviation sur les CGU', async () => {
			render(<ListeDesResultats
				isLoading={false}
				resultats={<div />}
				pagination={<MeiliSearchCustomPagination numberOfResultPerPage={1} onPageChange={() => (void 0)}/>}
				isAffichageListeDeResultatsDesktopDirectionRow={true}
				skeletonRepeat={2}
			/>);

			const abreviation = screen.getByText('CGU');
			expect(abreviation).toHaveAccessibleName("Conditions Générales d'Utilisation");
		});
	});

});
