import type { Meta, StoryObj } from '@storybook/react';

import { LinkStyledAsButton } from './LinkStyledAsButton';


const meta: Meta<typeof LinkStyledAsButton> = {
	args:{
		children:'Cliquez ici',
		href:'https://www.1jeune1solution.gouv.fr/',
		prefetch:true,
	},
	component: LinkStyledAsButton,
	title: 'Components/LinkStyledAsButton/LinkStyledAsButton',
};
export default meta;
type Story = StoryObj<typeof LinkStyledAsButton>;

export const asPrimaryButton: Story = {
	args: {
		appearance: 'asPrimaryButton',
	},
};

export const asSecondaryButton: Story = {
	args: {
		appearance: 'asSecondaryButton',
	},
};
export const asTertiaryButton: Story = {
	args: {
		appearance: 'asTertiaryButton',
	},
};
export const asQuaternaryButton: Story = {
	args: {
		appearance: 'asQuaternaryButton',
	},
};

