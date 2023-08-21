/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import useSanitize from '~/client/hooks/useSanitize';

function setupUseSanitize(dirtyContent?: string, shouldReplaceCarriageReturn?: boolean): string {
	let hookUnderTest = '';
	function TestComponent() {
		hookUnderTest = useSanitize(dirtyContent, shouldReplaceCarriageReturn);
		return null;
	}
	render(<TestComponent />);
	return hookUnderTest;
}

describe('useSanitize', () => {
	describe('quand il y a du contenu à purifier', () => {
		it('purifie le contenu html', () => {
			// GIVEN
			const dirtyContent = "<a href='javascript:alert(1)'>I am a dolphin!</a>";

			// WHEN
			const sanitizedContent = setupUseSanitize(dirtyContent);

			// THEN
			expect(sanitizedContent).toBe('<a>I am a dolphin!</a>');
		});

		it('remplace les retours chariot par une balise br par défaut', () => {
			// GIVEN
			const dirtyContentWithCarriageReturn = '<p>I am a dolphin!</p>\n<p>And I like swimming</p>';

			// WHEN
			const sanitizedContent = setupUseSanitize(dirtyContentWithCarriageReturn);

			// THEN
			expect(sanitizedContent).toBe('<p>I am a dolphin!</p><br><p>And I like swimming</p>');
		});

		it('ne remplace pas les retours chariot par une balise br quand ce n’est pas demandé', () => {
			// GIVEN
			const dirtyContentWithCarriageReturn = '<p>I am a dolphin!</p>\n<p>And I like swimming</p>';

			// WHEN
			const sanitizedContent = setupUseSanitize(dirtyContentWithCarriageReturn, false);

			// THEN
			expect(sanitizedContent).toBe('<p>I am a dolphin!</p>\n<p>And I like swimming</p>');
		});
	});

	it('quand il n’y a pas de contenu à purifier, renvoie une chaîne vide', () => {
		// WHEN
		const sanitizedContent = setupUseSanitize();

		// THEN
		expect(sanitizedContent).toBe('');
	});
});
