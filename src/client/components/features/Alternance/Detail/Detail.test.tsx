/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { uneAlternance } from '~/server/alternances/domain/alternance.fixture';

describe('<Detail />', () => {
	it('affiche le titre de l’annonce comme titre principal', () => {
		const annonce = uneAlternance({ titre: 'Ma super alternance' });

		render(<Detail annonce={annonce} />);

		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Ma super alternance');
		expect(titre).toBeVisible();
	});
});
