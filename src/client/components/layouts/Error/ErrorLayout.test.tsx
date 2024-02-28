/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ErrorLayout } from '~/client/components/layouts/Error/ErrorLayout';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aBackButtonPersistenceService,
} from '~/client/services/backButtonPersistence/backButtonPersistence.service.fixture';

describe('ErrorLayout', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
		mockSessionStorage({
			getItem: jest.fn().mockReturnValue('/'),
		});
	});
	it('affiche le bouton de retour à la page précédente', () => {
		const backButtonPersistenceService = aBackButtonPersistenceService({
			getPreviousPath: jest.fn().mockReturnValue('/'),
		});
		render(<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}><ErrorLayout><p>children</p></ErrorLayout></DependenciesProvider>);
		expect(screen.getByRole('button', { name: 'Retourner à la page précédente' })).toBeVisible();
	});
	it('affiche le bouton de retour vers la page d‘accueil', () => {
		render(<DependenciesProvider backButtonPersistenceService={aBackButtonPersistenceService()}><ErrorLayout><p>children</p></ErrorLayout></DependenciesProvider>);
		expect(screen.getByRole('link', { name: 'Aller à l‘accueil' })).toBeVisible();
	});
});
