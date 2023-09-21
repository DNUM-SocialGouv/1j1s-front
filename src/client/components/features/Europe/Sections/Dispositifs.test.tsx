/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Dispositifs } from '~/client/components/features/Europe/Sections/Dispositifs';
import { mockLargeScreen } from '~/client/components/window.mock';
import { queries } from '~/test-utils';

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
		const { getByDescriptionTerm, getAllByDescriptionTerm } = render(<Dispositifs />, { queries });

		const titre = screen.getByRole('heading', {
			level: 3,
			name: /Le programme de mobilité ciblé EURES/i,
		});
		expect(titre).toBeVisible();
		const fonctionnement = getByDescriptionTerm(/Comment cela fonctionne \?/i);
		expect(fonctionnement).toBeVisible();
		expect(fonctionnement).toHaveTextContent(/Il vous aide à trouver un emploi/i);
		const qui = getByDescriptionTerm(/Pour qui \?/i);
		expect(qui).toBeVisible();
		expect(qui).toHaveTextContent(/Tout demandeur d’emploi/i);
		const duree = getAllByDescriptionTerm(/Pour quelle durée \?/i);
		expect(duree[0]).toBeVisible();
		expect(duree[1]).toBeVisible();
		expect(duree[0]).toHaveTextContent(/Contrat de 3 mois minimum/i);
		expect(duree[1]).toHaveTextContent(/Contrat de 6 mois minimum/i);
		const aides = getAllByDescriptionTerm(/Quelles aides \?/i);
		expect(aides[0]).toBeVisible();
		expect(aides[1]).toBeVisible();
		expect(aides[0]).toHaveTextContent(/Aide dans la recherche d’emploi./i);
		expect(aides[1]).toHaveTextContent(/Soutien financier/i);
		const lienEures = screen.getByRole('link', { name: /En savoir plus sur EURES/i });
		expect(lienEures).toBeVisible();
		expect(lienEures).toHaveAttribute('href', 'https://ec.europa.eu/eures/public/eures-services/eures-targeted-mobility-scheme_fr');
		expect(lienEures).toHaveTextContent('En savoir plus');
	});
	it('affiche la carte Erasmus', () => {
		render(<Dispositifs />);

		const titre = screen.getByRole('heading', {
			level: 3,
			name: /Le programme “ERASMUS\+”/i,
		});
		expect(titre).toBeVisible();
	});
	it('affiche la carte des aides financières', () => {
		render(<Dispositifs />);

		const titre = screen.getByRole('heading', {
			level: 3,
			name: /Vous cherchez une aide financière pour vivre une expérience en Europe \?/i,
		});
		expect(titre).toBeVisible();
		const description = screen.getByText(/Découvrez le simulateur d’aides financières sur 1jeune1solution/i);
		expect(description).toBeVisible();
		const lienSimulateur = screen.getByRole('link', { name: /Faire une simulation d’aides/i });
		expect(lienSimulateur).toBeVisible();
		expect(lienSimulateur).toHaveAttribute('href', '/mes-aides');
	});
});
