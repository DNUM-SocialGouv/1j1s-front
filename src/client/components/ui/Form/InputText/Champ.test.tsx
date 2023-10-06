/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';

import { Champ } from '~/client/components/ui/Form/InputText/Champ';

describe('<Champ/>', () => {
	it('affiche son contenu', () => {
		render(<Champ><Champ.Input/></Champ>);
		
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

	it.todo('quand Error a un id, utiliser cet id');
});
