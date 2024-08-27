/**
 * @jest-environment jsdom
 */
import {
	render,
	screen,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { MeilisearchCheckboxList } from '~/client/components/ui/Meilisearch/MeilisearchCheckboxList/MeilisearchCheckboxList';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/mockMeilisearchUseFunctions';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

let refineMock: jest.Mock<string>;

describe('<MeilisearchCheckboxList/>', () => {
	beforeEach(() => {
		// GIVEN
		refineMock = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
	  items: [
				generateRefinementListItem({ label: 'studio', value: 'studio' }),
				generateRefinementListItem({ label: 'T1', value: 'T1' }),
				generateRefinementListItem({ label: 'T2', value: 'T2' }),
	  ]
	  ,
	  refine: refineMock,
		}));
	});

	it('affiche la liste des checkbox', async () => {
		render(<MeilisearchCheckboxList attribute='test' label='test' />);

		const optionList = screen.getAllByRole('checkbox');
		expect(optionList).toHaveLength(3);
	});

	describe('Quand l’utilisateur clique sur le label correspondant au texte "studio"', () => {
		it('appelle la méthode refine une fois', async () => {
	  const user = userEvent.setup();

	  render(<MeilisearchCheckboxList attribute='test' label='test' />);

	  const option = screen.getByLabelText('Studio');
	  await user.click(option);

	  expect(refineMock).toHaveBeenCalledTimes(1);
		});

		it('appelle la méthode refine avec la valeur "studio"', async () => {
	  const user = userEvent.setup();
	  render(<MeilisearchCheckboxList attribute='test' label='test' />);

	  const option = screen.getByLabelText('Studio');
	  await user.click(option);

	  expect(refineMock).toHaveBeenCalledWith('studio');
		});
	});

	describe('lorsque la liste des suggestions est vide', () => {
		beforeEach(() => {
			refineMock = jest.fn();
			spyed
				.mockImplementation(() => mockUseRefinementList({
					items: [],
					refine: refineMock,
				}));
		});
		it('affiche un message informatif dans à la place de la liste de suggestions', async () => {
			render(<MeilisearchCheckboxList attribute='test' label='test' />);
			const messageInformatif = screen.getByText('Malheureusement ce champ de recherche ne peut pas être affiché pour le moment.');
			expect(messageInformatif).toBeInTheDocument();
		});
	});

});
