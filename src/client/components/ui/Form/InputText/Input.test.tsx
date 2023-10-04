/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

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
});
