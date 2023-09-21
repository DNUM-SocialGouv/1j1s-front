/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { LiensUtiles } from '~/client/components/features/Europe/Sections/LiensUtiles';
import { mockLargeScreen } from '~/client/components/window.mock';

describe('<LiensUtiles />', () => {
	it('affiche le titre de la section', () => {
		render(<LiensUtiles />);

		const heading = screen.getByRole('heading', { level: 2, name: /Découvrez d’autres services/i });
		expect(heading).toBeVisible();
	});
	
	it('affiche la liste des liens utiles', () => {
		render(<LiensUtiles />);

		const liste = screen.getByRole('list', { name: /Liens utiles/i });
		expect(liste).toBeVisible();
		const apprentissage = within(liste).getByRole('link', { name: /Vous souhaitez faire une partie de votre apprentissage en Europe/i });
		expect(apprentissage).toBeVisible();
		expect(apprentissage).toHaveAttribute('href', 'https://www.euroappmobility.eu/fr/');
		const volontariat = within(liste).getByRole('link', { name: /Vous cherchez un Volontariat International \(V\.I\.E \/ V\.I\.A\)/i });
		expect(volontariat).toBeVisible();
		expect(volontariat).toHaveAttribute('href', 'https://mon-vie-via.businessfrance.fr/');
		const missionSolidarite = within(liste).getByRole('link', { name: /Vous souhaitez vous engager dans une mission de solidarité en Europe/i });
		expect(missionSolidarite).toBeVisible();
		expect(missionSolidarite).toHaveAttribute('href', 'https://europa.eu/youth/solidarity/young-people/volunteering_fr');
	});
});
