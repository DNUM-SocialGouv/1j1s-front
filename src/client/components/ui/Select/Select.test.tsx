/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Select } from '~/client/components/ui/Select/Select';
import { mapTypeDeContratToOffreEmploiCheckboxFiltre } from '~/client/utils/offreEmploi.mapper';
import { Offre } from '~/server/offres/domain/offre';

describe('Select', () => {

	describe('Select Single', () => {
		it('quand on clique sur le select, retourne une liste d‘options', async () => {
			//GIVEN
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);

			//WHEN
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			user.click(button);
			await screen.findByRole('listbox');

			//THEN
			expect(screen.getByRole('radio', { name: 'Temps plein' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Temps partiel' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Indifférent' })).toBeInTheDocument();
		});

		it('quand on sélectionne une valeur, met la valeur selectionné dans l‘input', async () => {
			//GIVEN
			render(
				<Select
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
				/>,
			);

			//WHEN
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			fireEvent.click(button);
			const listbox = screen.getByRole('listbox');
			const input = within(listbox).getByRole('radio', { name: 'Temps plein' });
			fireEvent.click(input);

			//THEN
			await waitFor(async () => {
				const placeholder = await screen.findByTestId('Select-Placeholder');
				expect(placeholder.textContent).toEqual('Temps plein');
			});

			const hiddenInput = await screen.findByTestId('Select-InputHidden');
			expect(hiddenInput).toHaveValue('tempsPlein');
		});

		it('quand on sélectionne une valeur, on appelle la fonction onChange passée au select', async () => {
			//GIVEN
			const onChangeSpy = jest.fn();
			render(
				<Select
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					onChange={onChangeSpy}
				/>,
			);

			//WHEN
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			fireEvent.click(button);
			const listbox = screen.getByRole('listbox');
			const input = within(listbox).getByRole('radio', { name: 'Temps plein' });
			fireEvent.click(input);

			//THEN
			expect(onChangeSpy).toHaveBeenCalledWith('tempsPlein');
		});

		describe('Quand le champ est requis', () => {
			it('n‘est pas invalide tant que l‘on ne l‘a pas touché', async () => {
				// Given
				render(
					<Select
						name="monselect"
						required={true}
						optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
						label="Mon Select"
					/>,
				);

				// When
				const input = await screen.findByTestId('Select-InputHidden');

				// Then
				expect(input).toBeRequired();
				expect(input).toHaveAttribute('aria-invalid', 'false');
			});

			describe('Quand on ouvre la liste d‘option mais qu‘on perd le focus', () => {
				it('est invalide', async () => {
					// Given
					render(
						<>
							<button>escape</button>
							<Select
								name="monselect"
								required={true}
								optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
								label="Mon Select"
							/>
						</>
						,
					);
					// When
					await userEvent.click(screen.getByText('Mon Select'));
					await userEvent.click(screen.getByText('escape'));

					// When
					const input = await screen.findByTestId('Select-InputHidden');

					// Then
					expect(input).toBeInvalid();
				});

				it('a un message d‘erreur', async () => {
					// Given
					render(
						<>
							<button>escape</button>
							<Select
								name="monselect"
								required={true}
								optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
								label="Mon Select"
							/>
						</>
						,
					);
					// When
					await userEvent.click(screen.getByLabelText('Mon Select'));
					await userEvent.click(screen.getByText('escape'));

					// Then
					const input = await screen.findByTestId('Select-InputHidden');
					expect(input).toHaveErrorMessage('Veuillez sélectionner un choix');
				});
			});
		});
	});

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
			user.click(button);
			await screen.findByRole('listbox');

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
	});
});

describe('Keyboard Select', () => {
	describe('Select Single', () => {
		it('ouvre les options avec la touche space', async () => {
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			await screen.findByRole('listbox');

			//THEN
			expect(screen.getByRole('radio', { name: 'Temps plein' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Temps partiel' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Indifférent' })).toBeInTheDocument();
		});

		it('ferme les options avec la touche escape', async () => {
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');

			expect(screen.getByRole('radio', { name: 'Temps plein' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Temps partiel' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Indifférent' })).toBeInTheDocument();

			await user.keyboard(KeyBoard.ESCAPE);

			expect(optionList).not.toBeInTheDocument();
		});

		it('a le focus sur la première option quand on ouvre la liste des options', async () => {
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];
			const secondOption = within(optionList).getAllByRole('option')[1];

			expect(firstOption).toHaveFocus();
			expect(secondOption).not.toHaveFocus();
		});

		it('change le focus avec les touches arrow', async () => {
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];
			const secondOption = within(optionList).getAllByRole('option')[1];

			expect(firstOption).toHaveFocus();
			expect(secondOption).not.toHaveFocus();

			await user.keyboard(KeyBoard.ARROW_DOWN);

			expect(firstOption).not.toHaveFocus();
			expect(secondOption).toHaveFocus();

			await user.keyboard(KeyBoard.ARROW_UP);

			expect(firstOption).toHaveFocus();
			expect(secondOption).not.toHaveFocus();
		});

		it('sélectionne une option avec la touche space ET ferme la liste des options', async () => {
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];

			expect(firstOption).toHaveFocus();

			await user.keyboard(KeyBoard.SPACE);

			await user.keyboard(KeyBoard.ARROW_DOWN);

			const hiddenInput = await screen.findByTestId('Select-InputHidden');
			expect(hiddenInput).toHaveValue('tempsPlein');

			expect(optionList).not.toBeInTheDocument();

		});

		it('rend le focus au button select après avoir fermé les options', async () => {
			const user = userEvent.setup();
			render(
				<Select
					placeholder={'Temps de travail'}
					name="tempsDeTravail"
					optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
					label={'Temps de travail'}
					value=""
				/>,
			);
			const button = screen.getByRole('button', { name: 'Temps de travail' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');

			expect(screen.getByRole('radio', { name: 'Temps plein' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Temps partiel' })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: 'Indifférent' })).toBeInTheDocument();

			await user.keyboard(KeyBoard.ESCAPE);

			expect(optionList).not.toBeInTheDocument();

			expect(button).toHaveFocus();
		});
	});

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
