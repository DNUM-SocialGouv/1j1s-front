/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import { mockScrollBy } from '~/client/components/window.mock';

const itemList = [
	React.createElement('h1'),
	React.createElement('h2'),
	React.createElement('h3'),
];

describe('SeeMore component', () => {
	beforeEach(() => {
		mockScrollBy();
	});

	describe('Lorsque le nombre d‘élements à afficher est supérieur à la taille totale des éléments', () => {
		it('n‘affiche pas de bouton pour déplier l‘accordéon', () => {
			render(<SeeMoreItemList itemList={itemList} numberOfVisibleItems={4} seeMoreAriaLabel={''} seeLessAriaLabel={''} />);
			const button = screen.queryByRole('button');

			expect(button).not.toBeInTheDocument();
		});
	});
	describe('Lorsque le nombre d‘élements à afficher est égal à la taille totale des éléments', () => {
		it('n‘affiche pas de bouton pour déplier l‘accordéon', () => {
			render(<SeeMoreItemList itemList={itemList} numberOfVisibleItems={3} seeMoreAriaLabel={''} seeLessAriaLabel={''} />);
			const button = screen.queryByRole('button');

			expect(button).not.toBeInTheDocument();
		});
	});
	describe('Lorsque le nombre d‘élements à afficher est inférieur à la taille totale des éléments', () => {
		it('affiche pas de bouton pour déplier l‘accordéon', () => {
			render(<SeeMoreItemList itemList={itemList} numberOfVisibleItems={2} seeMoreAriaLabel={''} seeLessAriaLabel={''} />);
			const button = screen.getByRole('button');

			expect(button).toBeInTheDocument();
		});

		it('n‘affiche que les premiers élements visibles', () => {
			render(<SeeMoreItemList itemList={itemList} numberOfVisibleItems={2} seeMoreAriaLabel={''} seeLessAriaLabel={''} />);
			const firstItem = screen.getByRole('heading', { level: 1 });
			const secondItem = screen.getByRole('heading', { level: 2 });
			const thirdItem = screen.queryByRole('heading', { level: 3 });

			expect(firstItem).toBeInTheDocument();
			expect(secondItem).toBeInTheDocument();
			expect(thirdItem).not.toBeInTheDocument();
		});

		describe('Au clic sur le bouton dépliant', () => {
			it('affiche l‘ensemble des éléments', async () => {
				const user = userEvent.setup();
				render(<SeeMoreItemList itemList={itemList} numberOfVisibleItems={2} seeMoreAriaLabel={''} seeLessAriaLabel={''} />);
				const button = screen.getByRole('button');
				await user.click(button);
				const items = screen.getAllByRole('heading');

				expect(items[0]).toBeInTheDocument();
				expect(items[1]).toBeInTheDocument();
				expect(items[2]).toBeInTheDocument();
			});

			describe('Au clic à nouveau sur le bouton dépliant', () => {
				it('n‘affiche que les premiers éléments visibles', async () => {
					const user = userEvent.setup();
					render(<SeeMoreItemList itemList={itemList} numberOfVisibleItems={2} seeMoreAriaLabel={''} seeLessAriaLabel={''} />);
					const button = screen.getByRole('button');
					await user.dblClick(button);
					const firstItem = screen.getByRole('heading', { level: 1 });
					const secondItem = screen.getByRole('heading', { level: 2 });
					const thirdItem = screen.queryByRole('heading', { level: 3 });

					expect(firstItem).toBeInTheDocument();
					expect(secondItem).toBeInTheDocument();
					expect(thirdItem).not.toBeInTheDocument();
				});
			});
		});
	});
});
