/**
 @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { fireEvent,render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

import { NavItemWithSubItems } from './NavItemWithSubItems';

jest.mock('next/router', () => ({
	useRouter() {
		return {
			pathname: '/',
			push: jest.fn(),
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
		
		expect(screen.getByRole('button', { name: 'Test Menu' })).toBeVisible();
	});

	describe('lorsque je clique sur le bouton du menu', () => {
		it('doit afficher l‘attribut aria-expanded correctement', async () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
      
			expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
			await userEvent.click(menuButton);
			expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		});

		it('doit jongler sur la visibilité du menu au clic', async () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
      
			await userEvent.click(menuButton);
			expect(screen.getByRole('link', { name: 'Sub Item 1' })).toBeVisible();
      
			await userEvent.click(menuButton);

			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});

		it('appelle onClick une fois lorsqu‘un élément du sous-menu est cliqué', async () => {
			const mockOnClick = jest.fn();
			render(
				<NavItemWithSubItems 
					navigationItemWithChildren={mockNavigationItemWithChildren} 
					onClick={mockOnClick}
				/>,
			);
	
			const button = screen.getByRole('button', { name: 'Test Menu' });
			fireEvent.click(button);
	
			const subItem = screen.getByText('Sub Item 1');
			fireEvent.click(subItem);
	
			expect(mockOnClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('lorsque la page du sous-menu est visité', () => {
		it('doit afficher l‘attribut aria-current à true', async () => {
			const { rerender } = render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
    
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			await userEvent.click(menuButton);

			const linkMenu = screen.getByRole('link', { name: 'Sub Item 1' });
    
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
				pathname: '/sub1',
				push: jest.fn(),
			}));

			rerender(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

			await waitFor(() => {
				expect(linkMenu).toHaveAttribute('aria-current', 'true');
			});
		});
	});

	describe('lorsque la page du sous-menu n‘est pas est visité', () => {
		it('doit afficher l‘attribut aria-current à false', async () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
		
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			await userEvent.click(menuButton);


			const linkMenu = screen.getByRole('link', { name: 'Sub Item 1' });

			expect(linkMenu).toHaveAttribute('aria-current', 'false');
		});
	});

	describe('lorsque le focus n‘est plus dans le sous menu', () => {
		it('doit le fermer', async () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

			const button = screen.getByRole('button', { name: 'Test Menu' });
			await userEvent.click(button);

			expect(screen.getByRole('link', { name: 'Sub Item 1' })).toBeVisible();

			fireEvent.blur(button);

			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});

	describe('lorsque le focus est dans le sous menu', () => {
		it('ne doit pas fermer le sous-menu', async () => {
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			await userEvent.click(menuButton);

			expect(screen.getByRole('link', { name: 'Sub Item 1' })).toBeVisible();

			const subItem = screen.getByText('Sub Item 2');
			fireEvent.focusIn(subItem);

			expect(screen.getByText('Sub Item 2')).toBeVisible();
		});
	});

	describe('lorsque j‘appuis sur la touche ECHAP', () => {
		it('doit fermer le sous-menu', async () => {
			const user = userEvent.setup();
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			
			await userEvent.click(screen.getByRole('button', { name: 'Test Menu' }));
			expect(screen.getByRole('link', { name: 'Sub Item 1' })).toBeVisible();
      
			await user.keyboard(`{${KeyBoard.ESCAPE}}`);
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});

	describe('lorsque je clique en dehors du sous-menu', () => {
		it('doit être fermer', async () => {
			render(
				<div>
					<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />
					<div data-testid="outside">Outside</div>
				</div>,
			);
    
			await userEvent.click(screen.getByRole('button', { name: 'Test Menu' }));
			expect(screen.getByRole('link', { name: 'Sub Item 1' })).toBeVisible();
    
			fireEvent.mouseUp(screen.getByTestId('outside'));
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});
});
