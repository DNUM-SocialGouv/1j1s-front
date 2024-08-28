/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import MeilisearchTagsList from '~/client/components/ui/Meilisearch/MeilisearchTagsList/MeilisearchTagsList';
import {
	aDisjunctiveImmeubleItemRefinement,
	aTypeBienItem,
	mockUseCurrentRefinements,
} from '~/client/components/ui/Meilisearch/mockMeilisearchUseFunctions';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const spyOnUseCurrentRefinements = jest.spyOn(require('react-instantsearch'), 'useCurrentRefinements');

let refineMock: jest.Mock<string>;

describe('MeilisearchTagsList', () => {
	describe('quand il n‘y a pas d‘étiquettes à afficher', () => {
		it('ne retourne pas de liste', () => {
		  spyOnUseCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements({
				items: [],
				refine: refineMock,
		  }));
		  render(<MeilisearchTagsList />);
		  const currentRefinements = screen.queryByRole('list');

		  expect(currentRefinements).not.toBeInTheDocument();
		});
	});

	describe('quand il y a des étiquettes à afficher', () => {
		it("retourne une liste d'étiquettes avec le label capitalisé", () => {
	  spyOnUseCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements({
				items: [aTypeBienItem()],
	  }));
	  render(<MeilisearchTagsList />);
	  const currentRefinements = screen.getByRole('list');

	  expect(currentRefinements).toBeInTheDocument();

	  const currentRefinementsItems = within(currentRefinements).getAllByRole('listitem');

	  expect(currentRefinementsItems[0]).toBeInTheDocument();
	  expect(currentRefinementsItems[0]).toHaveTextContent('Immeuble');
		});

	  it('contient un button reset dans l‘étiquette', () => {
			spyOnUseCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements({
		  items: [aTypeBienItem()],
			}));
			render(<MeilisearchTagsList />);
			const currentRefinements = screen.getByRole('list');

			expect(currentRefinements).toBeInTheDocument();

			const currentRefinementsItems = within(currentRefinements).getAllByRole('listitem');

			const resetButton = within(currentRefinementsItems[0]).getByRole('button');
			expect(resetButton).toBeInTheDocument();
	  });

	  it('supprime l‘étiquette au clic sur le bouton', async () => {
	    refineMock = jest.fn();
			spyOnUseCurrentRefinements.mockImplementation(() => mockUseCurrentRefinements({
		  items: [aTypeBienItem()],
		  refine: refineMock,
			}));
			const user = userEvent.setup();
			render(<MeilisearchTagsList />);
			const currentRefinements = screen.getByRole('list');

			expect(currentRefinements).toBeInTheDocument();

			const currentRefinementsItems = within(currentRefinements).getAllByRole('listitem');
			const resetButton = within(currentRefinementsItems[0]).getByRole('button');
			await user.click(resetButton);

			expect(refineMock).toHaveBeenCalledTimes(1);
			expect(refineMock).toHaveBeenCalledWith(aDisjunctiveImmeubleItemRefinement());

	  });
	});

});
