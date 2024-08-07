/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { FormEvent } from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Select } from '~/client/components/ui/Form/Select/Select';
import { SelectSimple } from '~/client/components/ui/Form/Select/SelectSimple';
import { mockScrollIntoView } from '~/client/components/window.mock';

const SELECT_SIMPLE_LABEL_DEFAULT_OPTION = 'Sélectionnez votre choix';
const SELECT_MULTIPLE_LABEL_DEFAULT_OPTION = 'Sélectionnez vos choix';
const DEFAULT_DEBOUNCE_TIMEOUT = 300;

describe('<Select />', () => {
	beforeAll(() => {
		mockScrollIntoView();
	});

	describe('simple select', () => {
		describe('interaction support', () => {
			describe('quand la liste d‘options est fermée', () => {
				it('les options sont masquées', () => {
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select optionList={options} label={'Temps de travail'}/>);
					expect(screen.queryByRole('option')).not.toBeInTheDocument();
					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
				});

				describe('lorsque l‘utilisateur fait "fleche du bas"', () => {
					it('la liste d‘options s‘ouvre sans changer le focus', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ARROW_DOWN);

						expect(screen.getByRole('listbox')).toBeVisible();
						expect(screen.getAllByRole('option')).toHaveLength(2);
						expect(screen.getByRole('combobox')).toHaveFocus();
					});

					it('la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						await user.click(screen.getByRole('combobox'));
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "fleche du haut"', () => {
					it('la liste d‘options s‘ouvre sans changer le focus', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ARROW_UP);

						expect(screen.getByRole('listbox')).toBeVisible();
						expect(screen.getAllByRole('option')).toHaveLength(2);
						expect(screen.getByRole('combobox')).toHaveFocus();
					});

					it('la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						await user.click(screen.getByRole('combobox'));
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.ARROW_UP);

						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "Entrer"', () => {
					it('ouvre la liste d‘options', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'label'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						expect(screen.getByRole('listbox')).toBeVisible();
					});

					it('ne change pas le focus et la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						const combobox = screen.getByRole('combobox');
						await user.click(combobox);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.ENTER);

						expect(combobox).toHaveFocus();
						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(combobox).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "Espace"', () => {
					it('la liste d‘options s‘ouvre', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'label'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.SPACE);

						expect(screen.getByRole('listbox')).toBeVisible();
						expect(screen.getAllByRole('option')).toHaveLength(2);
					});

					it('ne change pas le focus et la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						const combobox = screen.getByRole('combobox');
						await user.click(combobox);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.SPACE);

						expect(combobox).toHaveFocus();
						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(combobox).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				it('lorsque l‘utilisateur fait "Home", la liste d‘options s‘ouvre et le focus visuel est placé sur la première option', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select optionList={options} label={'Temps de travail'}/>);

					const combobox = screen.getByRole('combobox');
					await user.click(combobox);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
					expect(combobox).toHaveAttribute('aria-activedescendant', option2Id);

					await user.keyboard(KeyBoard.ESCAPE);

					await user.keyboard(KeyBoard.HOME);

					expect(screen.getByRole('listbox')).toBeVisible();
					const option1Id = screen.getByRole('option', { name: 'options 1' }).id;
					expect(combobox).toHaveAttribute('aria-activedescendant', option1Id);
				});

				it('lorsque l‘utilisateur fait "End", la liste d‘options s‘ouvre et le focus visuel est placé sur la dernière option', async () => {
					const user = userEvent.setup();
					const options = [
						{ libellé: 'options 1', valeur: '1' },
						{ libellé: 'options 2', valeur: '2' },
						{ libellé: 'options 3', valeur: '3' },
					];
					render(<Select optionList={options} label={'Temps de travail'}/>);

					const combobox = screen.getByRole('combobox');
					await user.click(combobox);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
					expect(combobox).toHaveAttribute('aria-activedescendant', option2Id);
					await user.keyboard(KeyBoard.ESCAPE);

					await user.keyboard(KeyBoard.END);
					expect(screen.getByRole('listbox')).toBeVisible();
					const option3Id = screen.getByRole('option', { name: 'options 3' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3Id);
				});

				describe('lorsque l‘utilisateur tape des caractères', () => {
					it('lorsque l‘utilisateur tape un seul caractère, la liste d‘options s‘ouvre, reste ouverte et déplace le focus visuel sur la première option qui match le caractère', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'ab', valeur: '1' },
							{ libellé: 'ha', valeur: '2' },
							{ libellé: 'bj', valeur: '3' },
						];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard('h');

						expect(screen.getByRole('listbox')).toBeVisible();
						const option2Id = screen.getByRole('option', { name: 'ha' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);

						await act(() => delay(DEFAULT_DEBOUNCE_TIMEOUT));
						await user.keyboard('a');

						const option1Id = screen.getByRole('option', { name: 'ab' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
						expect(screen.getByRole('listbox')).toBeVisible();
					});

					it('lorsque l‘utilisateur tape plusieurs caractères, la liste d‘options s‘ouvre et déplace le focus visuel sur la première option qui match les caractères', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'abc', valeur: '1' },
							{ libellé: 'abd', valeur: '2' },
							{ libellé: 'ac', valeur: '3' },
						];
						render(<Select optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard('abd');

						expect(screen.getByRole('listbox')).toBeVisible();
						const option2Id = screen.getByRole('option', { name: 'abd' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);

						await act(() => delay(DEFAULT_DEBOUNCE_TIMEOUT));
						await user.keyboard('abc');

						const option1Id = screen.getByRole('option', { name: 'abc' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
						expect(screen.getByRole('listbox')).toBeVisible();
					});
				});
			});

			it('l‘utilisateur séléctionne une option avec la souris, séléctionne l‘option et ferme la liste d‘option', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<form aria-label={'form'}>
					<Select
						optionList={options}
						label={'label'}
						name={'name'}/>
				</form>);
				const combobox = screen.getByRole('combobox', { name: 'label' });
				await user.click(combobox);
				await user.click(screen.getByRole('option', { name: 'options 2' }));

				expect(screen.getByRole('option', {
					hidden: true,
					name: 'options 2',
				})).toHaveAttribute('aria-selected', 'true');
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
				expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ name: '2' });
			});

			describe('quand la liste d‘options est ouverte', () => {
				it('lorsque l‘utilisateur fait "Entrer", l‘option qui a le focus visuel est séléctionnée la liste d‘option se ferme et le placeholder se met à jour', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<form aria-label="form">
						<Select optionList={options} label={'label'} name={'select'}/>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ENTER);

					expect(screen.getByRole('option', {
						hidden: true,
						name: 'options 2',
					})).toHaveAttribute('aria-selected', 'true');
					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
					expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '2' });
				});

				it('lorsque l‘utilisateur fait "Espace", l‘option qui a le focus visuel est séléctionné, la liste d‘option se ferme et le placeholder se met à jour', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<form aria-label="form">
						<Select optionList={options} label={'label'} name="select"/>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.SPACE);

					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(screen.getByRole('option', {
						hidden: true,
						name: 'options 2',
					})).toHaveAttribute('aria-selected', 'true');
					expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
					expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '2' });
				});

				it('lorsque l‘utilisateur fait "alt + fleche du haut", l‘option qui a le focus visuel est séléctionné et la liste d‘option se ferme', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<form aria-label="form">
						<Select optionList={options} label={'label'} name="select"/>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ALT_AND_ARROW_UP);

					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(screen.getByRole('option', {
						hidden: true,
						name: 'options 2',
					})).toHaveAttribute('aria-selected', 'true');
					expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
					expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '2' });
				});

				it('lorsque l‘utilisateur fait "Tab", l‘option qui a le focus visuel est séléctionné, la liste d‘option se ferme, le placeholder se met à jour et le focus se déplace sur le prochain élément focusable', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<form aria-label="form">
						<Select optionList={options} label={'label'} name="select"/>
						<input aria-label="input label"/>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.tab();

					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
					expect(screen.getByRole('option', {
						hidden: true,
						name: 'options 2',
					})).toHaveAttribute('aria-selected', 'true');
					expect(screen.getByRole('textbox', { name: 'input label' })).toHaveFocus();
					expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '2' });
				});

				it('lorsque l‘utilisateur fait "echap", ferme la liste d‘option sans séléctionner l‘option qui a le focus visuel', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<form aria-label="form">
						<Select optionList={options} label={'label'} name="select"/>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ESCAPE);

					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(screen.getByRole('combobox')).toHaveTextContent('Sélectionnez votre choix');
					expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '' });
				});

				describe('lorsque l‘utilisateur fait "fleche du bas"', () => {
					it('déplace le focus visuel sur la prochaine option sans la séléctionner', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<form aria-label="form">
							<Select optionList={options} label={'label'} name="select"/>
						</form>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						const option2 = screen.getByRole('option', { name: 'options 2' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2.id);
						expect(option2).toHaveAttribute('aria-selected', 'false');
						expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '' });
					});

					it('lorsque le focus visuel est déjà sur la dernière option, ne déplace pas le focus visuel', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'label'} name="select"/>);
						const combobox = screen.getByRole('combobox');

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(combobox).toHaveAttribute('aria-activedescendant', option2Id);

						await user.keyboard(KeyBoard.ARROW_DOWN);
						expect(combobox).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "fleche du haut"', () => {
					it('déplace le focus visuel sur la précédente option sans la séléctionner', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<form aria-label="form"><Select optionList={options} label={'label'} name="select"/></form>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						await user.keyboard(KeyBoard.ARROW_UP);

						const option1 = screen.getByRole('option', { name: 'options 1' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1.id);
						expect(option1).toHaveAttribute('aria-selected', 'false');
						expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '' });
					});

					it('lorsqu‘il est sur la première option, ne déplace pas le focus visuel', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						await user.keyboard(KeyBoard.ARROW_UP);
						const option1Id = screen.getByRole('option', { name: 'options 1' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
					});
				});

				it('lorsque l‘utilisateur fait "Home", déplace le focus visuel sur la première option sans la selectionner', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select optionList={options} label={'label'} name="select"/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);

					await user.keyboard(KeyBoard.HOME);
					const option1 = screen.getByRole('option', { name: 'options 1' });
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1.id);
					expect(option1).toHaveAttribute('aria-selected', 'false');
				});

				it('lorsque l‘utilisateur fait "End", déplace le focus visuel sur la dernière option sans la selectionner', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' },
						{ libellé: 'options 2', valeur: '2' },
						{ libellé: 'options 3', valeur: '3' }];
					render(<Select optionList={options} label={'label'} name="select"/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);

					await user.keyboard(KeyBoard.END);
					const option3 = screen.getByRole('option', { name: 'options 3' });
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3.id);
					expect(option3).toHaveAttribute('aria-selected', 'false');

				});

				describe('lorsque l‘utilisateur fait "PageUp"', () => {
					it('s‘il y a plus de 10 options précédentes, déplace le focus visuel de 10 options plus haut', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
							{ libellé: 'options 4', valeur: '4' },
							{ libellé: 'options 5', valeur: '5' },
							{ libellé: 'options 6', valeur: '6' },
							{ libellé: 'options 7', valeur: '7' },
							{ libellé: 'options 8', valeur: '8' },
							{ libellé: 'options 9', valeur: '9' },
							{ libellé: 'options 10', valeur: '10' },
							{ libellé: 'options 11', valeur: '11' },
							{ libellé: 'options 12', valeur: '12' },
						];
						render(<Select optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.END);
						const option12 = screen.getByRole('option', { name: 'options 12' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option12.id);

						await user.keyboard(KeyBoard.PAGE_UP);
						const option2 = screen.getByRole('option', { name: 'options 2' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2.id);
						expect(option2).toHaveAttribute('aria-selected', 'false');
					});

					it('s‘il y a moins de 10 options précédentes, déplace le focus visuel sur la première option', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
						];
						render(<Select optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						await user.keyboard(KeyBoard.PAGE_UP);
						const option1 = screen.getByRole('option', { name: 'options 1' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1.id);
						expect(option1).toHaveAttribute('aria-selected', 'false');
					});
				});

				describe('lorsque l‘utilisateur fait "PageDown"', () => {
					it('s‘il y a plus de 10 options suivantes, déplace le focus visuel de 10 options plus bas', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
							{ libellé: 'options 4', valeur: '4' },
							{ libellé: 'options 5', valeur: '5' },
							{ libellé: 'options 6', valeur: '6' },
							{ libellé: 'options 7', valeur: '7' },
							{ libellé: 'options 8', valeur: '8' },
							{ libellé: 'options 9', valeur: '9' },
							{ libellé: 'options 10', valeur: '10' },
							{ libellé: 'options 11', valeur: '11' },
						];
						render(<Select optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						await user.keyboard(KeyBoard.PAGE_DOWN);
						const option11 = screen.getByRole('option', { name: 'options 11' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option11.id);
						expect(option11).toHaveAttribute('aria-selected', 'false');
					});

					it('s‘il y a moins de 10 options suivantes, déplace le focus visuel sur la dernière option', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
							{ libellé: 'options 4', valeur: '4' },
						];
						render(<Select optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						await user.keyboard(KeyBoard.PAGE_DOWN);
						const option4 = screen.getByRole('option', { name: 'options 4' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option4.id);
						expect(option4).toHaveAttribute('aria-selected', 'false');
					});
				});

				it('lorsque l‘option active change, scroll jusqu’à la nouvelle option active', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' },
						{ libellé: 'options 2', valeur: '2' },
						{ libellé: 'options 3', valeur: '3' }];
					render(<Select optionList={options} label={'label'} name="select"/>);

					const option = screen.getByRole('option', { hidden: true, name: 'options 2' });
					option.scrollIntoView = jest.fn();

					const input = screen.getByRole('combobox');
					await user.click(input);
					await user.keyboard(KeyBoard.ARROW_DOWN);

					expect(option.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: 'nearest' }));
				});
			});
		});

		describe('label de l‘option séléctionné (placeholder)', () => {
			it('affiche le placeholder lorsqu‘un placeholder est donné en props', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select optionList={options} label={'label'} placeholder={'placeholder'}/>);

				expect(screen.getByRole('combobox')).toHaveTextContent('placeholder');
			});

			it('lorsqu‘aucune option est séléctionnée, je vois le placeholder par défaut', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select optionList={options} label={'label'}/>);

				expect(screen.getByRole('combobox')).toHaveTextContent(SELECT_SIMPLE_LABEL_DEFAULT_OPTION);
			});

			it('lorsqu‘une option est séléctionnée, je vois le libellé de l‘option dans le placeholder', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select optionList={options} label={'label'}/>);

				await user.click(screen.getByRole('combobox'));
				await user.click(screen.getByRole('option', { name: 'options 1' }));

				expect(screen.getByRole('combobox')).toHaveTextContent('options 1');
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
				const option = screen.getByRole('option', { name: 'options 2' });
				await user.click(option);

				expect(onChange).toHaveBeenCalledWith(option);
			});

			it('lorsque la value change, le select prend la valeur de value mise à jour', async () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				let valueThatCanChange = '1';

				const { rerender } = render(<form role="form">
					<Select optionList={options} value={valueThatCanChange} label={'label'} name="name"/>
				</form>);

				valueThatCanChange = '2';

				rerender(<form role="form" aria-label={'test'}>
					<Select optionList={options} value={valueThatCanChange} label={'label'} name="name"/>
				</form>);

				expect(screen.getByRole('combobox')).toHaveTextContent('options 2');
				expect(screen.getByRole('form', { name: 'test' })).toHaveFormValues({ name: '2' });
			});

			it('accepte une defaultValue et initialise le select avec cette value', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select optionList={options} defaultValue={'1'} label={'label'}/>);

				expect(screen.getByRole('combobox')).toHaveTextContent('options 1');
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

			it('lorsque l‘on donne un name, on peut récupérer la valeur séléctionnée depuis ce nom', async () => {
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
		});

		describe('erreur', () => {
			it('lorsque le champ est requis mais pas touché, je ne vois pas le message d‘erreur', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select optionList={options} label={'label'} required/>);

				expect(screen.queryByText('Séléctionnez un élément de la liste')).not.toBeInTheDocument();
				expect(screen.getByRole('combobox')).toHaveAccessibleDescription('');
			});

			it('lorsque le champ est requis et que l‘utilisateur n‘a pas séléctionné d‘option, il ne peux pas soumettre le formulaire', async () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const onSubmit = jest.fn();
				const user = userEvent.setup();

				render(<form onSubmit={onSubmit}><Select optionList={options} label={'label'} required/>
					<button>Submit</button>
				</form>);

				await user.click(screen.getByRole('button', { name: 'Submit' }));
				expect(onSubmit).not.toHaveBeenCalled();
			});

			it('lorsque le champ est requis et que l‘utilisateur ouvre puis ferme le select, appelle onInvalid et affiche le message d‘erreur', async () => {
				const user = userEvent.setup();
				const onInvalid = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select optionList={options} label={'label'} required onInvalid={onInvalid}/>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ESCAPE);

				expect(screen.getByText('Séléctionnez un élément de la liste')).toBeVisible();
				expect(onInvalid).toHaveBeenCalledTimes(1);
			});

			it('lorsque le champ est requis et en erreur, le message d‘erreur est fusionné avec la description accessible', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<>
					<Select required optionList={options} label={'label'} aria-describedby={'id1'}/>
					<p id={'id1'}>La description accessible</p>
				</>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ESCAPE);

				expect(screen.getByRole('combobox')).toHaveAccessibleDescription('La description accessible Séléctionnez un élément de la liste');
			});

			it('lorsque le champ est requis et en erreur, lorsque l‘utilisateur séléctionne une option le champ n‘est plus en erreur', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const onInvalid = jest.fn();

				render(<>
					<Select optionList={options} label={'label'} required onInvalid={onInvalid}/>
				</>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ESCAPE);

				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				expect(onInvalid).toHaveBeenCalledTimes(1);
				expect(screen.getByRole('combobox')).toHaveAccessibleDescription('');
				expect(screen.queryByText('Séléctionnez un élément de la liste')).not.toBeInTheDocument();
			});
		});

		describe('touched', () => {
			it('lorsque l‘utilisateur n‘a pas interragit avec le champ, le select n‘est pas touched', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const onTouch = jest.fn();

				render(<Select optionList={options} label={'label'} onTouch={onTouch}/>);

				const combobox = screen.getByRole('combobox');
				expect(onTouch).not.toHaveBeenCalled();
				expect(combobox).toHaveAttribute('data-touched', 'false');
			});
			
			it('lorsque l‘utilisateur ouvre puis ferme le select, le select est touched', async() => {
				const user = userEvent.setup();
				const onTouch = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select optionList={options} label={'label'} onTouch={onTouch}/>);

				const combobox = screen.getByRole('combobox');
				await user.click(combobox);
				await user.keyboard(KeyBoard.ESCAPE);

				expect(onTouch).toHaveBeenCalledWith(true);
				expect(combobox).toHaveAttribute('data-touched', 'true');
			});
			
			it('lorsque l‘utilisateur ouvre puis selectionne une option, le select est touched', async() => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const onTouch = jest.fn();

				render(<Select optionList={options} label={'label'} onTouch={onTouch}/>);

				const combobox = screen.getByRole('combobox');
				await user.click(combobox);
				await user.click(screen.getByRole('option', { name: 'options 1' }));

				expect(onTouch).toHaveBeenCalledWith(true);
				expect(combobox).toHaveAttribute('data-touched', 'true');
			});
		});
	});

	describe('select choix multiple', () => {
		describe('interaction support', () => {
			describe('quand la liste d‘options est fermée', () => {
				it('les options sont masquées', () => {
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select multiple optionList={options} label={'Temps de travail'}/>);
					expect(screen.queryByRole('option')).not.toBeInTheDocument();
				});

				describe('lorsque l‘utilisateur fait "fleche du bas"', () => {
					it('la liste d‘options s‘ouvre sans changer le focus ou changer de séléction', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ARROW_DOWN);

						expect(screen.getByRole('listbox')).toBeVisible();
						expect(screen.getAllByRole('option')).toHaveLength(2);
						expect(screen.getByRole('combobox')).toHaveFocus();
					});

					it('la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.click(screen.getByRole('combobox'));
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;

						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "fleche du haut"', () => {
					it('la liste d‘options s‘ouvre sans changer le focus ou changer de séléction', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ARROW_UP);

						expect(screen.getByRole('listbox')).toBeVisible();
						expect(screen.getAllByRole('option')).toHaveLength(2);
						expect(screen.getByRole('combobox')).toHaveFocus();
					});

					it('la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.click(screen.getByRole('combobox'));
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.ARROW_UP);

						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "Entrer"', () => {
					it('ouvre la liste d‘options', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'label'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						expect(screen.getByRole('listbox')).toBeVisible();
					});

					it('ne change pas le focus et la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.click(screen.getByRole('combobox'));
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.ENTER);

						expect(screen.getByRole('combobox')).toHaveFocus();
						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				describe('lorsque l‘utilisateur fait "Espace"', () => {
					it('la liste d‘options s‘ouvre', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'label'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.SPACE);

						expect(screen.getByRole('listbox')).toBeVisible();
						expect(screen.getAllByRole('option')).toHaveLength(2);
					});

					it('ne change pas le focus et la précédente option qui avait le focus visuel est conservée', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.click(screen.getByRole('combobox'));
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ESCAPE);
						await user.keyboard(KeyBoard.SPACE);

						expect(screen.getByRole('combobox')).toHaveFocus();
						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});
				});

				it('lorsque l‘utilisateur fait "Home", la liste d‘options s‘ouvre et le focus visuel est placé sur la première option', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<Select multiple optionList={options} label={'Temps de travail'}/>);

					await user.click(screen.getByRole('combobox'));
					await user.keyboard(KeyBoard.ARROW_DOWN);
					const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);

					await user.keyboard(KeyBoard.ESCAPE);

					await user.keyboard(KeyBoard.HOME);
					expect(screen.getByRole('combobox')).toHaveFocus();
					const option1Id = screen.getByRole('option', { name: 'options 1' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
				});

				it('lorsque l‘utilisateur fait "End", la liste d‘options s‘ouvre et le focus visuel est placé sur la dernière option', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, {
						libellé: 'options 2',
						valeur: '2',
					}, { libellé: 'options 3', valeur: '3' }];
					render(<Select multiple optionList={options} label={'Temps de travail'}/>);

					await user.click(screen.getByRole('combobox'));
					await user.keyboard(KeyBoard.ARROW_DOWN);
					const option2Id = screen.getByRole('option', { name: 'options 2' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);

					await user.keyboard(KeyBoard.ESCAPE);

					await user.keyboard(KeyBoard.END);
					expect(screen.getByRole('combobox')).toHaveFocus();
					const option3Id = screen.getByRole('option', { name: 'options 3' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3Id);
				});

				describe('lorsque l‘utilisateur tape des caractères', () => {
					it('lorsque l‘utilisateur tape un seul caractère, la liste d‘options s‘ouvre, reste ouverte et déplace le focus visuel sur la première option qui match le caractère', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'ab', valeur: '1' },
							{ libellé: 'ha', valeur: '2' },
							{ libellé: 'bj', valeur: '3' },
						];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard('h');

						expect(screen.getByRole('listbox')).toBeVisible();
						const option2Id = screen.getByRole('option', { name: 'ha' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);

						await act(() => delay(DEFAULT_DEBOUNCE_TIMEOUT));
						await user.keyboard('a');

						const option1Id = screen.getByRole('option', { name: 'ab' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
						expect(screen.getByRole('listbox')).toBeVisible();
					});

					it('lorsque l‘utilisateur tape plusieurs caractères, la liste d‘options s‘ouvre et déplace le focus visuel sur la première option qui match les caractères', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'abc', valeur: '1' },
							{ libellé: 'abd', valeur: '2' },
							{ libellé: 'ac', valeur: '3' },
						];
						render(<Select multiple optionList={options} label={'Temps de travail'}/>);

						await user.tab();
						await user.keyboard('abd');

						expect(screen.getByRole('listbox')).toBeVisible();
						const option2Id = screen.getByRole('option', { name: 'abd' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);

						await act(() => delay(DEFAULT_DEBOUNCE_TIMEOUT));
						await user.keyboard('abc');

						const option1Id = screen.getByRole('option', { name: 'abc' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
						expect(screen.getByRole('listbox')).toBeVisible();
					});
				});
			});

			it('l‘utilisateur séléctionne une option avec la souris, l‘option est ajoutée aux options séléctionnés', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				let selectValues;

				render(<form aria-label="form" onSubmit={(formEvent) => {
					selectValues = getAllFormData(formEvent, 'name');
				}}>
					<Select multiple optionList={options} label={'label'} name={'name'}/>
					<button>Submit</button>
				</form>);

				await user.click(screen.getByRole('combobox'));

				await user.click(screen.getByRole('option', { name: 'options 1' }));

				await user.click(screen.getByRole('option', { name: 'options 2' }));
				await user.click(screen.getByRole('button', { name: 'Submit' }));
				expect(selectValues).toEqual(['1', '2']);
			});

			it('l‘utilisateur séléctionne une option avec la souris, l‘option prend l‘attribut aria-selected et la liste d‘option ne se ferme pas', async () => {
				const user = userEvent.setup();
				const onChange = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<form aria-label="form">
					<Select multiple optionList={options} label={'label'} onChange={onChange} name={'name'}/>
				</form>);

				await user.click(screen.getByRole('combobox'));

				const option1 = screen.getByRole('option', { name: 'options 1' });
				await user.click(option1);
				expect(screen.getByRole('listbox')).toBeVisible();

				const option2 = screen.getByRole('option', { name: 'options 2' });
				await user.click(option2);

				expect(option1).toHaveAttribute('aria-selected', 'true');
				expect(option2).toHaveAttribute('aria-selected', 'true');
			});

			describe('quand la liste d‘options est ouverte', () => {
				it('lorsque l‘utilisateur fait "Entrer", l‘option qui a le focus visuel est ajoutée aux options séléctionnés et la liste d‘option se ferme', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					let selectValues;

					render(<form aria-label="form" onSubmit={(formEvent) => {
						selectValues = getAllFormData(formEvent, 'name');
					}}>
						<Select multiple optionList={options} label={'label'} name={'name'} defaultValue={['1']}/>
						<button>Submit</button>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ENTER);

					await user.click(screen.getByRole('button', { name: 'Submit' }));
					expect(selectValues).toEqual(['1', '2']);
					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
				});

				it('lorsque l‘utilisateur fait "Espace", l‘option qui a le focus visuel est ajoutée aux options séléctionnés et la liste d‘option ne se ferme pas', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					let selectValues;
					render(<form aria-label="form" onSubmit={(formEvent) => {
						selectValues = getAllFormData(formEvent, 'name');
					}}>
						<Select multiple optionList={options} label={'label'} name={'name'} defaultValue={['1']}/>
						<button>Submit</button>
					</form>);

					await user.click(screen.getByRole('combobox'));

					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.SPACE);

					await user.click(screen.getByRole('button', { name: 'Submit' }));
					expect(selectValues).toEqual(['1', '2']);
				});

				it('lorsque l‘utilisateur fait "alt + fleche du haut", l‘option qui a le focus visuel est séléctionné et la liste d‘option se ferme', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					render(<form aria-label="form">
						<Select multiple optionList={options} label={'label'} name="select"/>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ALT_AND_ARROW_UP);

					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(screen.getByRole('option', {
						hidden: true,
						name: 'options 2',
					})).toHaveAttribute('aria-selected', 'true');
					expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ select: '2' });
				});

				describe('lorsque l‘utilisateur fait "Tab"', () => {
					it('sur une option pas encore séléctionnée, l‘option qui a le focus visuel n‘est pas séléctionnée, la liste d‘option se ferme et le focus se déplace sur le prochain élément focusable', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

						render(<form aria-label="form">
							<Select multiple optionList={options} label={'label'} name={'name'}/>
							<input aria-label={'input label'}/>
						</form>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.tab();

						expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ name: '' });
						expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
						expect(screen.getByRole('textbox', { name: 'input label' })).toHaveFocus();
					});

					it('sur une option pas déjà séléctionnée, l‘option qui a le focus visuel reste séléctionnée, la liste d‘option se ferme et le focus se déplace sur le prochain élément focusable', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

						render(<form aria-label="form">
							<Select multiple optionList={options} label={'label'} name={'name'}/>
							<input aria-label={'input label'}/>
						</form>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.SPACE);
						await user.tab();

						expect(screen.getByRole('form', { name: 'form' })).toHaveFormValues({ name: '2' });
						expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
						expect(screen.getByRole('textbox', { name: 'input label' })).toHaveFocus();
					});
				});

				it('lorsque l‘utilisateur fait "echap", ferme la liste d‘option sans séléctionner l‘option qui a le focus visuel', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
					let selectValues;
					render(<form aria-label="form" onSubmit={(formEvent) => {
						selectValues = getAllFormData(formEvent, 'name');
					}}>
						<Select multiple optionList={options} label={'label'} name={'name'} defaultValue={['1']}/>
						<button>Submit</button>
					</form>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ESCAPE);

					await user.click(screen.getByRole('button', { name: 'Submit' }));
					expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
					expect(selectValues).toEqual(['1']);
				});

				describe('lorsque l‘utilisateur fait "fleche du bas"', () => {
					it('déplace le focus visuel sur la prochaine option', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

						render(<Select multiple optionList={options} label={'label'} name={'name'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						const option2Id = screen.getByRole('option', { name: 'options 2' }).id;

						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2Id);
					});

					it('lorsqu‘il est sur la dernière option, ne déplace pas le focus visuel', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, {
							libellé: 'options 2',
							valeur: '2',
						}, { libellé: 'options 3', valeur: '3' }];

						render(<Select multiple optionList={options} label={'label'} name={'name'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						const option3Id = screen.getByRole('option', { name: 'options 3' }).id;
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3Id);

						await user.keyboard(KeyBoard.ARROW_DOWN);
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3Id);
					});
				});

				describe('lorsque l‘utilisateur fait "fleche du haut"', () => {
					it('déplace le focus visuel sur la précédente option', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

						render(<Select multiple optionList={options} label={'label'} name={'name'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						await user.keyboard(KeyBoard.ARROW_UP);

						const option1Id = screen.getByRole('option', { name: 'options 1' }).id;

						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
					});

					it('lorsqu‘il est sur la première option, ne déplace pas le focus visuel', async () => {
						const user = userEvent.setup();
						const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

						render(<Select multiple optionList={options} label={'label'} name={'name'}/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						await user.keyboard(KeyBoard.ARROW_UP);

						const option1Id = screen.getByRole('option', { name: 'options 1' }).id;

						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
					});
				});

				it('lorsque l‘utilisateur fait "Home", déplace le focus visuel sur la première option', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, {
						libellé: 'options 2',
						valeur: '2',
					}, { libellé: 'options 3', valeur: '3' }];

					render(<Select multiple optionList={options} label={'label'} name={'name'}/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					await user.keyboard(KeyBoard.ARROW_DOWN);
					const option3Id = screen.getByRole('option', { name: 'options 3' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3Id);

					await user.keyboard(KeyBoard.HOME);
					const option1Id = screen.getByRole('option', { name: 'options 1' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1Id);
				});

				it('lorsque l‘utilisateur fait "End", déplace le focus visuel sur la dernière option', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' }, {
						libellé: 'options 2',
						valeur: '2',
					}, { libellé: 'options 3', valeur: '3' }];

					render(<Select multiple optionList={options} label={'label'} name={'name'}/>);

					await user.tab();
					await user.keyboard(KeyBoard.ENTER);

					await user.keyboard(KeyBoard.END);
					const option3Id = screen.getByRole('option', { name: 'options 3' }).id;
					expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option3Id);
				});

				describe('lorsque l‘utilisateur fait "PageUp"', () => {
					it('s‘il y a plus de 10 options précédentes, déplace le focus visuel de 10 options plus haut', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
							{ libellé: 'options 4', valeur: '4' },
							{ libellé: 'options 5', valeur: '5' },
							{ libellé: 'options 6', valeur: '6' },
							{ libellé: 'options 7', valeur: '7' },
							{ libellé: 'options 8', valeur: '8' },
							{ libellé: 'options 9', valeur: '9' },
							{ libellé: 'options 10', valeur: '10' },
							{ libellé: 'options 11', valeur: '11' },
							{ libellé: 'options 12', valeur: '12' },
						];
						render(<Select multiple optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.END);
						const option12 = screen.getByRole('option', { name: 'options 12' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option12.id);

						await user.keyboard(KeyBoard.PAGE_UP);
						const option2 = screen.getByRole('option', { name: 'options 2' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option2.id);
						expect(option2).toHaveAttribute('aria-selected', 'false');
					});

					it('s‘il y a moins de 10 options précédentes, déplace le focus visuel sur la première option', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
						];
						render(<Select multiple optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);
						await user.keyboard(KeyBoard.ARROW_DOWN);
						await user.keyboard(KeyBoard.ARROW_DOWN);

						await user.keyboard(KeyBoard.PAGE_UP);
						const option1 = screen.getByRole('option', { name: 'options 1' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option1.id);
						expect(option1).toHaveAttribute('aria-selected', 'false');
					});
				});

				describe('lorsque l‘utilisateur fait "PageDown"', () => {
					it('s‘il y a plus de 10 options suivantes, déplace le focus visuel de 10 options plus bas', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
							{ libellé: 'options 4', valeur: '4' },
							{ libellé: 'options 5', valeur: '5' },
							{ libellé: 'options 6', valeur: '6' },
							{ libellé: 'options 7', valeur: '7' },
							{ libellé: 'options 8', valeur: '8' },
							{ libellé: 'options 9', valeur: '9' },
							{ libellé: 'options 10', valeur: '10' },
							{ libellé: 'options 11', valeur: '11' },
						];
						render(<Select multiple optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						await user.keyboard(KeyBoard.PAGE_DOWN);
						const option11 = screen.getByRole('option', { name: 'options 11' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option11.id);
						expect(option11).toHaveAttribute('aria-selected', 'false');
					});

					it('s‘il y a moins de 10 options suivantes, déplace le focus visuel sur la dernière option', async () => {
						const user = userEvent.setup();
						const options = [
							{ libellé: 'options 1', valeur: '1' },
							{ libellé: 'options 2', valeur: '2' },
							{ libellé: 'options 3', valeur: '3' },
							{ libellé: 'options 4', valeur: '4' },
						];
						render(<Select multiple optionList={options} label={'label'} name="select"/>);

						await user.tab();
						await user.keyboard(KeyBoard.ENTER);

						await user.keyboard(KeyBoard.PAGE_DOWN);
						const option4 = screen.getByRole('option', { name: 'options 4' });
						expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', option4.id);
						expect(option4).toHaveAttribute('aria-selected', 'false');
					});
				});

				it('lorsque l‘option active change, scroll jusqu’à la nouvelle option active', async () => {
					const user = userEvent.setup();
					const options = [{ libellé: 'options 1', valeur: '1' },
						{ libellé: 'options 2', valeur: '2' },
						{ libellé: 'options 3', valeur: '3' }];
					render(<Select multiple optionList={options} label={'label'} name="select"/>);

					const option = screen.getByRole('option', { hidden: true, name: 'options 2' });
					option.scrollIntoView = jest.fn();

					const input = screen.getByRole('combobox');
					await user.click(input);
					await user.keyboard(KeyBoard.ARROW_DOWN);

					expect(option.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: 'nearest' }));
				});
			});
		});

		describe('label options séléctionnées (placeholder)', () => {
			it('lorsqu‘aucune option est séléctionnée, je vois le placeholder par défaut', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple optionList={options} label={'label'}/>);

				expect(screen.getByRole('combobox')).toHaveTextContent(SELECT_MULTIPLE_LABEL_DEFAULT_OPTION);
			});

			it('lorsqu‘une seule option est séléctionnée, je vois dans le placeholder au singulier', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple optionList={options} label={'label'}/>);

				await user.click(screen.getByRole('combobox'));
				await user.click(screen.getByRole('option', { name: 'options 1' }));

				expect(screen.getByRole('combobox')).toHaveTextContent('1 choix séléctionné');
			});

			it('lorsqu‘au moins deux options sont séléctionnées, je vois le nombre d‘options séléctionnées au pluriel dans le placeholder', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple optionList={options} label={'label'}/>);

				await user.click(screen.getByRole('combobox'));
				await user.click(screen.getByRole('option', { name: 'options 1' }));
				await user.click(screen.getByRole('option', { name: 'options 2' }));

				expect(screen.getByRole('combobox')).toHaveTextContent('2 choix séléctionnés');
			});
		});

		describe('props', () => {
			it('appelle onChange quand une valeur est selectionné', async () => {
				const user = userEvent.setup();
				const onChange = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select multiple optionList={options} label={'label'} onChange={onChange}/>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.SPACE);

				expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
					tagName: 'LI',
					textContent: 'options 2',
				}));
			});

			it('lorsque la value change, le select prend la valeur de value mise à jour', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const valueThatCanChange = ['1'];
				let selectValues;
				const { rerender } = render(<form role="form">
					<Select multiple optionList={options} value={valueThatCanChange} label={'label'} name="name"/>
				</form>);

				valueThatCanChange.push('2');

				rerender(<form role="form" aria-label={'test'} onSubmit={(formEvent) => {
					selectValues = getAllFormData(formEvent, 'name');
				}}>
					<Select multiple optionList={options} value={valueThatCanChange} label={'label'} name="name"/>
					<button>Submit</button>
				</form>);
				await user.click(screen.getByRole('button', { name: 'Submit' }));

				expect(selectValues).toEqual(['1', '2']);
			});

			it('accepte une defaultValue et initialise le select avec cette value', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				let selectValues;

				render(<form role="form" aria-label={'test'} onSubmit={(formEvent) => {
					selectValues = getAllFormData(formEvent, 'name');
				}}>
					<Select multiple optionList={options} label={'label'} name="name" defaultValue={['1', '2']}/>
					<button>Submit</button>
				</form>);

				await user.click(screen.getByRole('button', { name: 'Submit' }));

				expect(selectValues).toEqual(['1', '2']);
			});

			it('accepte un label et le lie au select', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select multiple optionList={options} label={'label'}/>);

				expect(screen.getByRole('combobox', { name: 'label' })).toBeVisible();
			});

			it('accepte un complément label et le lie au select', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select multiple optionList={options} label={'label'} labelComplement={'complement label'}/>);

				expect(screen.getByRole('combobox', { name: 'label complement label' })).toBeVisible();
			});

			it('accepte une liste d‘options', async () => {
				const user = userEvent.setup();
				const optionsList = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				render(<Select multiple optionList={optionsList} label={'label'}/>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);

				const options = screen.getAllByRole('option');
				expect(options).toHaveLength(2);
				expect(options[0]).toHaveTextContent('options 1');
				expect(options[1]).toHaveTextContent('options 2');
			});
		});

		describe('erreur', () => {
			it('lorsque le champ est requis mais pas touché, je ne vois le message d‘erreur', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple optionList={options} label={'label'} required/>);

				expect(screen.queryByText('Séléctionnez au moins un élément de la liste')).not.toBeInTheDocument();
				expect(screen.getByRole('combobox')).toHaveAccessibleDescription('');
			});

			it('lorsque le champ est requis et que l‘utilisateur n‘a pas séléctionné d‘option, il ne peux pas soumettre le formulaire', async () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const onSubmit = jest.fn();
				const user = userEvent.setup();

				render(<form onSubmit={onSubmit}>
					<Select multiple optionList={options} label={'label'} required/>
					<button>Submit</button>
				</form>);

				await user.click(screen.getByRole('button', { name: 'Submit' }));
				expect(onSubmit).not.toHaveBeenCalled();
			});

			it('lorsque le champ est requis et que l‘utilisateur ouvre puis ferme le select sans selectionner d‘option, appelle onInvalid et affiche le message d‘erreur', async () => {
				const user = userEvent.setup();
				const onInvalid = jest.fn();

				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple required optionList={options} label={'label'} onInvalid={onInvalid}/>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ESCAPE);
				expect(screen.getByText('Séléctionnez au moins un élément de la liste')).toBeVisible();
				expect(onInvalid).toHaveBeenCalledTimes(1);
			});

			it('lorsque le champ est requis et en erreur, le message d‘erreur est fusionné avec la description accessible', async () => {
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<>
					<Select multiple required optionList={options} label={'label'} aria-describedby={'id1'}/>
					<p id={'id1'}>La description accessible</p>
				</>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ESCAPE);

				expect(screen.getByRole('combobox')).toHaveAccessibleDescription('La description accessible Séléctionnez au moins un élément de la liste');
			});

			it('lorsque le champ est requis et en erreur, lorsque l‘utilisateur séléctionne une option le champ n‘est plus en erreur', async () => {
				const onInvalid = jest.fn();
				const user = userEvent.setup();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<>
					<Select multiple optionList={options} label={'label'} required aria-describedby={'id1'} onInvalid={onInvalid}/>
					<p id={'id1'}>La description accessible</p>
				</>);

				await user.tab();
				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ESCAPE);

				await user.keyboard(KeyBoard.ENTER);
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				expect(screen.queryByText('Séléctionnez au moins un élément de la liste')).not.toBeInTheDocument();
				expect(onInvalid).toHaveBeenCalledTimes(1);
			});
		});

		describe('touched', () => {
			it('lorsque l‘utilisateur n‘a pas interragit avec le champ, le select n‘est pas touched', () => {
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];
				const onTouch = jest.fn();

				render(<Select multiple optionList={options} label={'label'} onTouch={onTouch}/>);

				const combobox = screen.getByRole('combobox');
				expect(onTouch).not.toHaveBeenCalled();
				expect(combobox).toHaveAttribute('data-touched', 'false');
			});

			it('lorsque l‘utilisateur ouvre puis ferme le select, le select est touched', async() => {
				const user = userEvent.setup();
				const onTouch = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple optionList={options} label={'label'} onTouch={onTouch}/>);

				const combobox = screen.getByRole('combobox');
				await user.click(combobox);
				await user.keyboard(KeyBoard.ESCAPE);

				expect(onTouch).toHaveBeenCalledTimes(1);
				expect(onTouch).toHaveBeenCalledWith(true);
				expect(combobox).toHaveAttribute('data-touched', 'true');
			});

			it('lorsque l‘utilisateur ouvre puis selectionne une option, le select est touched', async() => {
				const user = userEvent.setup();
				const onTouch = jest.fn();
				const options = [{ libellé: 'options 1', valeur: '1' }, { libellé: 'options 2', valeur: '2' }];

				render(<Select multiple optionList={options} label={'label'} onTouch={onTouch}/>);

				const combobox = screen.getByRole('combobox');
				await user.click(combobox);
				await user.click(screen.getByRole('option', { name: 'options 1' }));

				expect(onTouch).toHaveBeenCalledWith(true);
				expect(combobox).toHaveAttribute('data-touched', 'true');
			});
		});
	});

	describe('SelectOption', () => {
		it('accepte un id et le passe à l‘option', () => {
			render(<SelectSimple labelledBy={'id'}>
				<SelectSimple.Option value="1" id="id1">option 1</SelectSimple.Option>
				<SelectSimple.Option value="2">option 2</SelectSimple.Option>
			</SelectSimple>);

			expect(screen.getByRole('option', { hidden: true, name:'option 1' })).toHaveAttribute('id', 'id1');
		});

		it('accepte une value et la passe à l‘option', () => {
			render(<SelectSimple labelledBy={'id'}>
				<SelectSimple.Option value="1">option 1</SelectSimple.Option>
				<SelectSimple.Option value="2">option 2</SelectSimple.Option>
			</SelectSimple>);

			expect(screen.getByRole('option', { hidden: true, name:'option 1' })).toHaveAttribute('data-value', '1');
		});
	});
});

function getAllFormData(event: FormEvent<HTMLFormElement>, name: string) {
	event.preventDefault();
	const formData = new FormData(event.currentTarget);
	return formData.getAll(name);
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
