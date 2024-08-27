/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { MessageResultatRecherche } from '~/client/components/ui/Meilisearch/MessageResultatRecherche/MessageResultatRecherche';

describe('<MessageResultatRecherche />', () => {
	it('affiche une note de bas de page', () => {
		render(<MessageResultatRecherche
			labelSingulier={'résultat'}
			labelPluriel={'résultats'}
			isLoading={false}
			numberOfResult={1}
		       />);

		const titre = screen.getByRole('heading', { name: /1 résultat/i });
		const footnote = within(titre).getByRole('link', { name: 'note de pied de page' });

		expect(footnote).toHaveAttribute('href', '#partenaires');
	});

	describe('lorsqu‘il n‘y a pas de résultat', () => {
		it('affiche un message d’erreur et l‘annonce au lecteur d‘écran en tant qu‘alerte', () => {
			render(<MessageResultatRecherche labelSingulier={'résultat'}
				labelPluriel={'résultats'}
				isLoading={false}
																			 numberOfResult={0}
			       />);

			const alertError = screen.getByRole('alert');
			expect(alertError).toHaveTextContent(/0 résultat/i);
			expect(alertError).toHaveTextContent(/malheureusement, aucune offre ne correspond à votre recherche !/i);
			expect(alertError).toBeVisible();
		});
	});

	it('lorsqu‘il y a un résultat, l‘annonce au lecteur d‘écran', () => {
		render(<MessageResultatRecherche
			labelSingulier={'résultat'}
			labelPluriel={'résultats'}
			isLoading={false}
			numberOfResult={1}
		       />);

		const statusMessage = screen.getByRole('status');
		expect(statusMessage).toHaveTextContent('1 résultat');
	});

	it('lorsqu‘il y a plusieurs résultats, l‘annonce au lecteur d‘écran', () => {
		render(<MessageResultatRecherche
			labelSingulier={'résultat'}
			labelPluriel={'résultats'}
			isLoading={false}
			numberOfResult={10}
		       />);
		const statusMessage = screen.getByRole('status');
		expect(statusMessage).toHaveTextContent('10 résultats');
	});
});
