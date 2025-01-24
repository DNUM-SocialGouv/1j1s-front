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

	describe('Encart de présentation de l’apprentissage pour les employeurs', () => {
		it('masque l’ancien titre', () => {
			// When
			render(
				<CampagneApprentissageEntreprises />,
			);

			// Then
			const titre = screen.queryByRole('heading', { level: 1, name: 'L’apprentissage, pour mon entreprise c’est le bon choix\u00A0!' });
			expect(titre).not.toBeInTheDocument();
		});
		it('affiche le nouveau titre', () => {
			// When
			render(
				<CampagneApprentissageEntreprises  />,
			);

			// Then
			const titre = screen.getByRole('heading', { level: 1, name: 'Avec l’apprentissage, recrutez la future pépite de votre entreprise\u00A0!' });
			expect(titre).toBeVisible();
		});

		it('masque le lien vers la simulation pour les employeurs', () => {
			// Given
			mockLargeScreen();

			// When
			render(
				<CampagneApprentissageEntreprises  />,
			);

			// Then
			const simulation = screen.queryByRole('link', { name: /Simuler le coût de l’embauche d’un apprenti/i });
			expect(simulation).not.toBeInTheDocument();
		});
		it('affiche le lien vers le dépot d’offres', () => {
			// When
			render(
				<CampagneApprentissageEntreprises />,
			);

			// Then
			const simulation = screen.getByRole('link', { name: /Déposer mon offre d’apprentissage/i });
			expect(simulation).toBeVisible();
			expect(simulation).toHaveAttribute('href', '/apprentissage/deposer-offre');
		});
	});
	describe('Section bonnes raisons de choisir l’apprentissage', () => {
		it('comporte un titre', () => {
			// WHEN
			render(
				<CampagneApprentissageEntreprises />,
			);

			// THEN
			const sectionRaison = screen.getByRole('region', { name: /5 bonnes raisons de choisir l’apprentissage :/i });
			const titre = within(sectionRaison).getByRole('heading', { level: 2, name: /5 bonnes raisons de choisir l’apprentissage :/i });
			expect(titre).toBeVisible();
		});
		it('comporte une liste des raisons', () => {
			// GIVEN
			const expectedRaisonList = [
				'Former votre futur collaborateur',
				'Transmettre votre savoir-faire',
				'Bénéficier d’aides pour le recrutement',
				'Découvrir de nouvelles idées et pratiques',
				'Préparer l’avenir de votre entreprise',
			];

			// WHEN
			render(
				<CampagneApprentissageEntreprises />,
			);

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
	describe('Encart redirections internes vers la FAQ et le dépot d’offre', () => {
		it('masque les informations pour accéder à la FAQ parents-enfants', () => {
			render(
				<CampagneApprentissageEntreprises />,
			);
			expect(screen.queryByRole('heading', {
				level: 2,
				name: 'On répond à toutes vos questions sur l’apprentissage',
			})).not.toBeInTheDocument();
		});
		it('masque les informations pour accéder à la page d‘apprentissage pour les employeurs', () => {
			render(
				<CampagneApprentissageEntreprises />,
			);
			expect(screen.queryByRole('heading', {
				level: 2,
				name: 'Vous êtes à la recherche d’un apprenti ?',
			})).not.toBeInTheDocument();
		});
	});
	describe('Section témoignages vidéos', () => {
		it('masque les vidéos', () => {
			// When
			render(
				<CampagneApprentissageEntreprises />,
			);
			// Then
			expect(screen.queryByRole('region', { name: /Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?/i })).not.toBeInTheDocument();
		});
	});
	describe('Section verbatims apprentis', () => {
		  it('affiche une section titrée', () => {
		    // When
			render(
				<CampagneApprentissageEntreprises />,
			);
		    // Then
			const section = screen.getByRole('region', { name: 'Ils ont choisi de former des apprentis, pourquoi pas vous ?' });
			const titre = within(section).getByRole('heading', { level: 2, name: 'Ils ont choisi de former des apprentis, pourquoi pas vous ?' });
			const sousTitre = within(section).getByText('Découvrez les témoignages de Fabrice, Gaël, Julien, et de leurs apprentis !');
			expect(titre).toBeVisible();
			expect(sousTitre).toBeVisible();
		  });
	});
	describe('Section redirections externes sur l’embauche d’un apprenti', () => {
		it('masque la sous-section pour se renseigner', () => {
			// When
			render(
				<CampagneApprentissageEntreprises />,
			);

			// Then
			const section = screen.queryByRole('region', { name: 'Comme eux, vous souhaitez faire le choix de l’apprentissage\u00A0?' });
			expect(section).not.toBeInTheDocument();
		});
		it('masque la sous-section pour l’aide financière', () => {
			// When
			render(<CampagneApprentissageEntreprises />);

			// Then
			const section = screen.queryByRole('region', { name: 'Vous envisagez de recruter un apprenti\u00A0? Vous pouvez bénéficier d’une aide financière' });
			expect(section).not.toBeInTheDocument();
		});
		it('affiche une sous-section redirection FAQ', () => {
			// When
			render(<CampagneApprentissageEntreprises />);

			// Then
			const section = screen.getByRole('region', { name: 'Vous voulez en savoir plus sur l’apprentissage ?' });
			const cta = within(section).getByRole('link', { name: 'Consultez notre FAQ' });
			expect(section).toBeVisible();
			expect(cta).toBeVisible();
			expect(cta).toHaveAttribute('href', '/faq/apprentissage-employeurs-apprentis');
		});
	});

});
