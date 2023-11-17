/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage } from '~/client/components/window.mock';

describe('BackButton', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('Lorsque la variable PREVIOUS_PAGE est définie dans le sessionStorage', () => {
		it('affiche le bouton de retour', () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: jest.fn().mockReturnValue('/page-1'),
			});

			// When
			render(<BackButton />);

			// Then
			expect(screen.getByRole('button', { name: 'Retour vers la page précédente' })).toBeInTheDocument();
		});
	});
	describe('Lorsque la variable PREVIOUS_PAGE n’est pas définie dans le sessionStorage', () => {
		it('n’affiche pas le bouton de retour', () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: jest.fn().mockReturnValue(null),
			});

			// When
			render(<BackButton />);

			// Then
			expect(screen.queryByRole('button', { name: 'Retour vers la page précédente' })).not.toBeInTheDocument();
		});
		describe('Lorsque alwaysDisplay est à true', () => {
			it('affiche le bouton de retour', () => {
				// Given
				mockUseRouter({});
				mockSessionStorage({
					getItem: jest.fn().mockReturnValue(null),
				});

				// When
				render(<BackButton alwaysDisplay={true} />);

				// Then
				expect(screen.getByRole('button', { name: 'Retour vers la page précédente' })).toBeInTheDocument();
			});
		});
	});
});
