/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	RésultatRechercherAlternance,
} from '~/client/components/features/Alternance/Résultat/RésultatRechercherAlternance';
import { mockSmallScreen } from '~/client/components/window.mock';
import { Alternance } from '~/server/alternances/domain/alternance';

describe('RésultatRechercherAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('affiche une offre matcha', () => {
		// Given
		const alternance = {
			localisation: 'localisation',
			niveauRequis: 'niveauRequis',
			nomEntreprise: 'nomEntreprise',
			source: Alternance.Source.MATCHA,
			tags: ['localisation', 'typeDeContrat', 'niveauRequis'],
			titre: 'titre',
			typeDeContrat: ['typeDeContrat'],
		};

		// When
		render(<RésultatRechercherAlternance alternance={alternance}/>);

		// Then
		const titre = screen.getByRole('heading', { level: 3 });
		expect(titre).toBeInTheDocument();
		expect(titre.textContent).toEqual(alternance.titre);

		const nomEntreprise = screen.getByText(alternance.nomEntreprise);
		expect(nomEntreprise).toBeInTheDocument();

		const niveauRequis = screen.getByText(alternance.niveauRequis);
		expect(niveauRequis).toBeInTheDocument();

		const typeDeContrat = screen.getByText(alternance.typeDeContrat[0]);
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
			localisation: 'localisation',
			nomEntreprise: 'nomEntreprise',
			source: Alternance.Source.POLE_EMPLOI,
			tags: ['localisation', 'Contrat d‘alternance', 'typeDeContrat'],
			titre: 'titre',
			typeDeContrat: ['typeDeContrat'],
		};

		// When
		render(<RésultatRechercherAlternance alternance={alternance}/>);

		// Then
		const titre = screen.getByRole('heading', { level: 3 });
		expect(titre).toBeInTheDocument();
		expect(titre.textContent).toEqual(alternance.titre);

		const nomEntreprise = screen.getByText(alternance.nomEntreprise);
		expect(nomEntreprise).toBeInTheDocument();

		const localisation = screen.getByText(alternance.localisation);
		expect(localisation).toBeInTheDocument();

		const tagContratDAlternance = screen.getByText('Contrat d‘alternance');
		expect(tagContratDAlternance).toBeInTheDocument();

		const logo = screen.getByRole('img');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', '/images/logos/pole-emploi.svg');
	});
});
