/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Input } from '~/client/components/ui/Form/InputText/Input';

describe('<Input/>', () => {
	it('affiche un textbox', () => {
		render(<Input/>);
		expect(screen.getByRole('textbox')).toBeVisible();
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
		await user.type(input, 'a');
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

	describe('validation', () => {
		it('lorsque je ne tape pas, n‘appelle pas la validation', async () => {
			const validation = jest.fn();
			const user = userEvent.setup();
			render(<Input validation={validation}/>);

			const input = screen.getByRole('textbox');
			await user.click(input);
			expect(validation).not.toHaveBeenCalled();
		});

		it('lorsque je tape, appelle la validation', async () => {
			const validation = jest.fn();
			const user = userEvent.setup();
			render(<Input validation={validation}/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			expect(validation).toHaveBeenCalledTimes(1);
			expect(validation).toHaveBeenCalledWith('a');
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

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			expect(input).toBeInvalid();
		});
	});

	describe('data-touched', () => {
		it('n’est pas marqué comme touché par défaut', () => {
			render(<Input/>);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('data-touched', 'false');
		});

		it('marque le champ comme touché quand on quite le champ après avoir écrit dedans', async () => {
			const user = userEvent.setup();
			render(<Input/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			await user.tab();

			expect(input).toHaveAttribute('data-touched', 'true');
		});

		it('ne marque pas le champ tant qu’on ne quite pas le champ', async () => {
			const user = userEvent.setup();
			render(<Input/>);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			expect(input).toHaveAttribute('data-touched', 'false');
		});

		it('ne marque pas le champ comme touché quand on quite le champ sans avoir écrit dedans', async () => {
			const user = userEvent.setup();
			render(<Input/>);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.tab();

			expect(input).toHaveAttribute('data-touched', 'false');
		});
	});
});
