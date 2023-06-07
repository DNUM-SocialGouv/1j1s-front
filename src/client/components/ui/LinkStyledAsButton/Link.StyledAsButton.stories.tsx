import type { Meta, StoryObj } from '@storybook/react';

import { LinkStyledAsButton } from './LinkStyledAsButton';

const meta: Meta<typeof LinkStyledAsButton> = {
	component: LinkStyledAsButton,
	title: 'Components/LinkStyledAsButton',
};
export default meta;
type Story = StoryObj<typeof LinkStyledAsButton>;

export const asPrimaryButton: Story = {
	args: {
		appearance: 'asPrimaryButton',
		href: 'https://octo.com/',
		prefetch: true,
	},
};

export const asSecondaryButton: Story = {
	args: {
		appearance: 'asSecondaryButton',
		href: 'https://octo.com/',
		prefetch: true,

	},
};
export const asTertiaryButton: Story = {
	args: {
		appearance: 'asTertiaryButton',
		href: 'https://octo.com/',
		prefetch: true,

	},
};
export const asQuaternayButton: Story = {
	args: {
		appearance: 'asQuaternayButton',
		href: 'https://octo.com/',
		prefetch: true,
		
	},
};

