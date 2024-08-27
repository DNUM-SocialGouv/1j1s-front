/**
 @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { fireEvent,render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { mockUseRouter } from '~/client/components/useRouter.mock';

import { NavItemWithSubItems } from './NavItemWithSubItems';

const mockNavigationItemWithChildren = {
	children: [
		{ label: 'Sub Item 1', link: '/sub1' },
		{ label: 'Sub Item 2', link: '/sub2' },
	],
	label: 'Test Menu',
};

describe('NavItemWithSubItems', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			value: { 
				assign: jest.fn(), 
			},
		});
		mockUseRouter({});
	});

	it('doit rendre le bouton du menu', () => {
		render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
		
		expect(screen.getByRole('button', { name: 'Test Menu' })).toBeVisible();
	});

	describe('lorsque je clique sur le bouton du menu', () => {
		it('doit afficher l‘attribut aria-expanded correctement', async () => {
			const user = userEvent.setup();

			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
      
			expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
			await user.click(menuButton);
			expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		});

		it('doit jongler sur la visibilité du menu au clic', async () => {
			const user = userEvent.setup();

			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
      
			await user.click(menuButton);
			expect(screen.getByRole('link', { name: /Sub Item 1/i })).toBeVisible();
      
			await user.click(menuButton);

			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});

		it('lorsque l‘utilisateur clique sur un lien, appelle la props onClick une fois', async () => {
			const mockOnClick = jest.fn();
			const user = userEvent.setup();
				
			render(
				<NavItemWithSubItems 
					navigationItemWithChildren={mockNavigationItemWithChildren} 
					onClick={mockOnClick} />,
			);
		
			const button = screen.getByRole('button', { name: 'Test Menu' });
			await user.click(button);
		
			const subItem = screen.getByRole('link', { name: /Sub Item 1/i });
			await user.click(subItem);
		
			expect(mockOnClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('lorsque la page du sous-menu est visité', () => {
		beforeEach(() => {
			mockUseRouter({ pathname: '/sub1' });
		});

		afterEach(() => {
			mockUseRouter({ pathname: '/' });
		});

		it('doit afficher l‘attribut aria-current à true', async () => {
			const user = userEvent.setup();
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
    
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			await user.click(menuButton);

			const linkMenu = screen.getByRole('link', { name: /Sub Item 1/i });

			expect(linkMenu).toHaveAttribute('aria-current', 'true');
		});
	});

	describe('lorsque la page du sous-menu n‘est pas est visité', () => {
		it('doit afficher l‘attribut aria-current à false', async () => {
			const user = userEvent.setup();

			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
		
			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			await user.click(menuButton);


			const linkMenu = screen.getByRole('link', { name: /Sub Item 1/i });

			expect(linkMenu).toHaveAttribute('aria-current', 'false');
		});
	});

	describe('lorsque le focus n‘est plus dans le sous menu', () => {
		it('doit le fermer', async () => {
			const user = userEvent.setup();

			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

			const button = screen.getByRole('button', { name: 'Test Menu' });
			await user.click(button);

			expect(screen.getByRole('link', { name: /Sub Item 1/i })).toBeVisible();

			fireEvent.blur(button);

			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});

	describe('lorsque le focus est dans le sous menu', () => {
		it('ne doit pas fermer le sous-menu', async () => {
			const user = userEvent.setup();

			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);

			const menuButton = screen.getByRole('button', { name: 'Test Menu' });
			await user.click(menuButton);

			expect(screen.getByRole('link', { name: /Sub Item 1/i })).toBeVisible();

			const subItem = screen.getByRole('link', { name: /Sub Item 2/i });
			fireEvent.focusIn(subItem);

			expect(screen.getByText('Sub Item 2')).toBeVisible();
		});
	});

	describe('lorsque j‘appuis sur la touche ECHAP', () => {
		it('doit fermer le sous-menu', async () => {
			const user = userEvent.setup();
			render(<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />);
			
			await user.click(screen.getByRole('button', { name: 'Test Menu' }));
			expect(screen.getByRole('link', { name: /Sub Item 1/i })).toBeVisible();
      
			await user.keyboard(`{${KeyBoard.ESCAPE}}`);
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});

	describe('lorsque je clique en dehors du sous-menu', () => {
		it('doit être fermer', async () => {
			const user = userEvent.setup();

			render(
				<div>
					<NavItemWithSubItems navigationItemWithChildren={mockNavigationItemWithChildren} />
					<div data-testid="outside">Outside</div>
				</div>,
			);
    
			await user.click(screen.getByRole('button', { name: 'Test Menu' }));
			expect(screen.getByRole('link', { name: /Sub Item 1/i })).toBeVisible();
    
			await user.click(screen.getByTestId('outside'));
			expect(screen.queryByText('Sub Item 1')).not.toBeInTheDocument();
		});
	});
});
