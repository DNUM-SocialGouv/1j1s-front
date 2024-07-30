/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';

describe('BackButton', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('Lorsque la variable IS_PREVIOUS_PAGE_LOCAL est définie dans le sessionStorage', () => {
		it('affiche le bouton de retour avec le role link', () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: jest.fn().mockReturnValue('/page-1'),
			});

			// When
			render(<DependenciesProvider sessionStorageService={aStorageService({ get: jest.fn().mockReturnValue(true) })}><BackButton/></DependenciesProvider>);

			// Then
			expect(screen.getByRole('link', { name: 'Retour vers la page précédente' })).toBeInTheDocument();
		});
	});
	describe('Lorsque la variable IS_PREVIOUS_PAGE_LOCAL n’est pas définie dans le sessionStorage', () => {
		it('n’affiche pas le bouton de retour', () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: jest.fn().mockReturnValue(null),
			});

			// When
			render(<DependenciesProvider sessionStorageService={aStorageService()}><BackButton/></DependenciesProvider>);

			// Then
			expect(screen.queryByRole('link', { name: 'Retour vers la page précédente' })).not.toBeInTheDocument();
		});
	});
});
