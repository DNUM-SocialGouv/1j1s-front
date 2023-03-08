/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	RésultatRechercherAlternance,
} from '~/client/components/features/Alternance/Résultat/RésultatRechercherAlternance';
import { mockSmallScreen } from '~/client/components/window.mock';
import { Alternance } from '~/server/alternances/domain/alternance';
import { anAlternanceMatcha, anAlternancePEJobs } from '~/server/alternances/domain/alternance.fixture';

describe('RésultatRechercherAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('affiche une offre matcha', () => {
		// Given
		const alternance = {
			entreprise: { nom: 'nomEntreprise' },
			id: 'annonce',
			localisation: 'localisation',
			niveauRequis: 'niveauRequis',
			source: Alternance.Source.MATCHA,
			tags: ['localisation', 'typeDeContrat', 'niveauRequis'],
			titre: 'titre',
			typeDeContrat: 'typeDeContrat',
		};

		// When
		render(<RésultatRechercherAlternance alternance={alternance}/>);

		// Then
		const titre = screen.getByRole('heading', { level: 3 });
		expect(titre).toBeInTheDocument();
		expect(titre.textContent).toEqual(alternance.titre);

		const nomEntreprise = screen.getByText(alternance.entreprise.nom);
		expect(nomEntreprise).toBeInTheDocument();

		const niveauRequis = screen.getByText(alternance.niveauRequis);
		expect(niveauRequis).toBeInTheDocument();

		const typeDeContrat = screen.getByText(alternance.typeDeContrat);
		expect(typeDeContrat).toBeInTheDocument();

		const localisation = screen.getByText(alternance.localisation);
		expect(localisation).toBeInTheDocument();

		const logo = screen.getByRole('img');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', '/images/logos/la-bonne-alternance.svg');
	});

	it('affiche une offre peJobs', () => {
		// Given
		const alternance = {
			entreprise: { nom: 'nomEntreprise' },
			id: 'annonce',
			localisation: 'localisation',
			source: Alternance.Source.POLE_EMPLOI,
			tags: ['localisation', 'Contrat d‘alternance', 'typeDeContrat'],
			titre: 'titre',
			typeDeContrat: 'typeDeContrat',
		};

		// When
		render(<RésultatRechercherAlternance alternance={alternance}/>);

		// Then
		const titre = screen.getByRole('heading', { level: 3 });
		expect(titre).toBeInTheDocument();
		expect(titre.textContent).toEqual(alternance.titre);

		const nomEntreprise = screen.getByText(alternance.entreprise.nom);
		expect(nomEntreprise).toBeInTheDocument();

		const localisation = screen.getByText(alternance.localisation);
		expect(localisation).toBeInTheDocument();

		const tagContratDAlternance = screen.getByText('Contrat d‘alternance');
		expect(tagContratDAlternance).toBeInTheDocument();

		const logo = screen.getByRole('img');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', '/images/logos/pole-emploi.svg');
	});

	it('affiche un lien sur les offres matcha vers le détail de l’annonce', () => {
		const alternance: Alternance = anAlternanceMatcha({
			id: 'annonce',
			titre: 'Ma super alternance',
		});

		render(<RésultatRechercherAlternance alternance={alternance}/>);

		const lien = screen.getByRole('link', { name: /Ma super alternance/i });
		expect(lien).toBeVisible();
		expect(lien).toHaveAttribute('href', '/apprentissage/annonce');
	});

	it('n’affiche pas le lien vers le détail de l’annonce sur les offres pejobs', () => {
		const alternance: Alternance = anAlternancePEJobs();

		render(<RésultatRechercherAlternance alternance={alternance}/>);

		const lien = screen.queryByRole('link');
		expect(lien).toHaveAttribute('href', '#');
	});
});
