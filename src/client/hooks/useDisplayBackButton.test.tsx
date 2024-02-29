/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import useDisplayBackButton from '~/client/hooks/useDisplayBackButton';
import {
	aBackButtonPersistenceService,
} from '~/client/services/backButtonPersistence/backButtonPersistence.service.fixture';

function TestComponent() {
	useDisplayBackButton();
	return <></>;
}

describe('useDisplayBackButton', () => {
	beforeEach(() => {
		sessionStorage.clear();
		jest.resetAllMocks();
	});
	describe('quand la page actuel est la première sur laquelle on navigue', () => {
		it('stocke le pathname de la page dans sessionStorage', () => {
			// Given
			mockUseRouter({
				pathname: '/',
			});
			const backButtonPersistenceService = aBackButtonPersistenceService();

			// When
			render(<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}><TestComponent /></DependenciesProvider>);

			// Then
			expect(backButtonPersistenceService.setCurrentPath).toHaveBeenCalledWith('/');
		});
	});

	describe('quand la page actuel n’est pas la première sur laquelle on navigue', () => {
		it('stocke le pathname de la page dans sessionStorage', () => {
			// Given
			mockUseRouter({
				pathname: '/other-page',
			});
			const backButtonPersistenceService = aBackButtonPersistenceService({
				getCurrentPath: jest.fn().mockReturnValue('/'),
			});

			// When
			render(<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}><TestComponent /></DependenciesProvider>);

			// Then
			expect(backButtonPersistenceService.setPreviousPath).toHaveBeenCalledWith('/');
			expect(backButtonPersistenceService.setCurrentPath).toHaveBeenLastCalledWith('/other-page');
		});
	});
});
