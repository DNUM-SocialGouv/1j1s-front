/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RefObject } from 'react';

import Bouée from '~/client/components/ui/Bouée/Bouée';

describe('<Bouée />', () => {
	const label = 'Remonter en haut de la page';
	afterEach(() => jest.resetAllMocks());
	beforeEach(() => {
		window.scrollTo = jest.fn().mockImplementation(() => {
			window.dispatchEvent(new Event('scroll'));
		});
	});

	const DEBOUNCE_DELAY = 50;

	function mockSurface (initialY=20): [RefObject<HTMLElement>, (y: number) => void] {
		let y = initialY;
		const surface = {
			getBoundingClientRect: jest.fn(() => ({ y } as DOMRect)),
		};
		const surfaceRef: RefObject<HTMLElement> = { current: surface as unknown as HTMLElement };
		const setY = (n: number) => { y=n; };
		return [surfaceRef, setY];
	}

	describe('quand l‘élément étalon est visible', () => {
		it('affiche un lien qui reste invisible', () => {
			// Given
			const [surfaceRef] = mockSurface();

			// When
			render(<Bouée surface={ surfaceRef }/>);
			
			// Then
			const link = screen.getByRole('link', { hidden: true, name: label });
			expect(link).toHaveAttribute('href', '#skip-link-list');
			expect(link).not.toBeVisible();
		});

		describe('quand on scroll vers le bas', () => {
			it('affiche le lien', async () => {
				// Given
				const [surfaceRef, setY] = mockSurface();

				// When
				render(<Bouée surface={ surfaceRef }/>);
				setY(-100);
				await act(async () => {
					window.scrollTo({ top: 200 });
					await delay(DEBOUNCE_DELAY);
				});
				
				// Then
				const link = screen.getByRole('link', { name: label });
				expect(link).toBeVisible();
			});

			describe('quand on clique sur le lien', () => {
				it('scrolle jusqu‘à l‘élément étalon', async () => {
					// Given
					const [ surfaceRef, setY] = mockSurface();

					// When
					render(<Bouée surface={ surfaceRef }/>);
					setY(-100);
					await act(async () => {
						window.scrollTo({ top: 200 });
						await delay(DEBOUNCE_DELAY);
					});

					const link = screen.getByRole('link', { name: label });
					await userEvent.click(link);

					// Then
					expect(window.scrollY).toEqual(0);
					expect(window.scrollTo).toHaveBeenNthCalledWith(2, { behavior: 'smooth', top: 0 });
				});
			});
		});
	});

	describe('quand l‘élement étalon n‘est plus visible', () => {
		it('affiche un lien visible', async () => {
			// Given
			const [surfaceRef] = mockSurface(-100);

			// When
			render(<Bouée surface={ surfaceRef }/>);
			await act(() => delay(DEBOUNCE_DELAY));

			// Then
			const link = screen.getByRole('link', { name: label });

			expect(link).toBeVisible();
		});
	});
});


function delay (ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
