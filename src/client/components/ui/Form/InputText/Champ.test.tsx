/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Champ } from '~/client/components/ui/Form/InputText/Champ';

describe('<Champ/>', () => {
	it('affiche son contenu', () => {
		render(
			<Champ>
				<Champ.Input/>
			</Champ>,
		);

		expect(screen.getByRole('textbox')).toBeVisible();
	});

	it('lie le champ avec son message d’erreur', async () => {
		render(
			<Champ>
				<Champ.Input validation={() => 'Message d’erreur'}/>
				<Champ.Error>Message d’erreur</Champ.Error>
			</Champ>,
		);
		await touchChamp();

		const input = screen.getByRole('textbox');
		expect(input).toHaveAccessibleDescription('Message d’erreur');
	});

	describe('<InputChamp/>', () => {
		it('accepte les propriété d‘un input', async () => {
			render(
				<Champ>
					<Champ.Input disabled aria-label={'foo'}/>
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
					<Champ.Input ref={ref}/>
				</Champ>,
			);

			expect(ref).toHaveBeenCalledTimes(1);
			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
		});

		it('merge le aria-describedby donné par le parent avec celui du message d’erreur et de l‘indication', async () => {
			render(
				<Champ>
					<Champ.Input aria-describedby="description"/>
					<p id="description">Ceci est une description</p>
					<Champ.Error>Ceci est une erreur</Champ.Error>
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
				<Champ.Input/>
			</Champ>);

			const erreur = screen.getByRole('textbox');
			expect(erreur).toHaveAccessibleDescription('');
		});

		it('lorsque je fournis un id à l‘indication, le aria-describedby contient l‘indication', () => {
			render(<Champ>
				<Champ.Input/>
				<Champ.Hint id="idExpected">Je suis l‘indication</Champ.Hint>
			</Champ>);

			const erreur = screen.getByRole('textbox');
			expect(erreur).toHaveAccessibleDescription('Je suis l‘indication');
		});

		it('lorsque je fournis un id à l‘erreur, le aria-describedby contient l‘erreur', async () => {
			render(<Champ>
				<Champ.Input/>
				<Champ.Error id="idExpected">Je suis l‘erreur</Champ.Error>
			</Champ>);
			await touchChamp();

			const erreur = screen.getByRole('textbox');
			expect(erreur).toHaveAccessibleDescription('Je suis l‘erreur');
		});
	});

	describe('<InputError/>', () => {
		it('accepte les propriété de l‘Erreur', async () => {
			render(
				<Champ>
					<Champ.Input/>
					<Champ.Error className="foo" data-test="test">Je suis l‘erreur</Champ.Error>
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
					<Champ.Input/>
					<Champ.Error id="idExpected">Je suis l‘erreur</Champ.Error>
				</Champ>,
			);
			await touchChamp();

			const erreur = screen.getByText('Je suis l‘erreur');
			expect(erreur).toHaveAttribute('id', 'idExpected');
		});

		it('lorsque le champ n‘est pas touched, n‘affiche pas l‘erreur', () => {
			render(
				<Champ>
					<Champ.Input/>
					<Champ.Error id="idExpected">Je suis l‘erreur</Champ.Error>
				</Champ>,
			);

			const erreur = screen.queryByText('Je suis l‘erreur');
			expect(erreur).not.toBeInTheDocument();
		});

		it('lorsque le champ est touched, affiche l‘erreur', async () => {
			const user = userEvent.setup();
			render(
				<Champ>
					<Champ.Input/>
					<Champ.Error id="idExpected">Je suis l‘erreur</Champ.Error>
				</Champ>,
			);

			const input = screen.getByRole('textbox');
			await user.type(input, 'a');
			await user.tab();
			const erreur = screen.getByText('Je suis l‘erreur');

			expect(erreur).toBeVisible();
		});
	});

	it.todo('passer le champ en render prop');
	it.todo('set automatiquement le contenu de l’erreur avec le champ');
});

async function touchChamp() {
	const user = userEvent.setup();
	const input = screen.getByRole('textbox');
	await user.type(input, 'a');
	await user.tab();
}
