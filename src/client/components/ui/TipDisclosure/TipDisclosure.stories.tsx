import type { Meta, StoryObj } from '@storybook/react';

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
		icon: 'information',
		//TODO documenter l'usage de la prop ariaDescribedBy (ou du nom qui la remplacera) après le passage sur ce composant
	},
};

