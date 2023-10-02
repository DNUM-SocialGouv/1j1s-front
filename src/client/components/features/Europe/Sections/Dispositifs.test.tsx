/**
 * @jest-environment jsdom
 */

import { queries as defaultQueries, render, screen, within as defaultWithin } from '@testing-library/react';

import { queries } from '~/test-utils';

import { Dispositifs } from './Dispositifs';

const within = (element: HTMLElement) => defaultWithin(element, { ...queries, ...defaultQueries });

describe('<Dispositifs />', () => {
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

		const carte = screen.getByRole('listitem', { name: /Le programme de mobilité ciblé EURES/i });
		const titre = within(carte).getByRole('heading', {
			level: 3,
			name: /Le programme de mobilité ciblé EURES/i,
		});
		expect(titre).toBeVisible();
		const fonctionnement = within(carte).getByDescriptionTerm(/Comment cela fonctionne \?/i);
		expect(fonctionnement).toBeVisible();
		expect(fonctionnement).toHaveTextContent(/Il vous aide à trouver un emploi/i);
		const qui = within(carte).getByDescriptionTerm(/Pour qui \?/i);
		expect(qui).toBeVisible();
		expect(qui).toHaveTextContent(/Tout demandeur d’emploi/i);
		const duree = within(carte).getAllByDescriptionTerm(/Pour quelle durée \?/i);
		expect(duree[0]).toBeVisible();
		expect(duree[1]).toBeVisible();
		expect(duree[0]).toHaveTextContent(/Contrat de 3 mois minimum/i);
		expect(duree[1]).toHaveTextContent(/Contrat de 6 mois minimum/i);
		const aides = within(carte).getAllByDescriptionTerm(/Quelles aides \?/i);
		expect(aides[0]).toBeVisible();
		expect(aides[1]).toBeVisible();
		expect(aides[0]).toHaveTextContent(/Aide dans la recherche d’emploi./i);
		expect(aides[1]).toHaveTextContent(/Soutien financier/i);
		const lienEures = within(carte).getByRole('link', { name: /En savoir plus sur EURES/i });
		expect(lienEures).toBeVisible();
		expect(lienEures).toHaveAttribute('href', 'https://ec.europa.eu/eures/public/eures-services/eures-targeted-mobility-scheme_fr');
		expect(lienEures).toHaveTextContent('En savoir plus');
	});
	it('affiche la carte Erasmus', () => {
		render(<Dispositifs />);

		const carte = screen.getByRole('listitem', { name: /Le programme “ERASMUS\+”/i });
		const titre = within(carte).getByRole('heading', {
			level: 3,
			name: /Le programme “ERASMUS\+”/i,
		});
		expect(titre).toBeVisible();
		const description = within(carte).getByText(/Entre 200 et 600 euros par mois/i);
		expect(description).toBeVisible();
		const fonctionnement = within(carte).getByDescriptionTerm(/Comment cela fonctionne \?/i);
		expect(fonctionnement).toBeVisible();
		expect(fonctionnement).toHaveTextContent(/Il vous donne la possibilité de séjourner à l’étranger/i);
		const qui = within(carte).getByDescriptionTerm(/Pour qui \?/i);
		expect(qui).toBeVisible();
		expect(qui).toHaveTextContent(/Tout public/i);
		const duree = within(carte).getAllByDescriptionTerm(/Pour quelle durée \?/i);
		expect(duree[0]).toBeVisible();
		expect(duree[1]).toBeVisible();
		expect(duree[2]).toBeVisible();
		expect(duree[0]).toHaveTextContent(/Étudiants : de 3 à 12 mois par cycle universitaire\./i);
		expect(duree[1]).toHaveTextContent(/Stage : de 2 à 12 mois\./i);
		expect(duree[2]).toHaveTextContent(/Formation professionnelle : de 1 à 360 jours\./i);
		const aides = within(carte).getByDescriptionTerm(/Quelles aides \?/i);
		expect(aides).toBeVisible();
		expect(aides).toHaveTextContent(/Aides financières cumulables/i);
		const lienErasmus = within(carte).getByRole('link', { name: /En savoir plus sur ERASMUS\+/i });
		expect(lienErasmus).toBeVisible();
		expect(lienErasmus).toHaveAttribute('href', 'https://info.erasmusplus.fr/');
		expect(lienErasmus).toHaveTextContent('En savoir plus');
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
