/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputText } from '~/client/components/ui/Form/InputText/InputText';

describe('TextInput', () => {
	describe('quand le champ comporte un indice d‘aide à la saisie', () => {
		describe('quand le champs n‘est pas touché', () => {
			it('affiche un indice d‘aide à la saisie et aucun message d‘erreur', () => {
				render(
					<InputText
						label="Mon champ texte"
						name="inputName"
						hint="Champ obligatoire"
						required
					/>,
				);

				expect(screen.getByText('Champ obligatoire')).toBeInTheDocument();
			});
		});

		describe('quand le champ contient une valeur', () => {
			it('affiche un indice d‘aide à la saisie et aucun message d‘erreur', () => {
				render(
					<InputText
						label="Mon champ texte"
						name="inputName"
						hint="Champ obligatoire"
						value="Kiwi"
						required
					/>,
				);

				const input = screen.getByRole('textbox', { name: 'Mon champ texte' });
				expect(input).toHaveValue('Kiwi');
				expect(screen.getByText('Champ obligatoire')).toBeInTheDocument();
			});
		});

		describe('quand le champ ne contient plus de valeur', () => {
			it('affiche un message d‘erreur à la place de l‘aide à la saisie', async () => {
				render(
					<>
						<button>focus</button>
						<InputText
							label="Mon champ texte"
							name="inputName"
							hint="Remplissez le champ"
							value="Kiwi"
							required
						/>
					</>,
				);

				expect(screen.getByText('Remplissez le champ')).toBeInTheDocument();
				expect(screen.getByLabelText('Mon champ texte')).toHaveAccessibleDescription('Remplissez le champ');

				const user = userEvent.setup();
				await user.clear(screen.getByRole('textbox', { name: 'Mon champ texte' }));
				await user.click(screen.getByText('focus'));

				expect(screen.queryByText('Remplissez le champ')).not.toBeInTheDocument();
				expect(screen.getByLabelText('Mon champ texte')).not.toHaveAccessibleDescription();

				expect(screen.getByRole('textbox', { name: 'Mon champ texte' })).toBeInvalid();
			});
		});
	});

	describe('quand le champ comporte une règle de validation', () => {
		function validateEvenInputValue (value: string | ReadonlyArray<string> | number | undefined) {
			if (typeof value === 'string') {
				return parseInt(value, 10) % 2 === 0 ? null : 'Le nombre n‘est pas pair';
			} else {
				return 'valeur invalide';
			}
		}

		describe('quand celle-ci est vérifiée', () => {
			it('laisse le champ valide', () => {
				render(
					<InputText
						label="Mon champ texte"
						name="inputName"
						hint="Entrez un nom pair"
						validation={validateEvenInputValue}
						value='6'
					/>,
				);

				const input = screen.getByRole('textbox', { name: 'Mon champ texte' });
				expect(input).toBeValid();
			});
		});

		describe('quand celle-ci n‘est pas vérifiée', () => {
			it('passe le champ invalide', () => {
				render(
					<InputText
						label="Mon champ texte"
						name="inputName"
						hint="Entrez un nom pair"
						validation={validateEvenInputValue}
						value='9'
					/>,
				);

				const input = screen.getByRole('textbox', { name: 'Mon champ texte' });
				expect(input).toBeInvalid();
			});
		});
	});

	describe('quand le champ comporte une mention sur la nécessité', () => {
		describe('quand celle-ci est obligatoire', () => {
			it('affiche la mention "champ obligatoire"', () => {
				render(
					<InputText
						label="Mon champ texte"
						name="inputName"
						necessity="required"
						required
					/>,
				);

				const input = screen.getByRole('textbox', { name: 'Mon champ texte (champ obligatoire)' });
				expect(input).toBeInTheDocument();
			});
		});

		describe('quand celle-ci est optionnelle', () => {
			it('affiche la mention "champ optionnel"', () => {
				render(
					<InputText
						label="Mon champ texte"
						name="inputName"
						necessity="optional"
					/>,
				);

				const input = screen.getByRole('textbox', { name: 'Mon champ texte (champ optionnel)' });
				expect(input).toBeInTheDocument();
			});
		});
	});
});
