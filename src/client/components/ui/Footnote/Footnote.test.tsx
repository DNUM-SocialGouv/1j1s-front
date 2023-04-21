/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Footnote } from '~/client/components/ui/Footnote/Footnote';

describe('<Footnote />', () => {
	describe('<Footnote.Reference />', () => {
		it('affiche une astérisque', () => {
			render(
				<>
					<p>Ceci est un paragraphe<Footnote.Reference to="footnote" /></p>
					<Footnote id="footnote">Ceci est une explication complémentaire.</Footnote>
				</>,
			);

			const paragraph = screen.getByText(/Ceci est un paragraph/);
			expect(paragraph).toHaveTextContent(/\*/);
		});
		it('affiche un lien vers la note', () => {
			render(
				<>
					<p>Ceci est un paragraphe<Footnote.Reference to="footnote" /></p>
					<Footnote id="footnote">Ceci est une explication complémentaire.</Footnote>
				</>,
			);

			const reference = screen.getByRole('link', { name: /\*/i });
			const footnote = screen.getByText(/Ceci est une explication complémentaire./);
			expect(footnote).toHaveAttribute('id');
			expect(reference).toHaveAttribute('href', `#${footnote.id}`);
		});
		it('ajoute une description accessible à la référence', () => {
			render(
				<>
					<p>Ceci est un paragraphe<Footnote.Reference to="footnote" /></p>
					<Footnote id="footnote">Ceci est une explication complémentaire.</Footnote>
				</>,
			);

			const reference = screen.getByRole('link', { name: /\*/i });
			expect(reference).toHaveAccessibleDescription('note de pied de page');
		});
	});

	it('affiche une astérisque en début de footnote', () => {
		render(
			<>
				<p>Ceci est un paragraphe<Footnote.Reference to="footnote" /></p>
				<Footnote id="footnote">Ceci est une explication complémentaire.</Footnote>
			</>,
		);

		const footnote = screen.getByText(/Ceci est une explication complémentaire./);
		expect(footnote).toHaveTextContent(/^\* .+/);
	});
});
