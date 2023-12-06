/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Combobox } from '~/client/components/ui/Form/Combobox';
import { Champ } from '~/client/components/ui/Form/InputText/Champ';
import { Input } from '~/client/components/ui/Form/InputText/Input';

describe('<Champ/>', () => {
	it('affiche son contenu', () => {
		render(
			<Champ>
				<Champ.Input render={Input} />
			</Champ>,
		);

		expect(screen.getByRole('textbox')).toBeVisible();
	});

	it('lie le champ avec son message d’erreur', async () => {

		render(
			<Champ>
				<Champ.Input render={Input} validation={() => 'Message d’erreur'}/>
				<Champ.Error/>
			</Champ>,
		);
		await touchChamp();

		const input = screen.getByRole('textbox');
		expect(input).toHaveAccessibleDescription('Message d’erreur');
	});

	it('lie le champ avec son label', () => {
		render(
			<Champ>
				<Champ.Label>Prénom</Champ.Label>
				<Champ.Input render={Input}/>
			</Champ>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAccessibleName('Prénom');
	});

	describe('<InputChamp/>', () => {
		it('accepte un composant a afficher', () => {
			render(
				<Champ>
					<Champ.Input render={Combobox} disabled aria-label={'foo'}/>
				</Champ>,
			);

			const input = screen.getByRole('combobox');

			expect(input).toBeVisible();
		});

		it('accepte les propriété d‘un input', async () => {
			render(
				<Champ>
					<Champ.Input render={Input} disabled aria-label={'foo'}/>
				</Champ>,
			);

			const input = screen.getByRole('textbox');

			expect(input).toBeDisabled();
			expect(input).toHaveAccessibleName('foo');
		});

		it('accepte une ref', () => {
			const ref = jest.fn();
			render(
				<Champ>
					<Champ.Input render={Input} ref={ref}/>
				</Champ>,
			);

			expect(ref).toHaveBeenCalledTimes(1);
			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
		});

		it('accepte un onChange', async () => {
			const onChange = jest.fn();
			render(
				<Champ>
					<Champ.Input render={Input} onChange={onChange}/>
				</Champ>,
			);

			const user = userEvent.setup();
			const input = screen.getByRole('textbox');
			await user.type(input, 'a');

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ target: input }));
		});

		it('accepte un onTouch', async () => {
			const onTouch = jest.fn();
			render(
				<Champ>
					<Champ.Input render={Input} onTouch={onTouch}/>
				</Champ>,
			);

			const user = userEvent.setup();
			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			await user.tab();

			expect(onTouch).toHaveBeenCalledTimes(1);
			expect(onTouch).toHaveBeenCalledWith(true);
		});

		it('merge le aria-describedby donné par le parent avec celui du message d’erreur et de l‘indication', async () => {
			render(
				<Champ>
					<Champ.Input render={Input} aria-describedby="description" validation={() => 'Ceci est une erreur'}/>
					<p id="description">Ceci est une description</p>
					<Champ.Error/>
					<Champ.Hint>Ceci est une indication</Champ.Hint>
				</Champ>,
			);
			await touchChamp();

			const input = screen.getByRole('textbox');
			expect(input).toHaveAccessibleDescription(expect.stringContaining('Ceci est une description'));
			expect(input).toHaveAccessibleDescription(expect.stringContaining('Ceci est une erreur'));
			expect(input).toHaveAccessibleDescription(expect.stringContaining('Ceci est une indication'));
		});

		it('lorsque je ne fournis pas d‘indication et d‘erreur, le aria-describedby est vide', () => {
			render(<Champ>
				<Champ.Input render={Input}/>
			</Champ>);

			const erreur = screen.getByRole('textbox');
			expect(erreur).toHaveAccessibleDescription('');
		});

		it('lorsque je fournis un id à l‘indication, le aria-describedby contient l‘indication', () => {
			render(<Champ>
				<Champ.Input render={Input}/>
				<Champ.Hint id="idExpected">Je suis l‘indication</Champ.Hint>
			</Champ>);

			const erreur = screen.getByRole('textbox');
			expect(erreur).toHaveAccessibleDescription('Je suis l‘indication');
		});

		it('lorsque je fournis un id à l‘erreur, le aria-describedby contient l‘erreur', async () => {
			render(<Champ>
				<Champ.Input render={Input} validation={() => 'Ceci est une erreur'}/>
				<Champ.Error id="idExpected"/>
			</Champ>);
			await touchChamp();

			const input = screen.getByRole('textbox');
			expect(input).toHaveAccessibleDescription('Ceci est une erreur');
		});

		it("lorsque je fournis un id à l'input, le label et l'input sont liés", () => {
			render(<Champ>
				<Champ.Label>Prénom</Champ.Label>
				<Champ.Input render={Input} id="idExpected"/>
			</Champ>);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAccessibleName('Prénom');
		});
	});

	describe('<InputError/>', () => {
		it('accepte les propriété de l‘Erreur', async () => {
			render(
				<Champ>
					<Champ.Input render={Input} validation={() => 'Je suis l‘erreur'}/>
					<Champ.Error className="foo" data-test="test"/>
				</Champ>,
			);
			await touchChamp();

			const erreur = screen.getByText('Je suis l‘erreur');
			expect(erreur).toHaveAttribute('class', expect.stringContaining('foo'));
			expect(erreur).toHaveAttribute('data-test', 'test');
		});

		it('quand je fournis un id, utiliser cet id', async () => {
			render(
				<Champ>
					<Champ.Input render={Input} validation={() => 'Je suis l‘erreur'}/>
					<Champ.Error id="idExpected"/>
				</Champ>,
			);
			await touchChamp();

			const erreur = screen.getByText('Je suis l‘erreur');
			expect(erreur).toHaveAttribute('id', 'idExpected');
		});

		it('lorsque le champ n‘est pas touched, n‘affiche pas l‘erreur', () => {
			render(
				<Champ>
					<Champ.Input render={Input} validation={() => 'Je suis l‘erreur'}/>
					<Champ.Error id="idExpected"/>
				</Champ>,
			);

			const erreur = screen.queryByText('Je suis l‘erreur');
			expect(erreur).not.toBeInTheDocument();
		});

		it('lorsque le champ est touched, affiche l‘erreur', async () => {
			const user = userEvent.setup();
			render(
				<Champ>
					<Champ.Input render={Input} required/>
					<Champ.Error/>
				</Champ>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			await user.tab();
			await user.clear(input);
			const erreur = screen.getByText('Constraints not satisfied');

			expect(erreur).toBeVisible();
		});
	});
});

async function touchChamp() {
	const user = userEvent.setup();
	const input = screen.getByRole('textbox');
	await user.type(input, 'a');
	await user.tab();
}
