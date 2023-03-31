/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

import SimulateurOffreAlternant from './index.page';

describe('Apprentissage / Simulateur de rémunération en apprentissage', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('affiche un sous-titre de page', () => {
		// When
		render(<SimulateurOffreAlternant />);

		// Then
		const sousTitre = screen.getByText('En partenariat avec le Portail de l’Alternance');
		expect(sousTitre).toBeVisible();
	});

	describe('pour un alternant', () => {
		beforeEach(() => {
			mockUseRouter({ asPath: '/apprentissage/simulation?simulateur=alternant', query: { simulateur: 'alternant' } });
		});

		it('affiche un titre de page', () => {
			// When
			render(<SimulateurOffreAlternant />);

			// Then
			const titre = screen.getByRole('heading', { level: 1 } );
			expect(titre).toBeVisible();
			expect(titre).toHaveTextContent('Je simule ma rémunération en tant qu’apprenti');
		});

		it('affiche une iframe pour la simulation de rémunération alternant', () => {
			// When
			render(<SimulateurOffreAlternant />);

			// Then
			const iframe = screen.getByTitle('Formulaire de simulation de la rémunération en apprentissage de la Délégation générale à l’emploi et à la formation professionnelle');
			expect(iframe).toBeVisible();
			expect(iframe).toHaveAttribute('src', 'https://simulateur-alternance.1jeune1solution.gouv.fr/simulateur-alternant/etape-1?widget=true');
		});
	});

	describe('pour un employeur', () => {
		beforeEach(() => {
			mockUseRouter({ asPath: '/apprentissage/simulation?simulateur=employeur', query: { simulateur: 'employeur' } });
		});

		it('affiche un titre de page employeur', () => {
			// When
			render(<SimulateurOffreAlternant />);

			// Then
			const titre = screen.getByRole('heading', { level: 1 } );
			expect(titre).toBeVisible();
			expect(titre).toHaveTextContent('Je simule le coût d’embauche de mon futur apprenti');
		});

		it('affiche une iframe pour la simulation de rémunération employeur', () => {
			// When
			render(<SimulateurOffreAlternant />);

			// Then
			const iframe = screen.getByTitle('Formulaire de simulation de la rémunération en apprentissage de la Délégation générale à l’emploi et à la formation professionnelle');
			expect(iframe).toBeVisible();
			expect(iframe).toHaveAttribute('src', 'https://simulateur-alternance.1jeune1solution.gouv.fr/simulateur-employeur/etape-1?widget=true');
		});
	});

	describe('par défaut', () => {
		it('affiche un titre de page employeur par défaut', () => {
			// When
			render(<SimulateurOffreAlternant />);

			// Then
			const titre = screen.getByRole('heading', { level: 1 } );
			expect(titre).toBeVisible();
			expect(titre).toHaveTextContent('Je simule le coût d’embauche de mon futur apprenti');
		});

		it('affiche une iframe pour la simulation de rémunération employeur par défaut', () => {
			// When
			render(<SimulateurOffreAlternant />);

			// Then
			const iframe = screen.getByTitle('Formulaire de simulation de la rémunération en apprentissage de la Délégation générale à l’emploi et à la formation professionnelle');
			expect(iframe).toBeVisible();
			expect(iframe).toHaveAttribute('src', 'https://simulateur-alternance.1jeune1solution.gouv.fr/simulateur-employeur/etape-1?widget=true');
		});
	});

	describe('affiche un texte informative concernant le traitement des données par la DGEFP', () => {
		it('avec une redirection vers la politique de confidentialité', () => {
			// Given
			render(<SimulateurOffreAlternant />);

			const lienPolitiqueConfidentialité = screen.getByRole('link', { name: 'Politique de Confidentialité de la DGEFP' });

			expect(lienPolitiqueConfidentialité).toBeVisible();
		});
	});
});
