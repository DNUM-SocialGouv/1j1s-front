/**
 @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { NavItemWithSubItems } from './NavItemWithSubItems';

jest.mock('next/router', () => ({
	useRouter() {
		return {
			pathname: '/',
		};
	},
}));

const mockNavigationItemWithChildren = {
	children: [
		{ label: 'Sub Item 1', link: '/sub1' },
		{ label: 'Sub Item 2', link: '/sub2' },
	],
	label: 'Test Menu',
};

describe('NavItemWithSubItems', () => {
	it('doit rendre le bouton lié au menu', () => {
		render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
		
		expect(screen.getByRole('button', { name: 'Test Menu' })).toBeInTheDocument();
	});

	describe('lorsque je clique sur le bouton du menu', () => {
		it('doit jongler sur la visibilité du menu au clic', () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
      
			fireEvent.click(menuButton);
			expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
      
			fireEvent.click(menuButton);
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});

		it('doit appeler la fonction onClick', () => {
			const mockOnClick = jest.fn();
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} onClick={mockOnClick} />);
      
			fireEvent.click(screen.getByRole('button', { name: 'Test Menu' }));
			fireEvent.click(screen.getByText('Sub Item 1'));
      
			expect(mockOnClick).toHaveBeenCalledTimes(1);
		});

		it('doit afficher l‘attribut aria-expanded attribute correctement', () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
      
			expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
			fireEvent.click(menuButton);
			expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		});

		it('doit afficher l‘attribut aria-current attribute à false', () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			fireEvent.click(menuButton);


			const linkMenu = screen.getByText('Sub Item 1');

			expect(linkMenu).toHaveAttribute('aria-current', 'false');
		});
	});

	it('doit fermer le sous-menu lorsque le focus n‘y est plus', () => {
		const { container } = render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

		const menuButton = screen.getByRole('button', { name: 'Test Menu' });
		fireEvent.click(menuButton);

		expect(screen.getByText('Sub Item 1')).toBeInTheDocument();

		fireEvent.focusIn(container);

		expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
	});

	it('ne doit pas fermer le sous-menu si le focus y est', () => {
		render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

		const menuButton = screen.getByRole('button', { name: 'Test Menu' });
		fireEvent.click(menuButton);

		expect(screen.getByText('Sub Item 1')).toBeInTheDocument();

		const subItem = screen.getByText('Sub Item 2');
		fireEvent.focusIn(subItem);

		expect(screen.getByText('Sub Item 2')).toBeInTheDocument();
	});

	describe('lorsque j‘appuis sur la touche ECHAP', () => {
		it('doit fermer le sous-menu', () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			fireEvent.click(screen.getByRole('button', { name: 'Test Menu' }));
			expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
      
			fireEvent.keyUp(document, { key: 'Escape' });
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});
  
	describe('lorsque je clique en dehors du sous-menu', () => {
		it('doit fermer le sous-menu', () => {
			render(
				<div>
					<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />
					<div data-testid="outside">Outside</div>
				</div>,
			);
    
			fireEvent.click(screen.getByRole('button', { name: 'Test Menu' }));
			expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    
			fireEvent.mouseUp(screen.getByTestId('outside'));
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});
});
