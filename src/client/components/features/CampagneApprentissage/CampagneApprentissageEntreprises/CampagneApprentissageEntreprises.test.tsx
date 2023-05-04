/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	CampagneApprentissageEntreprises,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';

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
		const titre = screen.getByRole('heading', { level:1, name: /L’apprentissage pour mon entreprise, c’est le bon choix !/i });

		// THEN
		expect(titre).toBeVisible();
	});

	it('affiche un lien vers la simulation pour les employeurs', () => {
		// GIVEN
		mockLargeScreen();
		// WHEN
		render(<CampagneApprentissageEntreprises />);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler le coût de l’embauche d’un apprenti/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation?simulateur=employeur');
	});

	it('raccourci le contenu du lien vers le simulateur en mobile', () => {
		// GIVEN
		mockSmallScreen();

		// WHEN
		render(<CampagneApprentissageEntreprises />);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler le coût d’embauche/i });
		expect(simulation).toBeVisible();
		expect(simulation).not.toHaveTextContent('d’un apprenti');
	});

	describe('affiche une première section pour les raisons de choisir l’apprentissage', () => {
		it('comportant un titre', () => {
			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /5 bonnes raisons de choisir l’apprentissage :/i });
			const titre = within(sectionRaison).getByRole('heading', { level: 2, name: /5 bonnes raisons de choisir l’apprentissage :/i });
			expect(titre).toBeVisible();
		});

		it('comportant une liste des raisons', () => {
			// GIVEN
			const expectedRaisonList = [
				'Former votre futur collaborateur',
				'Transmettre votre savoir-faire',
				'Bénéficier d’aides pour le recrutement',
				'Découvrir de nouvelles idées et pratiques',
				'Préparer l’avenir de votre entreprise',
			];

			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /5 bonnes raisons de choisir l’apprentissage :/i });
			const raisonList = within(sectionRaison).getAllByRole('listitem');
			expect(raisonList).toHaveLength(expectedRaisonList.length);
			expectedRaisonList.forEach((raison, index) => {
				expect(raisonList[index]).toHaveTextContent(raison);
				expect(raisonList[index]).toBeVisible();
			});
		});
	});

	describe('EnSavoirPlusApprentissageEntreprises', () => {
		it('je vois les informations pour accéder à la FAQ parents-enfants', () => {
			render(<CampagneApprentissageEntreprises/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'On répond à toutes vos questions sur l’apprentissage',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Consulter la FAQ' })).toHaveAttribute('href', '/faq/apprentissage-employeurs-apprentis');
		});
		it('je vois les informations pour accéder à la page d‘apprentissage pour les employeurs', () => {
			render(<CampagneApprentissageEntreprises/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Vous êtes à la recherche d’un apprenti ?',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Déposer une offre' })).toHaveAttribute('href', '/apprentissage/deposer-offre');
		});
	});

	describe('affiche une section informative sur l’embauche d’un apprenti', () => {
		it('comprenant un titre', () => {
			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const section = screen.getByRole('region', { name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage ?' });
			const titre = within(section).getByRole('heading', { level: 2, name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage ?' });
			expect(titre).toBeVisible();
		});

		it('comprenant un lien externe vers des renseignements', () => {
			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const section = screen.getByRole('region', { name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage ?' });
			const link = within(section).getByRole('link', { name: 'Se renseigner sur l’embauche' });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', 'https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/embaucher-un-apprenti/' );
		});
	});
});
