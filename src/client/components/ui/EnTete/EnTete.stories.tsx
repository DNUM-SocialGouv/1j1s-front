import type { Meta,StoryObj } from '@storybook/react';

import { EnTete } from './EnTete';

const meta:Meta<typeof EnTete>={
	component:EnTete,
	title:'Components/EnTete',
};

export default meta;

type Story=StoryObj<typeof EnTete>;

export const Example:Story= {

	args: {
		description:'descriptiom',
		heading:'titre',
		headingLevel:'h3',
	},
};
