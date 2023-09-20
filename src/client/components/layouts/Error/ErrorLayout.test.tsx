/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ErrorLayout } from '~/client/components/layouts/Error/ErrorLayout';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage, mockSmallScreen } from '~/client/components/window.mock';

describe('ErrorLayout', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
		mockSessionStorage({
			getItem: jest.fn().mockReturnValue('/'),
		});
	});
	it('affiche le bouton de retour à la page précédente', () => {
		render(<ErrorLayout><p>children</p></ErrorLayout>);
		expect(screen.getByRole('button', { name: 'Retourner à la page précédente' })).toBeVisible();
	});
	it('affiche le bouton de retour vers la page d‘accueil', () => {
		render(<ErrorLayout><p>children</p></ErrorLayout>);
		expect(screen.getByRole('link', { name: 'Retourner à l‘accueil' })).toBeVisible();
	});
});
