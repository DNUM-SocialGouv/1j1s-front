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
});
