/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';

import { Champ } from '~/client/components/ui/Form/InputText/Champ';

describe('<Champ/>', () => {
	it('affiche son contenu', () => {
		render(<Champ>
			<Champ.Input/>
		</Champ>);

		expect(screen.getByRole('textbox')).toBeVisible();
	});

	it('lie le champ avec son message d’erreur', () => {
		render(
			<Champ>
				<Champ.Input/>
				<Champ.Error>Message d’erreur</Champ.Error>
			</Champ>,
		);

		expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Message d’erreur');
	});

	describe('<InputChamp/>', () => {
		it('accepte les propriété d‘un input', () => {
			render(<Champ>
				<Champ.Input disabled aria-label={'foo'}/>
			</Champ>);

			const input = screen.getByRole('textbox');
			expect(input).toBeDisabled();
			expect(input).toHaveAccessibleName('foo');
		});

		it('accepte une ref', () => {
			const ref = jest.fn();
			render(<Champ>
				<Champ.Input ref={ref}/>
			</Champ>);

			expect(ref).toHaveBeenCalledTimes(1);
			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
		});

		it('merge le aria-describedby donné par le parent avec celui du message d’erreur', () => {
			render(
				<Champ>
					<Champ.Input aria-describedby="description"/>
					<p id="description">Ceci est une description</p>
					<Champ.Error>Ceci est une erreur</Champ.Error>
				</Champ>,
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAccessibleDescription(expect.stringContaining('Ceci est une description'));
			expect(input).toHaveAccessibleDescription(expect.stringContaining('Ceci est une erreur'));
		});

		it('lorsque je fournis un id à l‘erreur, le aria-describedby contient l‘erreur', () => {
			render(<Champ>
				<Champ.Input/>
				<Champ.Error id="idExpected">Je suis l‘erreur</Champ.Error>
			</Champ>);

			const erreur = screen.getByRole('textbox');
			expect(erreur).toHaveAccessibleDescription('Je suis l‘erreur');
		});
	});

	describe('<InputError/>', () => {
		it('accepte les propriété de l‘Erreur', () => {
			render(<Champ>
				<Champ.Input/>
				<Champ.Error aria-label={'foo'}>Je suis l‘erreur</Champ.Error>
			</Champ>);

			const erreur = screen.getByText('Je suis l‘erreur');
			expect(erreur).toHaveAccessibleName('foo');
		});

		it('quand je fournis un id, utiliser cet id', () => {
			render(<Champ>
				<Champ.Input/>
				<Champ.Error id="idExpected">Je suis l‘erreur</Champ.Error>
			</Champ>);

			const erreur = screen.getByText('Je suis l‘erreur');
			expect(erreur).toHaveAttribute('id', 'idExpected');
		});
	});
});
