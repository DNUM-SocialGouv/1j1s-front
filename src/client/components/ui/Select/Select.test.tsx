/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Select } from '~/client/components/ui/Select/Select';
import { mapTypeDeContratToOffreEmploiCheckboxFiltre } from '~/client/utils/offreEmploi.mapper';
import { Offre } from '~/server/offres/domain/offre';

describe('Select', () => {
	describe('Select Multiple', () => {
		it('quand on clique sur le select, retourne une liste d‘options', async () => {
			//GIVEN
			const user = userEvent.setup();
			render(
				<Select
					multiple
					placeholder={'Type de contrat'}
					optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(Offre.TYPE_DE_CONTRAT_LIST)}
					label={'Type de contrat'}
				/>,
			);

			//WHEN
			const button = screen.getByRole('button', { name: 'Type de contrat' });
			await user.click(button);
			screen.getByRole('listbox');

			//THEN
			expect(screen.getByRole('checkbox', { name: 'CDD' })).toBeInTheDocument();
			expect(screen.getByRole('checkbox', { name: 'CDI' })).toBeInTheDocument();
			expect(screen.getByRole('checkbox', { name: 'Intérim' })).toBeInTheDocument();
			expect(screen.getByRole('checkbox', { name: 'Saisonnier' })).toBeInTheDocument();
		});

		it('quand on sélectionne une valeur, met la valeur sélectionnée dans l‘input', async () => {
			//GIVEN
			render(
				<Select
					multiple
					placeholder={'Type de contrat'}
					optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(Offre.TYPE_DE_CONTRAT_LIST)}
					label={'Type de contrat'}
				/>,
			);

			//WHEN
			const button = screen.getByRole('button', { name: 'Type de contrat' });
			fireEvent.click(button);
			const listbox = await screen.findByRole('listbox');
			const input = within(listbox).getAllByRole('checkbox');
			fireEvent.click(input[1]);

			//THEN
			await waitFor(async () => {
				const placeholder = await screen.findByTestId('Select-Placeholder');
				expect(placeholder.textContent).toEqual('1 choix sélectionné');
			});

			const hiddenInput = await screen.findByTestId('Select-InputHidden');
			expect(hiddenInput).toHaveValue('CDI');
		});

		it('quand on sélectionne une valeur, on appelle la fonction onChange passée au select', async () => {
			// GIVEN
			const user = userEvent.setup();
			const onChangeSpy = jest.fn();
			render(
				<Select
					multiple
					onChange={onChangeSpy}
					placeholder={'Type de contrat'}
					optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(Offre.TYPE_DE_CONTRAT_LIST)}
					label={'Type de contrat'}
				/>,
			);
			const selectInput = screen.getByRole('button', { name: 'Type de contrat' });
			await user.click(selectInput);
			const listbox = await screen.findByRole('listbox');
			const allOptions = within(listbox).getAllByRole('checkbox');

			// WHEN
			await user.click(allOptions[1]);

			// THEN
			const expectedContractType = Offre.TYPE_DE_CONTRAT_LIST[1].valeur;
			expect(onChangeSpy).toHaveBeenCalledWith(expectedContractType);
		});
	});
});

describe('Keyboard Select', () => {
	describe('Select Multiple', () => {
		it('sélectionne une option avec la touche space ET ne ferme pas la liste des options', async () => {
			const user = userEvent.setup();
			render(
				<Select
					multiple
					placeholder={'Type de contrat'}
					optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(Offre.TYPE_DE_CONTRAT_LIST)}
					label={'Type de contrat'}
				/>,
			);


			const button = screen.getByRole('button', { name: 'Type de contrat' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];
			const secondOption = within(optionList).getAllByRole('option')[1];

			expect(firstOption).toHaveFocus();

			await user.keyboard(KeyBoard.SPACE);
			const hiddenInput = await screen.findByTestId('Select-InputHidden');
			expect(hiddenInput).toHaveValue('CDD');
			expect(optionList).toBeInTheDocument();

			await user.keyboard(KeyBoard.ARROW_DOWN);
			expect(secondOption).toHaveFocus();

			await user.keyboard(KeyBoard.SPACE);
			expect(hiddenInput).toHaveValue('CDD,CDI');
			expect(optionList).toBeInTheDocument();
		});
	});
});


describe('secure test', () => {
	describe('keyboard support', () => {
		describe('quand la liste d‘options est fermée', () => {
			it('lorsque l‘utilisateur n‘intéragit pas, il ne voit pas les options', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select optionList={options} label={'Temps de travail'}/>);
				expect(screen.queryByRole('option')).not.toBeInTheDocument();
			});

			it.todo('lorsque l‘utilisateur fait "fleche du bas", la liste d‘options s‘ouvre sans changer le focus ou changer de séléction');

			it.todo('lorsque l‘utilisateur fait "Alt + fleche du bas", la liste d‘options s‘ouvre sans changer le focus ou changer de séléction');

			it.todo('lorsque l‘utilisateur fait "fleche du haut", la liste d‘options s‘ouvre et le focus visuel est placé sur la première option');

			describe('lorsque l‘utilisateur fait "Entrer"', () => {
				it('ouvre la liste d‘options', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select optionList={options} label={'label'}/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);

					expect(screen.getAllByRole('option').length).toBe(2);
				});

				it.todo('ne change pas le focus et de selection');
			});

			describe('lorsque l‘utilisateur fait "Espace"', () => {
				it('la liste d‘options s‘ouvre', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select optionList={options} label={'label'}/>);

					await user.tab();
					await user.keyboard(KeyBoard.SPACE);

					expect(screen.getAllByRole('option').length).toBe(2);
				});

				it.todo('ne change pas le focus et de selection');
			});

			it.todo('lorsque l‘utilisateur fait "Home", la liste d‘options s‘ouvre et le focus visuel est placé sur la première option');

			it.todo('lorsque l‘utilisateur fait "End", la liste d‘options s‘ouvre et le focus visuel est placé sur la dernière option');

			describe('lorsque l‘utilisateur tappe des caractères', () => {
				it.todo('lorsque l‘utilisateur tappe un seul caractère, la liste d‘options s‘ouvre et déplace le focus visuel sur l‘option qui match le caractère');

				it.todo('lorsque l‘utilisateur tappe plusieurs caractères, la liste d‘options s‘ouvre et déplace le focus visuel sur l‘option qui match les caractères');

				it.todo('lorsque l‘utilisateur tappe le même caractère plusieurs fois, la liste d‘options s‘ouvre et déplace le focus visuel sur l‘option qui commence par ce caractère');
			});
		});

		describe('quand la liste d‘options est ouverte', () => {
			it.todo('lorsque l‘utilisateur fait "Entrer", l‘option qui a le focus visuel est séléctionné et la liste d‘option se ferme');

			it('lorsque l‘utilisateur fait "Espace", l‘option qui a le focus visuel est séléctionné et la liste d‘option se ferme', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select optionList={options} label={'label'}/>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.SPACE);

				expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('2');
			});

			it.todo('lorsque l‘utilisateur fait "alt + fleche du haut", l‘option qui a le focus visuel est séléctionné et la liste d‘option se ferme');

			it.todo('lorsque l‘utilisateur fait "Tab", l‘option qui a le focus visuel est séléctionné, la liste d‘option se ferme et le focus se déplace sur le prochain élément focusable');

			it('lorsque l‘utilisateur fait "echap", ferme la liste d‘option sans séléctionner l‘option qui a le focus visuel', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select optionList={options} label={'label'}/>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ESCAPE);

				expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('');
				expect(screen.queryByRole('option')).not.toBeInTheDocument();
			});

			describe('lorsque l‘utilisateur fait "fleche du bas"', () => {
				it.todo('déplace le focus visuel sur la prochaine option');
				it.todo('lorsqu‘il est sur la dernière option, ne déplace pas le focus visuel');
			});

			describe('lorsque l‘utilisateur fait "fleche du haut"', () => {
				it.todo('déplace le focus visuel sur la précédente option');
				it.todo('lorsqu‘il est sur la première option, ne déplace pas le focus visuel');
			});

			it.todo('lorsque l‘utilisateur fait "Home", déplace le focus visuel sur la première option');

			it.todo('lorsque l‘utilisateur fait "End", déplace le focus visuel sur la dernière option');

			describe('lorsque l‘utilisateur fait "PageUp"', () => {
				it.todo('s‘il y a plus de 10 options précédentes, déplace le focus visuel de 10 options plus haut');
				it.todo('s‘il y a moins de 10 options précédentes, déplace le focus visuel sur la première option');
			});

			describe('lorsque l‘utilisateur fait "PageDown"', () => {
				it.todo('s‘il y a plus de 10 options suivantes, déplace le focus visuel de 10 options plus bas');
				it.todo('s‘il y a moins de 10 options suivantes, déplace le focus visuel sur la dernière option');
			});
		});
	});

	it('l‘utilisateur séléctionne une option avec la souris, séléctionne l‘option et ferme la liste d‘option', async () => {
		const user = userEvent.setup();
		const onChange = jest.fn();
		const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
		render(<Select optionList={options} label={'label'} onChange={onChange}/>);

		await user.click(screen.getByRole('button'));
		await user.click(screen.getByText('options 2'));

		expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('2');
		expect(screen.queryByRole('option')).not.toBeInTheDocument();
	});

	describe('props', () => {
		it('appelle onChange quand une valeur est selectionné', async () => {
			const user = userEvent.setup();
			const onChange = jest.fn();
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={options} label={'label'} onChange={onChange}/>);

			await user.tab();
			await user.keyboard(KeyBoard.ENTER);
			await user.keyboard(KeyBoard.ARROW_DOWN);
			await user.keyboard(KeyBoard.SPACE);

			// TODO (BRUJ 24/04/2024): Ne doit pas être appelé avec la valeur selectionné mais avec l'événement de changement et la nouvelle valeur
			expect(onChange).toHaveBeenCalledWith('2');
		});

		it('accepte un label et le lie au select', () => {
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={options} label={'label'}/>);

			// TODO (BRUJ 24/04/2024): devrait être un combobox
			expect(screen.getByRole('button', { name: 'label' })).toBeVisible();
		});

		it('accepte un complément label et le lie au select', () => {
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={options} label={'label'} labelComplement={'complement label'}/>);

			// TODO (BRUJ 24/04/2024): devrait être un combobox
			expect(screen.getByRole('button', { name: 'label complement label' })).toBeVisible();
		});

		it('accepte une liste d‘options', async () => {
			const user = userEvent.setup();
			const optionsList = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={optionsList} label={'label'} />);

			await user.tab();
			await user.keyboard(KeyBoard.ENTER);

			const options = screen.getAllByRole('option');
			expect(options.length).toBe(2);
			expect(options[0]).toHaveTextContent('options 1');
			expect(options[1]).toHaveTextContent('options 2');
		});

		describe('value', () => {
			it('accepte une value et initialise le select avec cette value', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select optionList={options} value={'1'} label={'label'}/>);

				expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('1');
			});

			it('lorsque la value change, le select prend la valeur de value mise à jour', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				let valueThatCanChange= '1';

				const { rerender } = render(<Select optionList={options} value={valueThatCanChange} label={'label'}/>);

				valueThatCanChange= '2';

				rerender(<Select optionList={options} value={valueThatCanChange} label={'label'}/>);
				expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('2');
			});
		});

		it('accepte un name, on peut récupérer la valeur séléctionné depuis ce nom', async () => {
			const user = userEvent.setup();
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

			render(<form aria-label={'formulaire'}>
				<Select optionList={options} label={'label'} name={'nomSelect'}/>
			</form>);

			await user.tab();
			await user.keyboard(KeyBoard.ENTER);
			await user.keyboard(KeyBoard.ARROW_DOWN);
			await user.keyboard(KeyBoard.SPACE);

			expect(screen.getByRole('form', { name: 'formulaire' })).toHaveFormValues({ nomSelect: '2' });
		});
	});
});
