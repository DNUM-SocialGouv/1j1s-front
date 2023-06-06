import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	argTypes: {
		children: { control: 'text' },
	},
	component: Tooltip,
	title: 'Components/Tooltip',
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
	args: {
		ariaLabel: 'Afficher des explications complémentaires',
		children: 'Voici des explications complémentaires',
		icon: 'information',
		//TODO documenter l'usage de la prop ariaDescribedBy (ou du nom qui la remplacera) après le passage sur ce composant
	},
};

