/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import FaqPage from '~/pages/faq/index.page';

describe('Page FAQ', () => {
	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FAQ_FEATURE: '0',
			};
		});

		it('ne retourne rien', async () => {
			render(<FaqPage/>);


			const title = screen.queryByRole('heading', { level: 1 });
			expect(title).not.toBeInTheDocument();
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FAQ_FEATURE: '1',
			};
		});

		it('affiche le titre de la page', async () => {
			render(<FaqPage/>);

			const title = await screen.findByRole('heading', { level: 1 });
			expect(title).toHaveTextContent('FAQ - Questions fréquemment posées');

		});
	});

});
