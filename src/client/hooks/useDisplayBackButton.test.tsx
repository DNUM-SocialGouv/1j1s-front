/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import useDisplayBackButton from '~/client/hooks/useDisplayBackButton';

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
			const setItem = jest.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem');
			jest.spyOn(Object.getPrototypeOf(sessionStorage), 'getItem').mockReturnValue(null);

			// When
			render(<TestComponent />);

			// Then
			expect(setItem).toHaveBeenCalledWith('current-page', '/');
		});
	});

	describe('quand la page actuel n’est pas la première sur laquelle on navigue', () => {
		it('stocke le pathname de la page dans sessionStorage', () => {
			// Given
			mockUseRouter({
				pathname: '/other-page',
			});
			const setItem = jest.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem');
			jest.spyOn(Object.getPrototypeOf(sessionStorage), 'getItem').mockReturnValue('/');

			// When
			render(<TestComponent />);

			// Then
			expect(setItem).toHaveBeenCalledWith('previous-page', '/');
			expect(setItem).toHaveBeenLastCalledWith('current-page', '/other-page');
		});
	});
});
