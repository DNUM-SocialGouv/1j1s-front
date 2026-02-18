import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import usePageHistory, { IS_PREVIOUS_PAGE_LOCAL } from '~/client/hooks/usePageHistory';

function TestComponent() {
	usePageHistory();
	return <></>;
}

describe('usePageHistory', () => {
	beforeEach(() => {
		sessionStorage.clear();
		vi.resetAllMocks();
	});
	describe('quand on quitte la page', () => {
		it('stocke le pathname de la page dans sessionStorage', () => {
			// Given
			mockUseRouter({
				pathname: '/other-page',
			});
			const setItem = vi.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem');
			const { unmount } = render(<TestComponent />);

			// When
			unmount();

			// Then
			expect(setItem).toHaveBeenCalledWith(IS_PREVIOUS_PAGE_LOCAL, 'true');
		});
		it('stocke le pathname de la page dans sessionStorage (mode hydratation du contenu)', () => {
			// Given
			mockUseRouter({
				pathname: '/other-page',
			});
			const setItem = vi.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem');
			const { rerender } = render(<TestComponent />);

			// When
			mockUseRouter({
				pathname: '/other-other-page',
			});
			rerender(<TestComponent />);

			// Then
			expect(setItem).toHaveBeenCalledWith(IS_PREVIOUS_PAGE_LOCAL, 'true');
		});
	});
});
