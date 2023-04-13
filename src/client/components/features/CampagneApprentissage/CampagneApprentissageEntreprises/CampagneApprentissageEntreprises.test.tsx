/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { CampagneApprentissageEntreprises } from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('CampagneApprentissageEntreprises', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	it('affiche le titre de la page', () => {
		// WHEN
		render(<CampagneApprentissageEntreprises />);
		const titre = screen.getByRole('heading', { level:1, name: /L’apprentissage : le bon choix pour votre entreprise/i });
		
		// THEN
		expect(titre).toBeVisible();
	});
	
	it('affiche un lien vers la simulation', () => {
		// WHEN
		render(<CampagneApprentissageEntreprises />);
		
		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler le coût d’embauche/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation');
	});

	describe('affiche une première section pour les raisons de choisir l’apprentissage', () => {
		it('comportant un titre', () => {
			// WHEN
			render(<CampagneApprentissage />);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /Choisir l’apprentissage c’est…/i });
			const titre = within(sectionRaison).getByRole('heading', { level: 2 });
			expect(titre).toBeVisible();
		});

		it('comportant une liste des raisons', () => {
			// GIVEN
			const expectedRaisonList = [
				'Obtenir un diplôme reconnu',
				'Apprendre en pratiquant',
				'Une formation gratuite',
				'Avoir une expérience professionnelle complète',
				'Un salaire chaque mois',
			];

			// WHEN
			render(<CampagneApprentissage />);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /Choisir l’apprentissage c’est…/i });
			const raisonList = within(sectionRaison).getByRole('list');
			const raisonListItems = within(raisonList).getAllByRole('listitem');
			raisonListItems.forEach((raison,index) => {
				expect(raison).toHaveTextContent(expectedRaisonList[index]);
				expect(raison).toBeVisible();
			});
		});
	});
});
