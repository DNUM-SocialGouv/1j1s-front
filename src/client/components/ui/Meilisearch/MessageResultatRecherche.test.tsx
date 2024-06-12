/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche';

describe('<MessageResultatRecherche />', () => {
	it('affiche une note de bas de page', () => {
		render(<MessageResultatRecherche labelSingulier={'résultat'} labelPluriel={'résultats'} isLoading={false} numberOfResult={1} />);

		const titre = screen.getByRole('heading', { name: /1 résultat/i });
		const footnote = within(titre).getByRole('link', { name: 'note de pied de page' });
		const containerStatusRole = screen.getByRole('status');

		expect(footnote).toHaveAttribute('href', '#partenaires');
		expect(containerStatusRole).toBeInTheDocument();
	});

	describe('lorsquil ny a pas de résultat', () => {
		it('affiche un message d’erreur', () => {
			render(<MessageResultatRecherche labelSingulier={'résultat'} labelPluriel={'résultats'} isLoading={false} numberOfResult={0} />);

			const errorMessageResult = screen.getByText(/0 résultat/i);
			const errorMessageText = screen.getByText(/malheureusement, aucune offre ne correspond à votre recherche !/i);
			const containerErrorRole = screen.getByRole('error');

			expect(errorMessageResult).toBeInTheDocument();
			expect(errorMessageText).toBeInTheDocument();
			expect(containerErrorRole).toBeInTheDocument();
		});
	});
});
