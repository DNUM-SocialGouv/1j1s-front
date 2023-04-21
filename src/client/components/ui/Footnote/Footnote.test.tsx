/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Footnote } from '~/client/components/ui/Footnote/Footnote';

describe('<Footnote />', () => {
	it('affiche une asterisque', () => {
		render(
			<>
				<p>Ceci est un paragraphe<Footnote.Reference /></p>
				<Footnote>Ceci est une explication complémentaire.</Footnote>
			</>,
		);

		const paragraph = screen.getByText(/Ceci est un paragraph/);
		expect(paragraph).toHaveTextContent(/\*/);
	});
});
