/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ExperiencesEnEurope } from '~/client/components/features/Europe/Sections/ExperiencesEnEurope';

describe('<ExperiencesEnEurope />', () => {
	it('affiche le titre de la page', () => {
		render(<ExperiencesEnEurope />);

		const titre = screen.getByRole('heading', {
			level: 1,
			name: /Je cherche une expérience en Europe/i,
		});
		expect(titre).toBeVisible();
	});
	it('affiche le paragraphe d’introduction', () => {
		render(<ExperiencesEnEurope />);

		const paragraphe = screen.getByText(/Trouvez des offres d’emploi/i);
		expect(paragraphe).toBeVisible();
	});
	it('affiche l’information complémentaire', () => {
		render(<ExperiencesEnEurope />);

		const paragraphe = screen.getByText(/Si vous êtes accompagné·e/i);
		expect(paragraphe).toBeVisible();
	});
});
