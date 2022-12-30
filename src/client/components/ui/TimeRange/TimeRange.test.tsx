/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { TimeRange } from '~/client/components/ui/TimeRange/TimeRange';

describe('TimeRange', () => {
	it('affiche une plage horaire formatée', () => {
		const start = '14:00:00';
		const end = '19:30:00';
    
		render(<TimeRange start={start} end={end} />);

		const formattedStartTime = screen.getByText('14h');
		const formattedEndTime = screen.getByText('19h30');

		expect(formattedStartTime).toBeDefined();
		expect(formattedEndTime).toBeDefined();
	});
});
