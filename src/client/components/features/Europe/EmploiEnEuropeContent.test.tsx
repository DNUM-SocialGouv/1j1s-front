/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { EmploiEnEuropeContent } from '~/client/components/features/Europe/EmploiEnEuropeContent';
import { mockLargeScreen } from '~/client/components/window.mock';

describe('<EmploiEnEuropeContent />', () => {
	beforeEach(() => {
		// FIXME (GAFI 18-09-2023): Devrait devenir inutile si on passe en CSS
		mockLargeScreen();
	});
	it('affiche le titre de la page', () => {
		render(<EmploiEnEuropeContent />);

		const titrePage = screen.getByRole('heading', { name: /Je cherche une expérience en Europe/i });
		expect(titrePage).toBeVisible();
	});
	it('affiche la section de liens utiles', () => {
		render(<EmploiEnEuropeContent />);

		const liensUtiles = screen.getByRole('list', { name: /Liens utiles/i });
		expect(liensUtiles).toBeVisible();
	});
	it('affiche la section des dispositifs d’accompagnement', () => {
		render(<EmploiEnEuropeContent />);

		const accompagnements = screen.getByRole('heading', { name: /Je découvre les dispositifs pour m’accompagner dans mon projet/i });
		expect(accompagnements).toBeVisible();
	});
	it('affiche la section des aides financières', () => {
		render(<EmploiEnEuropeContent />);

		const aidesFinancieres = screen.getByRole('heading', { name: /Je cherche des aides financières pour vivre une expérience en Europe/i });
		expect(aidesFinancieres).toBeVisible();
	});
});
