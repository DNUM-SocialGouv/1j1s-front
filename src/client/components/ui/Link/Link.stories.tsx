import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
	component: Link,
	title: 'Components/Link',
};
export default meta;

type Story = StoryObj<typeof Link>;
export const Example: Story = {
	args: {
		href: 'https//www.1jeune1solution.gouv.fr/',
		children: 'Cliquez ici ',
		prefetch:false,  
	},
	
};


