/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';

describe('<TextArea />', () => {
	it('affiche un input', () => {
		render(<TextArea />);

		const input = screen.getByRole('textbox');

		expect(input).toBeVisible();
	});

	describe('props natifs', () => {
		it('passe toutes les props au textarea sous-jacent', () => {
			render(<TextArea disabled aria-label='Mon input' />);

			const input = screen.getByRole('textbox');

			expect(input).toHaveAttribute('disabled');
			expect(input).toHaveAttribute('aria-label', 'Mon input');
		});
		it('accepte une ref', () => {
			const ref = jest.fn();
			render(<TextArea ref={ref} />);

			expect(ref).toHaveBeenCalledTimes(1);
			expect(ref).toHaveBeenCalledWith(expect.any(Element));
		});
		it('utilise l’id en props si présent', () => {
			render(<TextArea label="Mon input" id="mon-id" />);

			const input = screen.getByRole('textbox');

			expect(input).toHaveAccessibleName('Mon input');
			expect(input).toHaveAttribute('id', 'mon-id');
		});
		it('utilise l’aria-describedby en props si présent', () => {
			render(<TextArea aria-describedby="mon-id" />);

			const input = screen.getByRole('textbox');

			expect(input).toHaveAttribute('aria-describedby', 'mon-id');
		});
		it('utilise onChange en props si présent', async () => {
			const onChange = jest.fn();
			render(<TextArea onChange={onChange}/>);

			const input = screen.getByRole('textbox');
			await userEvent.type(input, 'a');

			expect(onChange).toHaveBeenCalledTimes(1);
		});
		it('utilise onBlur en props si présent', async () => {
			const onBlur = jest.fn();
			render(<TextArea onBlur={onBlur}/>);

			const input = screen.getByRole('textbox');
			await userEvent.click(input);
			await userEvent.tab();

			expect(onBlur).toHaveBeenCalledTimes(1);
		});
	});

	describe('<label />', () => {
		it('affiche le label lorsque indiqué', () => {
			render(<TextArea label='Mon input' />);

			const label = screen.getByText('Mon input');
			const input = screen.getByRole('textbox');

			expect(label).toBeVisible();
			expect(input).toHaveAccessibleName('Mon input');
		});
		it('accepte un ReactNode comme label', () => {
			render(
				<TextArea
					label={<>Mon input <abbr title="(required)">*</abbr></>}
				/>,
			);

			const label = screen.getByText('Mon input');

			expect(label).toBeVisible();
			expect(label).toHaveTextContent('Mon input *');
		});
		it('génère un id unique pour chaque composant', () => {
			render(
				<>
					<TextArea label='Mon input 1' />
					<TextArea label='Mon input 2' />
				</>,
			);

			const [input1, input2] = screen.getAllByRole('textbox');

			expect(input1.id).not.toEqual(input2.id);
		});
	});

	describe('hint', () => {
		it('affiche une aide lorsque présente', () => {
			render(<TextArea hint="Ceci est une aide" />);

			const hint = screen.getByText('Ceci est une aide');

			expect(hint).toBeVisible();
		});
		it('décrit la textbox avec l’aide si présente', () => {
			render(<TextArea hint="Ceci est une aide" />);

			const input = screen.getByRole('textbox');

			expect(input).toHaveAccessibleDescription('Ceci est une aide');
		});
		it('accepte plusieurs descriptions', () => {
			render(
				<>
					<p id="mon-id1">Ceci est une première description externe.</p>
					<p id="mon-id2">Ceci est une seconde description externe.</p>
					<TextArea aria-describedby="mon-id1 mon-id2" hint="Ceci est une aide" />
				</>,
			);

			const input = screen.getByRole('textbox');

			expect(input).toHaveAccessibleDescription(/Ceci est une première description externe/);
			expect(input).toHaveAccessibleDescription(/Ceci est une seconde description externe/);
			expect(input).toHaveAccessibleDescription(/Ceci est une aide/);
		});
		it('n’ajoute pas d’attribut si pas présent', () => {
			render(<TextArea />);

			const input = screen.getByRole('textbox');

			expect(input).not.toHaveAttribute('aria-describedby');
		});
	});

	describe('error', () => {
		it('affiche un message d’erreur lorsque le champ est en erreur et que l’utilisateur l’a touché', async () => {
			render(<TextArea required/>);

			let message = screen.queryByText('Constraints not satisfied');
			expect(message).not.toBeInTheDocument();

			const input = screen.getByRole('textbox');
			await userEvent.click(input);
			await userEvent.tab();

			message = screen.getByText('Constraints not satisfied');
			expect(message).toBeVisible();
		});
		it('met à jour le message d’erreur quand la valeur change', async () => {
			render(<TextArea required defaultValue=""/>);

			const input = screen.getByRole('textbox');
			await userEvent.type(input, 'a');

			let message = screen.queryByText('aaa');
			expect(message).not.toBeInTheDocument();

			await userEvent.clear(input);
			await userEvent.tab();

			message = screen.getByText('Constraints not satisfied');
			expect(message).toBeVisible();
		});
		it('masque l’aide à la saisie si un message d’erreur apparait', async () => {
			render(<TextArea required defaultValue="" hint="Salut"/>);

			const hint = screen.queryByText('Salut');

			expect(hint).not.toBeInTheDocument();
		});
		it('lie l’erreur avec le champ', async () => {
			render(<TextArea required defaultValue=""/>);

			const input = screen.getByRole('textbox');
			await userEvent.click(input);
			await userEvent.tab();

			expect(input).toHaveErrorMessage('Constraints not satisfied');
		});
	});

	describe('validation', () => {
		it('valide l’input contre la fonction de validation', async () => {
			function validate(value: string): string | null | undefined {
				if (value === 'Boom') return 'La valeur ne doit pas être "Boom"';
				return null;
			}

			render(<TextArea validate={validate}/>);

			const input = screen.getByRole('textbox');
			expect(input).toBeValid();

			await userEvent.type(input, 'Boom');
			expect(input).toBeInvalid();
		});
		it('valide l’input contre la fonction de validation à l’initialisation', async () => {
			function validate() {
				return 'Error';
			}

			render(<TextArea validate={validate}/>);

			const input = screen.getByRole('textbox');
			expect(input).toBeInvalid();
		});
	});
});
