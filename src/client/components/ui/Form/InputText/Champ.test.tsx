/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';

import { Champ } from '~/client/components/ui/Form/InputText/Champ';

describe('<Champ/>', () => {
	it('je vois l‘input', () => {
		render(<Champ><Champ.Input/></Champ>);
		
		expect(screen.getByRole('textbox')).toBeVisible();
	});
});
