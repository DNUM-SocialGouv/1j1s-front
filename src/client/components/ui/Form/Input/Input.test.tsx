/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Input } from './Input';

describe('<Input/>', () => {
	it('affiche un textbox', () => {
		render(<Input/>);
		expect(screen.getByRole('textbox')).toBeVisible();
	});

	it('lorsque je tappe un mot, la valeur de l‘input change', async () => {
		const user = userEvent.setup();
		render(<Input/>);
		const input = screen.getByRole('textbox');

		await user.type(input, 'le mot en question');

		expect(input).toHaveValue('le mot en question');
	});

	it('accepte une valeur par defaut', () => {
		render(<Input defaultValue="valeur par defaut"/>);
		const input = screen.getByRole('textbox');
		
		expect(input).toHaveValue('valeur par defaut');
	});

	it('accepte les props natives d‘un input', () => {
		render(<Input disabled aria-label={'foo'}/>);

		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();
		expect(input).toHaveAccessibleName('foo');
	});

	it('accepte une ref', () => {
		const ref = jest.fn();
		render(<Input ref={ref}/>);

		expect(ref).toHaveBeenCalledTimes(1);
		expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
	});

	it('accepte une classe', () => {
		render(<Input className={'className'}/>);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('class', expect.stringContaining('className'));
	});

	it('accepte un onChange', async () => {
		const onChange = jest.fn();
		const user = userEvent.setup();
		render(<Input onChange={onChange}/>);

		const input = screen.getByRole('textbox');
		await user.type(input, 'a');
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
	});

	it('accepte un onFocus', async () => {
		const onFocus = jest.fn();
		const user = userEvent.setup();
		render(<Input onFocus={onFocus}/>);

		const input = screen.getByRole('textbox');
		await user.click(input);
		expect(onFocus).toHaveBeenCalledTimes(1);
		expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
	});

	it('accepte un onBlur', async () => {
		const onBlur = jest.fn();
		const user = userEvent.setup();
		render(<Input onBlur={onBlur}/>);

		const input = screen.getByRole('textbox');
		await user.type(input, 'a');
		await user.tab();
		expect(onBlur).toHaveBeenCalledTimes(1);
		expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
	});

	it('lorsque l‘on quite le champ, on supprime les espaces avant et après', async () => {
		const user = userEvent.setup();
		render(<Input/>);
		const input = screen.getByRole('textbox');

		await user.type(input, '    le mot en question avec des espaces    ');
		await user.tab();

		expect(input).toHaveValue('le mot en question avec des espaces');
	});

	it('lorsque je tappe un espace et je perd le focus, on supprime les espaces avant et après', async () => {
		const user = userEvent.setup();
		render(<Input/>);
		const input = screen.getByRole('textbox');

		await user.type(input, '    le mot en question avec des espaces.    ');
		await user.type(input, '    ');
		await user.tab();

		expect(input).toHaveValue('le mot en question avec des espaces.');
	});

	describe('validation', () => {
		it('lorsque la valeur initiale de l‘input est valide, l‘input est valide', async () => {
			const validation = jest.fn().mockReturnValue('');
			render(<Input validation={validation}/>);

			const input = screen.getByRole('textbox');
			expect(input).toBeValid();
		});

		it('lorsque la valeur initiale de l‘input n‘est pas valide, l‘input est invalide', async () => {
			const validation = jest.fn().mockReturnValue('error message');
			render(<Input validation={validation}/>);

			const input = screen.getByRole('textbox');
			expect(input).toBeInvalid();
		});

		it('lorsque je tape une valeur valide, l‘input est valide', async () => {
			const validation = jest.fn().mockReturnValue('');
			const user = userEvent.setup();
			render(<Input validation={validation}/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			expect(input).toBeValid();
		});

		it('lorsque je tape une valeur invalide, l‘input est en erreur', async () => {
			const validation = jest.fn().mockReturnValue('error');
			const user = userEvent.setup();
			render(<Input validation={validation}/>);

			const input = screen.getByRole<HTMLInputElement>('textbox');
			await user.type(input, 'a');

			expect(input).toBeInvalid();
			expect(input.validationMessage).toEqual('error');
		});

		it('appelle le onChange des props après s’être mis à jour', async () => {
			let validationMessage: string = '';
			const validation = jest.fn().mockReturnValue('error');
			const onChange = jest.fn((event) => { validationMessage = event.target.validationMessage; });
			const user = userEvent.setup();
			render(<Input validation={validation} onChange={onChange}/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			expect(validationMessage).toEqual('error');

			validation.mockReturnValue('');
			await user.type(input, 'a');

			expect(validationMessage).toEqual('');
		});
	});

	describe('l’input est marqué comme touché ou non', () => {
		it('n’est pas marqué comme touché par défaut', () => {
			render(<Input/>);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('data-touched', 'false');
		});

		it('marque le champ comme touché quand on quitte le champ après avoir écrit dedans', async () => {
			const user = userEvent.setup();
			render(<Input/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			await user.tab();

			expect(input).toHaveAttribute('data-touched', 'true');
		});

		it('ne marque pas le champ tant qu’on ne quitte pas le champ', async () => {
			const user = userEvent.setup();
			render(<Input/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			expect(input).toHaveAttribute('data-touched', 'false');
		});

		it('ne marque pas le champ comme touché quand on quitte le champ sans avoir écrit dedans', async () => {
			const user = userEvent.setup();
			render(<Input/>);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.tab();

			expect(input).toHaveAttribute('data-touched', 'false');
		});

		it('appelle onTouch quand le champ est touché', async () => {
			const user = userEvent.setup();
			const onTouch = jest.fn();
			render(<Input onTouch={onTouch} />);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			await user.tab();

			expect(onTouch).toHaveBeenCalledTimes(1);
		});
	});
});
