/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Select } from '~/client/components/ui/Select/Select';


describe('<Select />', () => {
	describe('interaction support', () => {
		describe('quand la liste d‘options est fermée', () => {
			it('les options sont masquées', () => {
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

					expect(screen.getByRole('listbox')).toBeVisible();
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

					expect(screen.getByRole('listbox')).toBeVisible();
					expect(screen.getAllByRole('option').length).toBe(2);
				});

				it.todo('ne change pas le focus et de selection');
			});

			it.todo('lorsque l‘utilisateur fait "Home", la liste d‘options s‘ouvre et le focus visuel est placé sur la première option');

			it.todo('lorsque l‘utilisateur fait "End", la liste d‘options s‘ouvre et le focus visuel est placé sur la dernière option');

			describe('lorsque l‘utilisateur tape des caractères', () => {
				it.todo('lorsque l‘utilisateur tape un seul caractère, la liste d‘options s‘ouvre et déplace le focus visuel sur la première option qui match le caractère');

				it.todo('lorsque l‘utilisateur tape plusieurs caractères, la liste d‘options s‘ouvre et déplace le focus visuel sur la première option qui match les caractères');

				it.todo('lorsque l‘utilisateur tape le même caractère plusieurs fois, la liste d‘options s‘ouvre et déplace le focus visuel sur la première option qui commence par ce caractère');
			});
		});

		describe('simple select', () => {
			it('l‘utilisateur séléctionne une option avec la souris, séléctionne l‘option et ferme la liste d‘option', async () => {
				const user = userEvent.setup();
				const onChange = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select optionList={options} label={'label'} onChange={onChange}/>);
				const combobox = screen.getByRole('combobox', { name: 'label' });
				await user.click(combobox);
				await user.click(screen.getByRole('option', { name: 'options 2' }));

				expect(combobox).toHaveTextContent('options 2');
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

					expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
					expect(screen.queryByRole('option')).not.toBeInTheDocument();
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

					expect(screen.getByRole('combobox')).toHaveTextContent('Sélectionnez votre choix');
					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

		describe('choix multiple select', () => {
			it('l‘utilisateur séléctionne une option avec la souris, l‘option est ajoutée aux options séléctionnés et la liste d‘option ne se ferme pas', async () => {
				const user = userEvent.setup();
				const onChange = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select multiple optionList={options} label={'label'} onChange={onChange}/>);
				const inputValue = screen.getByRole('textbox', { hidden: true });

				await user.click(screen.getByRole('button'));
				await user.click(screen.getByText('options 1'));
				expect(inputValue).toHaveValue('1');

				await user.click(screen.getByText('options 2'));
				expect(inputValue).toHaveValue('1,2');

				expect(screen.getAllByRole('option').length).toBe(2);
			});

			describe('quand la liste d‘options est ouverte', () => {
				it.todo('lorsque l‘utilisateur fait "Entrer", l‘option qui a le focus visuel est ajoutée aux options séléctionnés et la liste d‘option se ferme');

				it('lorsque l‘utilisateur fait "Espace", l‘option qui a le focus visuel est ajoutée aux options séléctionnés et la liste d‘option ne se ferme pas', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select multiple optionList={options} label={'label'} value="1"/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.SPACE);

					expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('1,2');
					expect(screen.getAllByRole('option').length).toBe(2);
				});

				it.todo('lorsque l‘utilisateur fait "alt + fleche du haut", l‘option qui a le focus visuel est séléctionné et la liste d‘option se ferme');

				it.todo('lorsque l‘utilisateur fait "Tab", l‘option qui a le focus visuel est séléctionné, la liste d‘option se ferme et le focus se déplace sur le prochain élément focusable');

				it('lorsque l‘utilisateur fait "echap", ferme la liste d‘option sans séléctionner l‘option qui a le focus visuel', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select multiple optionList={options} label={'label'}/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ESCAPE);

					expect(screen.getByRole('textbox', { hidden: true })).toHaveValue('');
					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

			expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
				tagName: 'LI',
				textContent: 'options 2',
			}));
		});

		it('accepte un label et le lie au select', () => {
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={options} label={'label'}/>);

			expect(screen.getByRole('combobox', { name: 'label' })).toBeVisible();
		});

		it('accepte un complément label et le lie au select', () => {
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={options} label={'label'} labelComplement={'complement label'}/>);

			expect(screen.getByRole('combobox', { name: 'label complement label' })).toBeVisible();
		});

		it('accepte une liste d‘options', async () => {
			const user = userEvent.setup();
			const optionsList = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={optionsList} label={'label'}/>);

			await user.tab();
			await user.keyboard(KeyBoard.ENTER);

			const options = screen.getAllByRole('option');
			expect(options).toHaveLength(2);
			expect(options[0]).toHaveTextContent('options 1');
			expect(options[1]).toHaveTextContent('options 2');
		});
		it('accepte une defaultValue et initialise le select avec cette value', () => {
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
			render(<Select optionList={options} defaultValue={'1'} label={'label'}/>);

			expect(screen.getByRole('combobox')).toHaveTextContent('options 1');
		});

		describe('value', () => {
			it('lorsque la value change, le select prend la valeur de value mise à jour', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				let valueThatCanChange = '1';

				const { rerender } = render(<form role="form">
					<Select optionList={options} value={valueThatCanChange} label={'label'} name="name"/>
				</form>);

				valueThatCanChange = '2';

				rerender(<Select optionList={options} value={valueThatCanChange} label={'label'}/>);
				expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
				expect(screen.getByRole('form')).toHaveFormValues({ name: '2' });
			});
		});

		it('lorsque l‘on donne un name au select simple, on peut récupérer la valeur séléctionnée depuis ce nom', async () => {
			const user = userEvent.setup();
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

			render(<form role="form">
				<Select optionList={options} label={'label'} name={'nomSelect'}/>
			</form>);

			await user.tab();
			await user.keyboard(KeyBoard.ENTER);
			await user.keyboard(KeyBoard.ARROW_DOWN);
			await user.keyboard(KeyBoard.SPACE);

			expect(screen.getByRole('form')).toHaveFormValues({ nomSelect: '2' });
		});

		it('lorsque l‘on donne un name au select à choix multiple, on peut récupérer les valeur séléctionnées depuis ce nom', async () => {
			const user = userEvent.setup();
			const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

			render(<form aria-label={'formulaire'}>
				<Select multiple optionList={options} label={'label'} name={'nomSelect'}/>
			</form>);

			await user.tab();
			await user.keyboard(KeyBoard.ENTER);
			await user.keyboard(KeyBoard.SPACE);
			await user.keyboard(KeyBoard.ARROW_DOWN);
			await user.keyboard(KeyBoard.SPACE);

			expect(screen.getByRole('form', { name: 'formulaire' })).toHaveFormValues({ nomSelect: '1,2' });
		});
	});
});
