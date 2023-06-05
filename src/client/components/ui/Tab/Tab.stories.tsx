import type { Meta,  StoryObj } from '@storybook/react';
import { number } from 'joi';

import { Tab } from './Tab';

const meta:Meta<typeof Tab> = {
	component:Tab,
	title:'Components/Tab',
};

export default meta;
    type Story = StoryObj<typeof Tab>;
    
export const Example: Story = {
	args: {
		children:'Ceci est un onglet',
		indexTabActive:3,
		onTabChange: number,
	},
};
