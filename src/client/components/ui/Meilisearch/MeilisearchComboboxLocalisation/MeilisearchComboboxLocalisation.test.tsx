/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { MeilisearchComboboxLocalisation } from '~/client/components/ui/Meilisearch/MeilisearchComboboxLocalisation/MeilisearchComboboxLocalisation';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/mockMeilisearchUseFunctions';
import { mockScrollIntoView } from '~/client/components/window.mock';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

describe('MeilisearchComboboxLocalisation', () => {
	it('l‘utilisateur peut intéragir avec le combobox et voir les options', async () => {
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine: jest.fn(),
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });
		await user.type(combobox, 'p');

		expect(combobox).toHaveValue('p');
		const options = screen.getAllByRole('option');
		expect(options.length).toBe(2);
		expect(options[0]).toHaveTextContent('Paris');
		expect(options[1]).toHaveTextContent('PACA');
	});

	it('affiche uniquement les 20 premiers resultat', async () => {
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'a' }),
				generateRefinementListItem({ value: 'ab' }),
				generateRefinementListItem({ value: 'abc' }),
				generateRefinementListItem({ value: 'abcd' }),
				generateRefinementListItem({ value: 'abcde' }),
				generateRefinementListItem({ value: 'abcdef' }),
				generateRefinementListItem({ value: 'abcdefg' }),
				generateRefinementListItem({ value: 'abcdefh' }),
				generateRefinementListItem({ value: 'abcdefhi' }),
				generateRefinementListItem({ value: 'abcdefhj' }),
				generateRefinementListItem({ value: 'abcdefhk' }),
				generateRefinementListItem({ value: 'abcdefhkl' }),
				generateRefinementListItem({ value: 'abcdefhklm' }),
				generateRefinementListItem({ value: 'abcdefhklmn' }),
				generateRefinementListItem({ value: 'abcdefhklmno' }),
				generateRefinementListItem({ value: 'abcdefhklmnop' }),
				generateRefinementListItem({ value: 'abcdefhklmnopq' }),
				generateRefinementListItem({ value: 'abcdefhklmnopqr' }),
				generateRefinementListItem({ value: 'abcdefhklmnopqrs' }),
				generateRefinementListItem({ value: 'abcdefhklmnopqrst' }),
				generateRefinementListItem({ value: 'abcdefhklmnopqrstu' }),
			],
			refine: jest.fn(),
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });
		await user.type(combobox, 'a');

		const options = screen.getAllByRole('option');
		expect(options.length).toBe(20);
	});

	it('lorsqu‘il n‘y a pas de résultat, l‘utilisateur voit un message', async () => {
		const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, Marseille …';
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [],
			refine: jest.fn(),
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });
		await user.type(combobox, 'p');

		const statusPasDeResultat = screen.getByRole('status');
		expect(statusPasDeResultat).toBeVisible();
		expect(statusPasDeResultat).toHaveTextContent(MESSAGE_PAS_DE_RESULTAT);
	});

	it('quand l‘utilisateur séléctionne une option au click, le champ de saisie se vide et la méthode refine est appelé', async () => {
		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine,
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });

		await user.type(combobox, 'p');
		const option = screen.getByRole('option', { name: 'Paris' });
		await user.click(option);

		expect(refine).toHaveBeenCalledTimes(1);
		expect(refine).toHaveBeenCalledWith('Paris');
		expect(combobox).toHaveValue('');
	});

	it('quand l‘utilisateur séléctionne une option au clavier, le champ de saisie se vide et la méthode refine est appelé', async () => {
		mockScrollIntoView();

		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine,
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });

		await user.type(combobox, 'P');
		await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
		await user.keyboard(`{${KeyBoard.ENTER}}`);
		
		expect(refine).toHaveBeenCalledTimes(1);
		expect(refine).toHaveBeenCalledWith('Paris');
		expect(combobox).toHaveValue('');
	});

	it('quand l‘utilisateur tappe une option valide au clavier et fait entrer, le champ de saisie se vide et la méthode refine est appelé', async () => {
		mockScrollIntoView();

		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine,
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });

		await user.type(combobox, 'Paris');
		await user.keyboard(`{${KeyBoard.ENTER}}`);

		expect(refine).toHaveBeenCalledTimes(1);
		expect(refine).toHaveBeenCalledWith('Paris');
		expect(combobox).toHaveValue('');
	});

	it('quand l‘utilisateur tappe l‘option en entier, l‘option n‘est pas séléctionné', async () => {
		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine,
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'} />);
		const combobox = screen.getByRole('combobox', { name: 'Localisation' });

		await user.type(combobox, 'Paris');

		expect(refine).toHaveBeenCalledTimes(0);
		expect(combobox).toHaveValue('Paris');
	});
});
