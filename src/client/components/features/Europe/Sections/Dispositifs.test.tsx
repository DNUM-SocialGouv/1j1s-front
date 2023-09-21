/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Dispositifs } from '~/client/components/features/Europe/Sections/Dispositifs';
import { mockLargeScreen } from '~/client/components/window.mock';

describe('<Dispositifs />', () => {
	beforeEach(() => {
		// FIXME (GAFI 18-09-2023): Devrait être inutile à terme
		mockLargeScreen();
	});
	it('affiche le titre de section', () => {
		render(<Dispositifs />);

		const titre = screen.getByRole('heading', {
			level: 2,
			name: /Je découvre les dispositifs pour m’accompagner dans mon projet/i,
		});
		expect(titre).toBeVisible();
	});
	it('affiche la carte EURES', () => {
		render(<Dispositifs />);

		const titre = screen.getByRole('heading', {
			level: 3,
			name: /Le programme de mobilité ciblé EURES/i,
		});
		expect(titre).toBeVisible();
	});
	it('affiche la carte Erasmus', () => {
		render(<Dispositifs />);

		const titre = screen.getByRole('heading', {
			level: 3,
			name: /Le programme “ERASMUS\+”/i,
		});
		expect(titre).toBeVisible();
	});
});
