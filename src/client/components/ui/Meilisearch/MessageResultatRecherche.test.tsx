/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche';

describe('<MessageResultatRecherche />', () => {
	it('affiche une note de bas de page', () => {
		render(<MessageResultatRecherche labelSingulier={'résultat'} labelPluriel={'résultats'} isLoading={false} numberOfResult={1} />);

		const titre = screen.getByRole('heading', { name: /1 résultat/i });
		const footnote = within(titre).getByRole('link', { name: '*' });
		expect(footnote).toHaveAccessibleDescription('note de pied de page');
		expect(footnote).toHaveAttribute('href', '#partenaires');
	});
});
