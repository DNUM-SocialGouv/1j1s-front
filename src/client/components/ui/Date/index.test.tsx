/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { JsDateService } from '~/client/services/date/js/js.date.service';

import DateComponent from '.';

describe('<Date />', () => {
	it('affiche la date dans un format compréhensible', () => {
		const date = new Date('2024-01-01');

		render(
			<DependenciesProvider dateService={new JsDateService()}>
				<DateComponent date={date} />
			</DependenciesProvider>,
		);

		expect(screen.getByRole('time')).toHaveTextContent('1 janvier 2024');
	});
	it('indique la date programmatiquement au format ISO', () => {
		const date = new Date('2024-01-01');

		render(
			<DependenciesProvider dateService={new JsDateService()}>
				<DateComponent date={date} />
			</DependenciesProvider>,
		);

		expect(screen.getByRole('time')).toHaveAttribute('datetime', '2024-01-01T00:00:00.000Z');
	});
});
