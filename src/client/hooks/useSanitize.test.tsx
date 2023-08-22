/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import useSanitize from '~/client/hooks/useSanitize';

function setupUseSanitize(dirtyContent?: string): string {
	let hookUnderTest = '';
	function TestComponent() {
		hookUnderTest = useSanitize(dirtyContent);
		return null;
	}
	render(<TestComponent />);
	return hookUnderTest;
}

describe('useSanitize', () => {
	it('quand il y a du contenu à purifier, renvoie le contenu purifié', () => {
		// GIVEN
		const dirtyContent = "<a href='javascript:alert(1)'>I am a dolphin!</a>";

		// WHEN
		const sanitizedContent = setupUseSanitize(dirtyContent);

		// THEN
		expect(sanitizedContent).toBe('<a>I am a dolphin!</a>');
	});

	it('quand il n’y a pas de contenu à purifier, renvoie une chaîne vide', () => {
		// WHEN
		const sanitizedContent = setupUseSanitize();

		// THEN
		expect(sanitizedContent).toBe('');
	});
});
