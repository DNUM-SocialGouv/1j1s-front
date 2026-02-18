import type { Meta, StoryObj } from '@storybook/nextjs';

import { TipDisclosure } from './TipDisclosure';

const meta: Meta<typeof TipDisclosure> = {
	argTypes: {
		children: { control: 'text' },
	},
	component: TipDisclosure,
	title: 'Components/Tooltip',
};

export default meta;
type Story = StoryObj<typeof TipDisclosure>;

export const Example: Story = {
	args: {
		children: 'Voici des explications complémentaires',
		disclosureAriaLabel: 'Afficher des explications complémentaires',
	},
};

