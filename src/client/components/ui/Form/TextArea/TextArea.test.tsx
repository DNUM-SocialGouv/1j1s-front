/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { TextArea } from '~/client/components/ui/Form/TextArea/TextArea';

describe('<TextArea/>', () => {
	it('affiche le textarea', () => {
		render(<TextArea />);
		expect(screen.getByRole('textbox')).toBeVisible();
	});

	it('accepte les props natives du textArea', () => {
		render(<TextArea aria-label={'foo'} minLength={4} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveAccessibleName('foo');
		expect(textarea).toHaveAttribute('minLength', '4');
	});

	it('accepte une ref', () => {
		const ref = jest.fn();
		render(<TextArea ref={ref} />);
		expect(ref).toHaveBeenCalledTimes(1);
		expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
	});

	it('accepte une classe', () => {
		render(<TextArea className={'className'} />);

		const textarea = screen.getByRole('textbox');
		expect(textarea).toHaveAttribute('class', expect.stringContaining('className'));
	});

	it('accepte un onChange', async () => {
		const onChange = jest.fn();
		const user = userEvent.setup();
		render(<TextArea onChange={onChange} />);

		const textarea = screen.getByRole('textbox');
		await user.type(textarea, 'a');

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: textarea }));
	});

	it('accepte un onFocus', async () => {
		const onFocus = jest.fn();
		const user = userEvent.setup();
		render(<TextArea onFocus={onFocus} />);

		const textarea = screen.getByRole('textbox');
		await user.click(textarea);
		expect(onFocus).toHaveBeenCalledTimes(1);
		expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ target: textarea }));
	});

	it('accepte un onBlur', async () => {
		const onBlur = jest.fn();
		const user = userEvent.setup();
		render(<TextArea onBlur={onBlur} />);

		const textarea = screen.getByRole('textbox');
		await user.click(textarea);
		await user.tab();

		expect(onBlur).toHaveBeenCalledTimes(1);
		expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ target: textarea }));
	});

	describe('validation', () => {
		it('lorsque la valeur initiale du textarea est valide, le textarea est valide', async () => {
			const validation = jest.fn().mockReturnValue('');
			render(<TextArea validation={validation} />);

			const textarea = screen.getByRole('textbox');
			expect(textarea).toBeValid();
		});

		it('lorsque la valeur initiale du textarea n‘est pas valide, le textarea est invalide', async () => {
			const validation = jest.fn().mockReturnValue('error message');
			render(<TextArea validation={validation} />);

			const textarea = screen.getByRole('textbox');
			expect(textarea).toBeInvalid();
		});

		it('lorsque je tape une valeur valide, le textarea est valide', async () => {
			const validation = jest.fn().mockReturnValue('');
			const user = userEvent.setup();
			render(<TextArea validation={validation} />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');

			expect(textarea).toBeValid();
		});

		it('lorsque je tape une valeur invalide, le textarea est en erreur', async () => {
			const validation = jest.fn().mockReturnValue('error');
			const user = userEvent.setup();
			render(<TextArea validation={validation} />);

			const textarea = screen.getByRole<HTMLTextAreaElement>('textbox');
			await user.type(textarea, 'a');

			expect(textarea).toBeInvalid();
			expect(textarea.validationMessage).toEqual('error');
		});

		it('appelle le onChange des props après s’être mis à jour', async () => {
			let validationMessage: string = '';
			const validation = jest.fn().mockReturnValue('error');
			const onChange = jest.fn((event) => { validationMessage = event.target.validationMessage; });
			const user = userEvent.setup();
			render(<TextArea validation={validation} onChange={onChange} />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');

			expect(validationMessage).toEqual('error');

			validation.mockReturnValue('');
			await user.type(textarea, 'a');

			expect(validationMessage).toEqual('');
		});
	});

	describe('onInvalid', () => {
		it('lorsque le textarea est en erreur et que le textarea est touched, onInvalid est appelé', async () => {
			const onInvalid = jest.fn();
			const user = userEvent.setup();
			render(<TextArea onInvalid={onInvalid} required />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');
			await user.tab();
			await user.clear(textarea);

			expect(onInvalid).toHaveBeenCalledTimes(1);
		});

		it('lorsque le textarea n‘est pas en erreur, onInvalid n‘est pas appelé', async () => {
			const onInvalid = jest.fn();
			const user = userEvent.setup();
			render(<TextArea onInvalid={onInvalid} required />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');

			expect(onInvalid).not.toHaveBeenCalled();
		});

		it('lorsque le textarea est déjà en erreur et qu‘il est touched, onInvalid est appelé', async () => {
			const onInvalid = jest.fn();
			const user = userEvent.setup();
			render(<TextArea onInvalid={onInvalid} required defaultValue={'toto'} />);

			const textarea = screen.getByRole('textbox');
			await user.clear(textarea);
			await user.tab();

			expect(onInvalid).toHaveBeenCalledTimes(1);
		});

		it('lorsque le textarea est en erreur et qu‘il n‘est pas touched, onInvalid n‘est pas appelé', async () => {
			const onInvalid = jest.fn();
			const user = userEvent.setup();
			render(<TextArea onInvalid={onInvalid} required />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');
			await user.clear(textarea);

			expect(onInvalid).not.toHaveBeenCalled();
		});
	});

	describe('gestion du touched', () => {
		it('n’est pas marqué comme touché par défaut', () => {
			render(<TextArea />);

			const textarea = screen.getByRole('textbox');
			expect(textarea).toHaveAttribute('data-touched', 'false');
		});

		it('marque le textarea comme touché quand on quitte le champ après avoir écrit dedans', async () => {
			const user = userEvent.setup();
			render(<TextArea />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');
			await user.tab();

			expect(textarea).toHaveAttribute('data-touched', 'true');
		});

		it('ne marque pas le textarea tant qu’on ne quitte pas le textarea', async () => {
			const user = userEvent.setup();
			render(<TextArea />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');

			expect(textarea).toHaveAttribute('data-touched', 'false');
		});

		it('ne marque pas le textarea comme touché quand on quitte le textarea sans avoir écrit dedans', async () => {
			const user = userEvent.setup();
			render(<TextArea />);

			const textarea = screen.getByRole('textbox');
			await user.click(textarea);
			await user.tab();

			expect(textarea).toHaveAttribute('data-touched', 'false');
		});

		it('appelle onTouch quand le textarea est touché', async () => {
			const user = userEvent.setup();
			const onTouch = jest.fn();
			render(<TextArea onTouch={onTouch} />);

			const textarea = screen.getByRole('textbox');
			await user.type(textarea, 'a');
			await user.tab();

			expect(onTouch).toHaveBeenCalledTimes(1);
		});
	});
});
