/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { SquareMeter } from '~/client/components/ui/SquareMeter/SquareMeter';

describe('<SquareMeter />', () => {
	it('affiche une abréviation', async () => {
		render(<SquareMeter />);

		// NOTE (GAFI 06-02-2023): nécessaire puisque texte splitté dans plusieurs balises sans rôle associé
		const abbreviation = screen.getByText((content, element) => element?.tagName === 'ABBR' && element?.textContent === 'm2');
		expect(abbreviation).toHaveAttribute('title', 'mètre carré');
	});
});
