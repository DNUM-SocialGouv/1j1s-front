import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';

describe('<FilterAccordion/>', () => {
	it('Je vois l‘accordéon avec le titre mais pas son contenu', () => {
		render(<FilterAccordion>
			<FilterAccordion.Title>Je suis le titre</FilterAccordion.Title>
			<FilterAccordion.Content>Je suis le contenu</FilterAccordion.Content>
		</FilterAccordion>);

		expect(screen.getByRole('group')).toHaveTextContent('Je suis le titre');
		expect(screen.queryByText('Je suis le contenu')).not.toBeVisible();
	});

	it('Lorsque j‘ouvre l‘accordéon, je vois son contenu', async () => {
		const user = userEvent.setup();
		render(<FilterAccordion>
			<FilterAccordion.Title>Je suis le titre</FilterAccordion.Title>
			<FilterAccordion.Content>Je suis le contenu</FilterAccordion.Content>
		</FilterAccordion>);

		await user.click(screen.getByText('Je suis le titre'));

		expect(screen.getByText('Je suis le contenu')).toBeVisible();
	});

	describe('props', () => {
		it('FilterAccordion', () => {
			render(<>
				<FilterAccordion className="filter-accordion" open={true} aria-labelledby={'id2'}>
					<FilterAccordion.Content>Je suis le contenu</FilterAccordion.Content>
				</FilterAccordion>
				<div id={'id2'}>description accessible</div>
			</>);

			const accordion = screen.getByRole('group');

			expect(accordion).toHaveAttribute('aria-labelledby', 'id2');
			expect(accordion).toHaveClass('filter-accordion');
			expect(screen.getByText('Je suis le contenu')).toBeVisible();
		});

		it('FilterAccordionTitle', () => {
			render(<>
				<FilterAccordion>
					<FilterAccordion.Title className="filter-accordion-title">Je suis le titre</FilterAccordion.Title>
				</FilterAccordion>
				<div id={'id2'}>description accessible</div>
			</>);

			expect(screen.getByText('Je suis le titre')).toHaveClass('filter-accordion-title');
		});

		it('FilterAccordionContent', () => {
			render(<>
				<FilterAccordion open>
					<FilterAccordion.Content className="filter-accordion-content">Je suis le contenu</FilterAccordion.Content>
				</FilterAccordion>
				<div id={'id2'}>description accessible</div>
			</>);

			expect(screen.getByText('Je suis le contenu')).toHaveClass('filter-accordion-content');
		});
	});
});
