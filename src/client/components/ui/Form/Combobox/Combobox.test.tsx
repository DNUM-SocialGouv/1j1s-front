/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

import { Combobox } from './Combobox';

describe('<Combobox />', () => {
	it('affiche un input', () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');

		expect(input).toBeVisible();
	});

	describe('default props', () => {
		it('accepte un ref', () => {
			const ref = jest.fn();

			render(
				<Combobox ref={ref}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			expect(ref).toHaveBeenLastCalledWith(input);
		});
		it('accepte les props d’un input', () => {
			render(
				<Combobox disabled>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('disabled');
		});
		it('appelle onKeyDown quand une touche est pressée', async () => {
			const onKeyDown = jest.fn();
			const user = userEvent.setup();
			render(
				<Combobox onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard('A');

			expect(onKeyDown).toHaveBeenCalledTimes(1);
			expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'A' }));
		});
		it('appelle onChange et onInput quand on sélectionne une valeur', async () => {
			const user = userEvent.setup();
			const onChange = jest.fn();
			const onInput = jest.fn();
			render(
				<Combobox onChange={onChange} onInput={onInput}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: expect.objectContaining({ value: 'Option 1' }) }));
			expect(onInput).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: expect.objectContaining({ value: 'Option 1' }) }));
		});
		it('accepte une value', async () => {
			const user = userEvent.setup();
			render(
				<Combobox value="test" onChange={() => null}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.type(input, 'Salut');
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(input).toHaveValue('test');
		});
		it('accepte une defaultValue', () => {
			render(
				<Combobox defaultValue="test">
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveValue('test');
		});
	});

	it('masque la liste de suggestions par défaut', () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const suggestionsList = screen.getByRole('listbox', { hidden: true });
		expect(suggestionsList).not.toBeVisible();
	});

	describe('Navigation au clavier', () => {
		it('affiche la liste de suggestions quand on appuie sur la flèche du bas', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestionsList = screen.getByRole('listbox');
			expect(suggestionsList).toBeVisible();
			const suggestions = within(suggestionsList).getAllByRole('option');
			expect(suggestions).toHaveLength(3);
		});
		it('focus le premier élément de la liste quand on appuie sur la flèche du bas et que la liste est fermée', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);
			expect(suggestions[0]).toHaveAttribute('aria-selected', 'true');
		});
		it('focus l’élément suivant de la liste quand on appuie sur la flèche du bas', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[1].id);
			expect(suggestions[1]).toHaveAttribute('aria-selected', 'true');
		});
		it('revient au début de la liste quand on appuie sur la flèche du bas sur le dernier élément', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);
			expect(suggestions[0]).toHaveAttribute('aria-selected', 'true');
		});
		it('affiche la liste de suggestions quand on appuie sur la flèche du haut', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestionsList = screen.getByRole('listbox');
			expect(suggestionsList).toBeVisible();
			const suggestions = within(suggestionsList).getAllByRole('option');
			expect(suggestions).toHaveLength(3);
		});
		it('focus le dernier élément de la liste quand on appuie sur la flèche du haut et que la liste est fermée', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[2].id);
			expect(suggestions[2]).toHaveAttribute('aria-selected', 'true');
		});
		it('focus l’élément précédent de la liste quand on appuie sur la flèche du haut', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[1].id);
			expect(suggestions[1]).toHaveAttribute('aria-selected', 'true');
		});
		it('revient à la fin de la liste quand on appuie sur la flèche du haut sur le premier élément', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[2].id);
			expect(suggestions[2]).toHaveAttribute('aria-selected', 'true');
		});
		it('masque la liste quand on appuie sur Escape', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
			await user.keyboard(`{${KeyBoard.ESCAPE}}`);

			const suggestionsList = screen.getByRole('listbox', { hidden: true });
			expect(suggestionsList).not.toBeVisible();
		});
		it('reset la selection quand on appuie sur Escape', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
			await user.keyboard(`{${KeyBoard.ESCAPE}}`);

			const suggestions = screen.getAllByRole('option', { hidden: true });
			expect(input).not.toHaveAttribute('aria-activedescendant');
			suggestions.forEach((suggestion) => {
				expect(suggestion).toHaveAttribute('aria-selected', 'false');
			});
		});
		it('ouvre la liste sans focus le premier élément quand on appuie sur Alt et flèche du bas', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ALT}>}{${KeyBoard.ARROW_DOWN}}{/${KeyBoard.ALT}}`);

			const suggestionsList = screen.getByRole('listbox');
			expect(suggestionsList).toBeVisible();
			const suggestions = screen.getAllByRole('option', { hidden: true });
			expect(input).not.toHaveAttribute('aria-activedescendant');
			expect(suggestions[0]).toHaveAttribute('aria-selected', 'false');
		});
		it('conserve la position du curseur quand on appuie sur la flèche du bas', async () => {
			// NOTE (GAFI 13-06-2023): Impossible de reproduire le problème avec testing-library,
			//	Pour éviter de laisser du code non testé, test sur le détail d'implémentation
			const user = userEvent.setup();
			const onKeyDown = jest.fn();
			render(
				<Combobox onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);
			const input = screen.getByRole<HTMLInputElement>('textbox');
			await user.type(input, 'test');
			await user.keyboard(`{${KeyBoard.ARROW_LEFT}}`);

			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			expect(onKeyDown).toHaveBeenLastCalledWith(expect.objectContaining({ defaultPrevented: true }));
		});
		it('conserve la position du curseur quand on appuie sur la flèche du haut', async () => {
			// NOTE (GAFI 13-06-2023): Impossible de reproduire le problème avec testing-library,
			//	Pour éviter de laisser du code non testé, test sur le détail d'implémentation
			const user = userEvent.setup();
			const onKeyDown = jest.fn();
			render(
				<Combobox onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);
			const input = screen.getByRole<HTMLInputElement>('textbox');
			await user.type(input, 'test');
			await user.keyboard(`{${KeyBoard.ARROW_LEFT}}`);

			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			expect(onKeyDown).toHaveBeenLastCalledWith(expect.objectContaining({ defaultPrevented: true }));
		});
		it('change la valeur de l’input quand on appuie sur Enter avec le focus sur un élément', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(input).toHaveValue('Option 1');
		});
		it('ferme la liste quand on sélectionne une valeur', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			const suggestions = screen.getByRole('listbox', { hidden : true });
			expect(suggestions).not.toBeVisible();
		});
	});

	it('marque les éléments pas sélectionnés comme tel', async () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		expect(input).not.toHaveAttribute('aria-activedescendant');
		const suggestions = screen.getAllByRole('option', { hidden: true });
		expect(suggestions[0]).toHaveAttribute('aria-selected', 'false');
		expect(suggestions[1]).toHaveAttribute('aria-selected', 'false');
		expect(suggestions[2]).toHaveAttribute('aria-selected', 'false');
	});

	describe('Filtre', () => {
		it('ouvre la liste quand on commence à taper dans le champ', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, 'Opt');

			const suggestions = screen.getByRole('listbox');
			expect(suggestions).toBeVisible();
		});
		it('filtre la liste quand on tape dans le champ', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, '1');

			const option1 = screen.getByRole('option', { name: 'Option 1' });
			expect(option1).toBeVisible();
			const option2 = screen.getByText('Option 2');
			expect(option2).not.toBeVisible();
		});
		it('skip les options masquées quand on passe à l’option suivante', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, '2');
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const option = screen.getByRole('option', { name: 'Option 2' });
			expect(input).toHaveAttribute('aria-activedescendant', option.id);
			expect(option).toHaveAttribute('aria-selected', 'true');
		});
		it('skip les options masquées quand on passe à l’option précédente', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, '2');
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const option = screen.getByRole('option', { name: 'Option 2' });
			expect(input).toHaveAttribute('aria-activedescendant', option.id);
			expect(option).toHaveAttribute('aria-selected', 'true');
		});
		it('ignore la casse quand les options sont filtrées', async () => {
			const user = userEvent.setup();
			render(
				<Combobox>
					<Combobox.Option>ABC</Combobox.Option>
					<Combobox.Option>abc</Combobox.Option>
					<Combobox.Option>Abc</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			const options = screen.getAllByRole('option');
			expect(options).toHaveLength(3);
		});
	});

	it.todo('cliquer sur une option');
	it.todo('permet de styliser tous les éléments (classname sur la div au lieu du input)');
	it.todo('enter submits form if not selecting value');
	it.todo('enter does not submits form if selecting value');
	it.todo('attributs ARIA (https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/#rps_label)');
	it.todo('affiche un bouton qui déplie le menu');
	it.todo('le bouton est tabindex -1');
	it.todo('handle value != label on option');
	it.todo('est compatible IE (keyboard key names)');
	it.todo("checker toutes les features d'accessibilité dans le pattern ARIA");
	it.todo('n’écrase pas les props');
	it.todo('gérer les children qui ne sont pas des Option');
	it.todo('gérer les catégories');
	it.todo('Gérer Options qui ont du HTML en enfant (e.g. <Option>value <em>test</em></Option>) (devrait être totomatique)');
	it.todo('styliser le composant');
	it.todo('validation de la valeur avec liste des options');
});
