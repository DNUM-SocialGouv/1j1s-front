/**
 @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useRouter } from 'next/router';
import React from 'react';

import { NavDesktopEmployeur } from './NavDesktopEmployeur';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('NavDesktopEmployeur', () => {
	const mockItem = {
		children: [
			{
				label: 'Sous-section 1',
				link: '/employeurs/sous-section-1',
			},
			{
				label: 'Sous-section 2',
				link: '/employeurs/sous-section-2',
			},
		],
		label: 'Employeurs',
	};

	beforeEach(() => {
		mockUseRouter.mockReturnValue({
			pathname: '/',
		} as ReturnType<typeof useRouter>);
	});

	it('doit afficher le label sur le bouton du menu principal', () => {
		render(<NavDesktopEmployeur item={mockItem} />);

		expect(screen.getByRole('button', { name: 'Employeurs' })).toBeVisible();
	});

	it("doit ouvrir le sous-menu lorsqu'on clique sur le bouton principal", async () => {
		render(<NavDesktopEmployeur item={mockItem} />);

		const button = screen.getByRole('button');
		await userEvent.click(button);

		expect(screen.getByRole('link', { name: 'Sous-section 1' })).toBeVisible();
	});

	it("doit fermer le sous-menu lorsqu'on clique à nouveau sur le bouton principal", async () => {
		render(<NavDesktopEmployeur item={mockItem} />);

		const button = screen.getByRole('button');

		await userEvent.click(button);
		expect(screen.getByRole('link', { name: 'Sous-section 1' })).toBeInTheDocument();

		await userEvent.click(button);
		expect(screen.getByText('Sous-section 1')).toBeVisible();
	});

	it('doit afficher correctement la structure du menu', async () => {
		render(<NavDesktopEmployeur item={mockItem} />);

		const button = screen.getByRole('button');
		await userEvent.click(button);

		expect(screen.getByRole('link', { name:'Sous-section 1' })).toBeVisible();
		expect(screen.getByRole('link', { name: 'Sous-section 2' })).toBeVisible();
	});
});
