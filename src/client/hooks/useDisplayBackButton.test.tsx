/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import useDisplayBackButton, { IS_PREVIOUS_PAGE_LOCAL } from '~/client/hooks/useDisplayBackButton';

function TestComponent() {
	useDisplayBackButton();
	return <></>;
}

describe('useDisplayBackButton', () => {
	beforeEach(() => {
		sessionStorage.clear();
		jest.resetAllMocks();
	});
	describe('quand on quitte la page', () => {
		it('stocke le pathname de la page dans sessionStorage', () => {
			// Given
			mockUseRouter({
				pathname: '/other-page',
			});
			const setItem = jest.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem');
			const { unmount } = render(<TestComponent />);

			// When
			unmount();

			// Then
			expect(setItem).toHaveBeenCalledWith(IS_PREVIOUS_PAGE_LOCAL, 'true');
		});
	});
});
