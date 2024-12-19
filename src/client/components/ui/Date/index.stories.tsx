import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { JsDateService } from '~/client/services/date/js/js.date.service';

import DateComponent from '.';

const meta: Meta<typeof DateComponent> = {
	argTypes: {
		date: {
			control: 'date',
		},
	},
	args: {
		date: new Date(),
	},
	component: DateComponent,
	render: ({ date, ...args }) => (
		<DependenciesProvider dateService={new JsDateService()}>
			<DateComponent date={new Date(date)} {...args} />
		</DependenciesProvider>
	),
	title: 'Components/Date',
};

export default meta;

type Story = StoryObj<React.ComponentPropsWithRef<typeof DateComponent>>;
export const Default: Story = {};
