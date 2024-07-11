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
} from '~/client/components/ui/Meilisearch/mockMeilisearchUseFunctions';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

describe('FormulaireRechercheAnnonceLogement', () => {
	it('affiche un formulaire', () => {
		render(<FormulaireRechercheAnnonceLogement/>);

		const form = screen.getByRole('search');
		expect(form).toBeVisible();
	});

	beforeEach(() => {
		mockLargeScreen();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [generateRefinementListItem({ label: 'exemple', value: 'exemple' })],
			refine: jest.fn(),
		}));
	});

	describe('en Desktop', () => {
		it('affiche les champs de recherche', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			expect(screen.getByRole('textbox', { name: 'Ville' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Type d‘offre' })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Type de bien' })).toBeVisible();
			expect(screen.getByRole('button', { name: 'Surface (m²)' })).toBeVisible();
			expect(screen.getByRole('button', { name: 'Prix' })).toBeVisible();
		});
	});

	describe('en Mobile', () => {
		beforeEach(() => {
			mockSmallScreen();
		});

		it('affiche uniquement le champ ville dans le formulaire', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			expect(screen.getByRole('textbox', { name: 'Ville' })).toBeVisible();
		});

		it('affiche un bouton pour filtrer la recherche', () => {
			render(<FormulaireRechercheAnnonceLogement/>);

			const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
			expect(buttonFiltre).toBeVisible();
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
