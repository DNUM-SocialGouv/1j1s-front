/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheAnnonceLogement,
} from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

let refineMock: jest.Mock<string>;

describe('FormulaireRechercheAnnonceLogement', () => {
	describe('en Desktop', () => {
		beforeEach(() => {
			mockLargeScreen();
		});
		beforeEach(() => {
			// GIVEN
			refineMock = jest.fn();
			spyed.mockImplementation(() => mockUseRefinementList({
				items: [ generateRefinementListItem({ label: 'exemple', value: 'exemple' }) ],
				refine: refineMock,
			}));
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('affiche un formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const form = screen.getByRole('search');
			expect(form).toBeInTheDocument();
		});

		it('n‘affiche pas de bouton pour filtrer la recherche', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonFiltreMobile = screen.getByTestId('bouton-filtrer-recherche-mobile');
			expect(buttonFiltreMobile).toBeInTheDocument();
		});

		it('affiche le champ ville dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const inputVille = screen.getByRole('textbox', { name: 'Ville' });
			expect(inputVille).toBeInTheDocument();
		});

		it('affiche le champ type d‘offre dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonTypeOffre = screen.getByRole('button', { name: 'Type d‘offre' });
			expect(buttonTypeOffre).toBeInTheDocument();
		});

		it('affiche le champ type de bien dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonTypeOffre = screen.getByRole('button', { name: 'Type de bien' });
			expect(buttonTypeOffre).toBeInTheDocument();
		});

		it('affiche le champ prix dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonPrix = screen.getByRole('button', { name: 'Prix' });
			expect(buttonPrix).toBeInTheDocument();
		});

		it('affiche le champ surface dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonSurface = screen.getByRole('button', { name: 'Surface (m²)' });
			expect(buttonSurface).toBeInTheDocument();
		});
	});

	describe('en Mobile', () => {
		beforeEach(() => {
			mockSmallScreen();
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('affiche un formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const form = screen.getByRole('search');
			expect(form).toBeInTheDocument();
		});

		it('affiche le champ ville dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const inputVille = screen.getByRole('textbox', { name: 'Ville' });
			expect(inputVille).toBeInTheDocument();
			expect(inputVille).toBeVisible();
		});

		it('affiche un bouton pour filtrer la recherche', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
			expect(buttonFiltre).toBeInTheDocument();
		});

		it('n‘affiche pas le champ type d‘offre dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonTypeOffre = screen.queryByRole('button', { name: 'Type d‘offre' });
			expect(buttonTypeOffre).not.toBeInTheDocument();

		});

		it('n‘affiche pas le champ type de bien dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonTypeBien = screen.queryByRole('button', { name: 'Type de bien' });
			expect(buttonTypeBien).not.toBeInTheDocument();

		});

		it('n‘affiche pas le champ prix dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonPrixDesktop = screen.getByTestId('input-prix-desktop');
			expect(buttonPrixDesktop).toBeInTheDocument();
		});

		it('n‘affiche pas le champ surface dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonSurfaceDesktop = screen.getByTestId('input-surface-desktop');
			expect(buttonSurfaceDesktop).toBeInTheDocument();
		});

		describe('quand l‘utilisateur ouvre les filtres de recherche', () => {
			it('affiche la modale', async () => {
				const user = userEvent.setup();

				render(<FormulaireRechercheAnnonceLogement/>);

				const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
				await user.click(buttonFiltre);

				const modalComponent = screen.getByRole('dialog');
				expect(modalComponent).toHaveClass('show');
			});

			it('affiche le champ type d‘offre', async () => {
				const user = userEvent.setup();

				render(<FormulaireRechercheAnnonceLogement/>);

				const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
				await user.click(buttonFiltre);

				const modalComponent = screen.getByRole('dialog');
				const accordeonItems = within(modalComponent).getAllByRole('group');
				const firstItem = accordeonItems[0];

				expect(firstItem).toHaveTextContent('Type d‘offre');
			});

			it('affiche le champ type de bien', async () => {
				const user = userEvent.setup();

				render(<FormulaireRechercheAnnonceLogement/>);

				const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
				await user.click(buttonFiltre);

				const modalComponent = screen.getByRole('dialog');
				const accordeonItems = within(modalComponent).getAllByRole('group');
				const secondItem = accordeonItems[1];

				expect(secondItem).toHaveTextContent('Type de bien');
			});

			it('affiche le champ prix', async () => {
				const user = userEvent.setup();

				render(<FormulaireRechercheAnnonceLogement/>);

				const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
				await user.click(buttonFiltre);

				const modalComponent = screen.getByRole('dialog');
				const accordeonItems = within(modalComponent).getAllByRole('group');
				const thirdItem = accordeonItems[2];

				expect(thirdItem).toHaveTextContent('Prix');
			});

			it('affiche le champ surface', async () => {
				const user = userEvent.setup();

				render(<FormulaireRechercheAnnonceLogement/>);

				const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
				await user.click(buttonFiltre);

				const modalComponent = screen.getByRole('dialog');
				const accordeonItems = within(modalComponent).getAllByRole('group');
				const fourthItem = accordeonItems[4]; // skip 3 because of fieldset which is also a group role

				expect(fourthItem).toHaveTextContent('Surface');
			});
		});
	});
});
