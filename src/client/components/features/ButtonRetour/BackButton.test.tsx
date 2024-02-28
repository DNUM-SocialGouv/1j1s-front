/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aBackButtonPersistenceService,
} from '~/client/services/backButtonPersistence/backButtonPersistence.service.fixture';

describe('BackButton', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('Lorsque le chemin précedent est définie dans le service de persistence', () => {
		it('affiche le bouton de retour', () => {
			// Given
			mockUseRouter({});
			const backButtonPersistenceService = aBackButtonPersistenceService({
				getPreviousPath: jest.fn().mockReturnValue('/previous-page'),
			});

			// When
			render(
				<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}>
					<BackButton />
				</DependenciesProvider>,
			);

			// Then
			expect(screen.getByRole('button', { name: 'Retour vers la page précédente' })).toBeInTheDocument();
		});
	});
	describe('Lorsque le chemin précedent n’est pas définie dans le service de persistence', () => {
		it('n’affiche pas le bouton de retour', () => {
			// Given
			mockUseRouter({});
			const backButtonPersistenceService = aBackButtonPersistenceService({
				getPreviousPath: jest.fn().mockReturnValue(null),
			});

			// When
			render(
				<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}>
					<BackButton />
				</DependenciesProvider>,
			);

			// Then
			expect(screen.queryByRole('button', { name: 'Retour vers la page précédente' })).not.toBeInTheDocument();
		});
	});
});
