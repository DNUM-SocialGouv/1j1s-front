import type { Meta, StoryObj } from '@storybook/react';

import { FilterAccordion } from './FilterAccordion';

const meta: Meta<typeof FilterAccordion> = {
	component: FilterAccordion,
	title: 'Components/FilterAccordion',
};

export default meta;

type Story = StoryObj<typeof FilterAccordion>;

export const Example: Story = {
	args: {
		open: true,
	},
	render: (args) => (
		<FilterAccordion {...args} >
			<FilterAccordion.Title>Je suis le titre</FilterAccordion.Title>
			<FilterAccordion.Content>
				<>
					<div>
						<label htmlFor={'idInputCommune'}>Commune</label>
						<input id={'idInputCommune'}/>
					</div>
					<div>
						<label htmlFor={'idInputPays'}>Pays</label>
						<input id={'idInputPays'}/>
					</div>
				</>
			</FilterAccordion.Content>
		</FilterAccordion>
	),
};


