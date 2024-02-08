import type { Meta, StoryObj } from '@storybook/react';

import { LinkDeprecated } from './LinkDeprecated';

const meta: Meta<typeof LinkDeprecated> = {
	component: LinkDeprecated,
	title: 'Components/Link',
};
export default meta;

type Story = StoryObj<typeof LinkDeprecated>;
export const Example: Story = {
	args: {
		children: 'Cliquez ici ',
		href: 'https//www.1jeune1solution.gouv.fr/',
		prefetch:false,  
	},
	
};


