/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { SquareMeter } from '~/client/components/ui/SquareMeter/SquareMeter';

describe('<SquareMeter />', () => {
	it('affiche une abréviation', async () => {
		render(<SquareMeter />);

		const abbreviation = screen.getByText((content, element) => element?.tagName === 'ABBR' && element?.textContent === 'm2');
		expect(abbreviation).toHaveAttribute('title', 'mètre carré');
	});
});
