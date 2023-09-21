/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { LiensUtiles } from '~/client/components/features/Europe/Sections/LiensUtiles';
import { mockLargeScreen } from '~/client/components/window.mock';

describe('<LiensUtiles />', () => {
	beforeEach(() => {
		// FIXME (GAFI 21-09-2023): Plus nécessaire avec la version CSS only
		mockLargeScreen();
	});
	it('affiche la liste des liens utiles', () => {
		render(<LiensUtiles />);

		const liste = screen.getByRole('list', { name: /Liens utiles/i });
		expect(liste).toBeVisible();
		const emploi = within(liste).getByRole('link', { name: /Trouver un emploi en Europe/i });
		expect(emploi).toBeVisible();
		expect(emploi).toHaveAttribute('href', 'https://ec.europa.eu/eures/portal/jv-se/home');
		const apprentissage = within(liste).getByRole('link', { name: /Faire une partie de mon apprentissage en Europe/i });
		expect(apprentissage).toBeVisible();
		expect(apprentissage).toHaveAttribute('href', 'https://www.euroappmobility.eu/fr/');
		const volontariat = within(liste).getByRole('link', { name: /Chercher un Volontariat International \(V\.I\.E \/ V\.I\.A\)/i });
		expect(volontariat).toBeVisible();
		expect(volontariat).toHaveAttribute('href', 'https://mon-vie-via.businessfrance.fr/');
		const missionSolidarite = within(liste).getByRole('link', { name: /S‘engager dans une mission de solidarité en Europe/i });
		expect(missionSolidarite).toBeVisible();
		expect(missionSolidarite).toHaveAttribute('href', 'https://europa.eu/youth/solidarity/young-people/volunteering_fr');
	});
});
